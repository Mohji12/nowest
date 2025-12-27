"""
Authentication API routes.
"""
from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Request, Response
from sqlalchemy.orm import Session
import logging
import uuid
import sys

from database import get_db
from services.admin_service import AdminService
from schemas.admin import AdminLogin, AdminResponse, TokenResponse
from utils.auth import create_access_token, verify_token
from middleware.auth import get_current_admin
from config import settings

# Configure logger to ensure it outputs to console
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
if not logger.handlers:
    handler = logging.StreamHandler(sys.stdout)
    handler.setLevel(logging.DEBUG)
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)

router = APIRouter(prefix="/api/admin", tags=["Admin Authentication"])


@router.post("/login", response_model=TokenResponse)
async def login(
    admin_data: AdminLogin,
    db: Session = Depends(get_db)
):
    """
    Admin login endpoint with JWT-based authentication.
    
    Args:
        admin_data: Admin login credentials
        db: Database session
        
    Returns:
        JWT token and admin data
        
    Raises:
        HTTPException: If authentication fails
    """
    logger.info(f"=== LOGIN REQUEST START ===")
    logger.info(f"Username: {admin_data.username}")
    logger.info(f"Password length: {len(admin_data.password)}")
    logger.info(f"Password value (first 3 chars): {admin_data.password[:3] if admin_data.password else 'None'}")
    
    try:
        logger.info(f"Login attempt for username: {admin_data.username}")
        admin_service = AdminService(db)
        logger.info(f"AdminService created successfully")
        
        # Authenticate admin
        try:
            logger.info(f"Calling authenticate_admin for: {admin_data.username}")
            logger.info(f"Password being sent: {admin_data.password[:3]}... (length: {len(admin_data.password)})")
            admin = admin_service.authenticate_admin(
                admin_data.username, 
                admin_data.password
            )
            logger.info(f"authenticate_admin returned: {admin is not None}")
            if admin:
                logger.info(f"Admin returned: {admin.username}, ID: {admin.id}")
            else:
                logger.warning(f"Admin is None - authentication failed")
        except Exception as auth_error:
            logger.error(f"Authentication error for {admin_data.username}: {auth_error}", exc_info=True)
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password"
            )
        
        if not admin:
            logger.warning(f"Authentication failed - admin is None for username: {admin_data.username}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password"
            )
        
        logger.info(f"Authentication successful for: {admin_data.username}")
        
        # Create JWT token
        access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
        access_token = create_access_token(
            data={"sub": admin.id, "username": admin.username},
            expires_delta=access_token_expires
        )
        
        # Return token and admin data
        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            expires_in=settings.access_token_expire_minutes * 60,
            admin=AdminResponse(
                id=admin.id,
                username=admin.username,
                created_at=admin.created_at
            )
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@router.post("/logout")
async def logout():
    """
    Admin logout endpoint.
    With JWT, logout is handled client-side by removing the token.
    """
    return {"message": "Successfully logged out"}


@router.get("/me", response_model=AdminResponse)
async def get_current_user(
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Get current authenticated admin user using JWT token.
    
    Args:
        request: FastAPI request object
        db: Database session
        
    Returns:
        Current admin data
        
    Raises:
        HTTPException: If not authenticated
    """
    # Get Authorization header
    authorization = request.headers.get("Authorization")
    if not authorization:
        logger.warning("No Authorization header found")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    
    # Extract token from "Bearer <token>"
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise ValueError("Invalid scheme")
    except ValueError:
        logger.warning("Invalid Authorization header format")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header"
        )
    
    # Verify JWT token
    payload = verify_token(token)
    if not payload:
        logger.warning("Invalid or expired JWT token")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
    
    # Get admin ID from token
    admin_id = payload.get("sub")
    if not admin_id:
        logger.warning("No admin ID in token")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    
    # Get admin data
    admin_service = AdminService(db)
    admin = admin_service.get_admin_by_id(admin_id)
    
    if not admin:
        logger.warning(f"Admin not found for ID: {admin_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin not found"
        )
    
    logger.info(f"Successfully authenticated admin: {admin.username}")
    return AdminResponse(
        id=admin.id,
        username=admin.username,
        created_at=admin.created_at
    )


@router.get("/debug")
async def debug_admin(db: Session = Depends(get_db)):
    """
    Debug endpoint to check admin status.
    """
    admin_service = AdminService(db)
    admins = admin_service.get_all_admins()
    
    return {
        "admin_count": len(admins),
        "admins": [
            {
                "id": admin.id,
                "username": admin.username,
                "password_length": len(admin.password) if admin.password else 0,
                "created_at": admin.created_at
            }
            for admin in admins
        ]
    }


@router.get("/debug-session")
async def debug_session(request: Request):
    """
    Debug endpoint to check session status.
    """
    session_id = request.cookies.get("session_id")
    
    return {
        "session_id": session_id,
        "session_exists": session_id is not None,
        "admin_id": SessionManager.get_admin_id_from_session(session_id) if session_id else None,
        "all_sessions": list(SessionManager._sessions.keys()) if hasattr(SessionManager, '_sessions') else "No sessions attribute"
    }


@router.post("/create-admin")
async def create_admin(
    admin_data: AdminLogin,
    db: Session = Depends(get_db)
):
    """
    Create a new admin user.
    """
    from schemas.admin import AdminCreate
    
    admin_service = AdminService(db)
    
    # Create admin
    create_data = AdminCreate(
        username=admin_data.username,
        password=admin_data.password
    )
    
    try:
        admin = admin_service.create_admin(create_data)
        return {
            "message": "Admin created successfully",
            "admin": {
                "id": admin.id,
                "username": admin.username,
                "created_at": admin.created_at
            }
        }
    except Exception as e:
        return {
            "error": str(e)
        }
