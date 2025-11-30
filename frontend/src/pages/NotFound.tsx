import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="font-serif text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="font-serif text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => setLocation('/')}
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
