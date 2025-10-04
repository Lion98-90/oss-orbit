import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Star, Activity } from "lucide-react";

const ProblemDemo = () => {
  const oldWayProjects = [
    {
      name: "popular-but-abandoned",
      stars: "150k",
      lastCommit: "2 years ago",
      issue: "No active maintenance",
    },
    {
      name: "trendy-framework",
      stars: "85k",
      lastCommit: "6 months ago",
      issue: "Breaking changes, poor docs",
    },
  ];

  const newWayProjects = [
    {
      name: "fastapi",
      healthScore: 91,
      lastCommit: "1 day ago",
      highlights: "Active, well-documented, beginner-friendly",
    },
    {
      name: "svelte",
      healthScore: 88,
      lastCommit: "1 day ago",
      highlights: "Modern, innovative, great community",
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Problem with Star Counts
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Old Way */}
          <Card className="border-2 border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-destructive">
                <AlertCircle className="w-5 h-5" />
                <span>Old Way (Stars)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {oldWayProjects.map((project) => (
                <div key={project.name} className="space-y-2">
                  <div className="font-medium">{project.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Last commit: {project.lastCommit}
                  </div>
                  <div className="text-sm text-destructive">{project.issue}</div>
                  <div className="flex items-center space-x-1 text-amber-600">
                    <Star className="w-4 h-4 fill-amber-600" />
                    <span className="font-semibold">{project.stars}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* New Way */}
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary">
                <CheckCircle2 className="w-5 h-5" />
                <span>New Way (Health Score)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {newWayProjects.map((project) => (
                <div key={project.name} className="space-y-2">
                  <div className="font-medium">{project.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Last commit: {project.lastCommit}
                  </div>
                  <div className="text-sm text-primary">{project.highlights}</div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                      {project.healthScore}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProblemDemo;
