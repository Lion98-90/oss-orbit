import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, Bookmark, Share, Star, Clock, GitFork, Users, TrendingUp } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();

  // Mock data
  const project = {
    name: "fastapi",
    description: "FastAPI framework, high performance, easy to learn, fast to code, ready for production",
    healthScore: 91,
    stars: "67k",
    lastCommit: "1 day ago",
    contributors: 478,
    language: "Python",
    license: "MIT",
    url: "https://github.com/tiangolo/fastapi",
    tags: ["Active", "Good Docs", "Beginner Friendly", "Modern"],
  };

  const healthMetrics = [
    { name: "Activity", score: 94, color: "bg-primary" },
    { name: "Community", score: 90, color: "bg-primary" },
    { name: "Documentation", score: 88, color: "bg-primary" },
    { name: "Freshness", score: 92, color: "bg-primary" },
    { name: "Compatibility", score: 86, color: "bg-primary" },
  ];

  const communityStats = [
    { label: "Avg time to merge PR", value: "< 1 day", icon: Clock },
    { label: "Maintainer ratio", value: "82%", icon: Users },
    { label: "Active contributors", value: "124", icon: GitFork },
    { label: "Contributor diversity", value: "45 orgs", icon: TrendingUp },
  ];

  const goodFirstIssues = [
    { title: "Fix typo in README", difficulty: "Beginner" },
    { title: "Add type hints to example", difficulty: "Beginner" },
  ];

  const documentation = [
    { name: "README", available: true },
    { name: "API Docs", available: true },
    { name: "Website", available: true },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
                <p className="text-lg text-muted-foreground">{project.description}</p>
              </div>
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground font-bold text-3xl">
                {project.healthScore}
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <Button>
                <ExternalLink className="w-4 h-4 mr-2" />
                View on GitHub
              </Button>
              <Button variant="outline">
                <Bookmark className="w-4 h-4 mr-2" />
                Bookmark
              </Button>
              <Button variant="outline">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Health Breakdown */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Health Breakdown</CardTitle>
              <p className="text-sm text-muted-foreground">How is this calculated?</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Radar Chart Placeholder */}
                <div className="aspect-square bg-accent/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="text-6xl mb-2">📊</div>
                    <p>Radar Chart Visualization</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-4">
                  {healthMetrics.map((metric) => (
                    <div key={metric.name}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{metric.name}</span>
                        <span className="font-bold text-primary">{metric.score}/100</span>
                      </div>
                      <Progress value={metric.score} className="h-3" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community Health Indicators */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Community Health Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                {communityStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Good First Issues */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    {goodFirstIssues.length} open issues
                  </Badge>
                  <span>Good First Issues</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {goodFirstIssues.map((issue, index) => (
                  <div key={index} className="border-b last:border-0 pb-3 last:pb-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium mb-1">{issue.title}</p>
                        <Badge variant="outline" className="text-xs">{issue.difficulty}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  Start Contributing
                </Button>
              </CardContent>
            </Card>

            {/* Documentation & Get Started */}
            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {documentation.map((doc) => (
                  <div key={doc.name} className="flex items-center justify-between">
                    <span>{doc.name}</span>
                    {doc.available && (
                      <Badge variant="secondary">
                        ✓ Complete & clear
                      </Badge>
                    )}
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">Get Started</h4>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    pip install fastapi
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View Quickstart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
