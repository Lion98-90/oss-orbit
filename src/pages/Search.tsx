import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Search as SearchIcon, Star, Clock, GitFork, CheckCircle, ExternalLink } from "lucide-react";

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activityDays, setActivityDays] = useState([30]);
  const [healthRange, setHealthRange] = useState([0, 100]);

  const languages = [
    { name: "JavaScript", count: 247 },
    { name: "Python", count: 189 },
    { name: "TypeScript", count: 145 },
    { name: "Rust", count: 78 },
    { name: "Go", count: 92 },
  ];

  const mockProjects = [
    {
      id: 1,
      name: "fastapi",
      description: "FastAPI framework, high performance, easy to learn, fast to code, ready for production",
      healthScore: 91,
      stars: "67k",
      lastCommit: "1 day ago",
      contributors: 478,
      language: "Python",
      license: "MIT",
      tags: ["Active", "Good Docs", "Beginner Friendly", "Modern"],
      passing: true,
    },
    {
      id: 2,
      name: "nextjs",
      description: "The React Framework for Production",
      healthScore: 89,
      stars: "118k",
      lastCommit: "4 hours ago",
      contributors: 2678,
      language: "JavaScript",
      license: "MIT",
      tags: ["Active", "Good Docs", "Production Ready", "Modern"],
      passing: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <div className="relative max-w-3xl">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for projects (e.g., lightweight ML framework)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg border-2 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button variant="ghost" size="sm">Clear all</Button>
              </div>

              {/* Language Filter */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center space-x-2">
                    <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                      <span className="text-xs">⚡</span>
                    </div>
                    <span>Language</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {languages.map((lang) => (
                    <Button
                      key={lang.name}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between"
                    >
                      <span className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-primary/50" />
                        <span>{lang.name}</span>
                      </span>
                      <span className="text-muted-foreground">{lang.count}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Activity Filter */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center space-x-2">
                    <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <span>Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Last commit within</span>
                        <Badge variant="secondary">{activityDays[0]} days</Badge>
                      </div>
                      <Slider
                        value={activityDays}
                        onValueChange={setActivityDays}
                        max={180}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>7d</span>
                      <span>30d</span>
                      <span>90d</span>
                      <span>180d</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Health Score Filter */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center space-x-2">
                    <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-xs">♥</span>
                    </div>
                    <span>Health Score</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Slider
                      value={healthRange}
                      onValueChange={setHealthRange}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Min: <strong>{healthRange[0]}</strong></span>
                      <span className="text-sm">Max: <strong>{healthRange[1]}</strong></span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Results */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Showing {mockProjects.length} repositories</h2>
                  <p className="text-sm text-muted-foreground">Sorted by health score</p>
                </div>
                <Button variant="outline">Sort by: Health Score (default)</Button>
              </div>

              {/* Project Cards */}
              <div className="space-y-4">
                {mockProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/project/${project.id}`)}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <CardTitle className="text-xl">{project.name}</CardTitle>
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <CardDescription className="text-base">{project.description}</CardDescription>
                        </div>
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl ml-4">
                          {project.healthScore}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Stats */}
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4" />
                            <span>{project.stars}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{project.lastCommit}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <GitFork className="w-4 h-4" />
                            <span>{project.contributors} contributors</span>
                          </div>
                          {project.passing && (
                            <div className="flex items-center space-x-1 text-primary">
                              <CheckCircle className="w-4 h-4" />
                              <span>CI Passing</span>
                            </div>
                          )}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Language and Actions */}
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center space-x-4 text-sm">
                            <span><strong>{project.language}</strong></span>
                            <span>•</span>
                            <span>{project.license}</span>
                            <span>•</span>
                            <span className="text-muted-foreground">python api async</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm">View Details</Button>
                            <Button size="sm" variant="outline">Compare</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
