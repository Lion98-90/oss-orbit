import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark } from "lucide-react";

const Bookmarks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-8 h-8 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your Bookmarks</h1>
            <p className="text-muted-foreground mb-8">
              Sign in to start bookmarking projects and track your favorite repositories
            </p>
            <Button size="lg">Sign In to Continue</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Bookmarks;
