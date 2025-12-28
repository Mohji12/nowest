-- SQL script to insert admin user with plain text password (NOT hashed)
-- Usage: Replace 'your_username' and 'your_password' with actual values
-- WARNING: This stores passwords in plain text - NOT SECURE!

-- Example: Insert admin with username 'admin' and password 'mypassword123'
INSERT INTO `admins` (`id`, `username`, `password`, `created_at`)
VALUES (
    UUID(),  -- Generates a new UUID
    'your_username',  -- Replace with your username
    'your_password',  -- Replace with your password (plain text, NOT hashed)
    NOW()  -- Current timestamp
);

-- To insert with a specific UUID:
-- INSERT INTO `admins` (`id`, `username`, `password`, `created_at`)
-- VALUES (
--     '123e4567-e89b-12d3-a456-426614174000',  -- Your UUID
--     'admin',
--     'mypassword123',  -- Plain text password
--     NOW()
-- );

-- Check if admin was inserted:
-- SELECT * FROM `admins` WHERE `username` = 'your_username';

