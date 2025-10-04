import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Home, Bookmark, GitFork } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">R</span>
          </div>
          <span className="font-semibold text-lg">RepoHealth</span>
        </Link>
        
        <div className="flex items-center space-x-1">
          <Button
            variant={isActive("/") ? "secondary" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/" className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
          </Button>
          
          <Button
            variant={isActive("/search") ? "secondary" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/search" className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Link>
          </Button>
          
          <Button
            variant={isActive("/bookmarks") ? "secondary" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/bookmarks" className="flex items-center space-x-2">
              <Bookmark className="w-4 h-4" />
              <span>Bookmarks</span>
            </Link>
          </Button>
          
          <Button
            variant={isActive("/contribute") ? "secondary" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/contribute" className="flex items-center space-x-2">
              <GitFork className="w-4 h-4" />
              <span>Contribute</span>
            </Link>
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/auth">Sign In</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
