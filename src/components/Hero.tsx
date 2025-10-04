import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const quickFilters = ["JavaScript", "Python", "Active Last 30 Days", "Good First Issues"];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-accent/30 to-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <Badge variant="secondary" className="mb-4">
            Discover truly healthy open-source projects
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Find Healthy Repos, Not Just Popular Ones
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover active, well-maintained open-source projects using our comprehensive health score
            instead of relying solely on star counts
          </p>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for projects (e.g., lightweight ML framework)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 focus-visible:ring-primary"
              />
            </div>
          </form>
          
          <div className="flex flex-wrap justify-center gap-2">
            {quickFilters.map((filter) => (
              <Button
                key={filter}
                variant="outline"
                size="sm"
                onClick={() => navigate(`/search?filter=${encodeURIComponent(filter)}`)}
                className="rounded-full"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
