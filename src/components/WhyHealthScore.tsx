import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Users, FileText, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WhyHealthScore = () => {
  const navigate = useNavigate();

  const reasons = [
    {
      title: "Activity Matters",
      description:
        "A repository with 10k stars but no commits in 2 years is less valuable than an active project with 1k stars",
      icon: Activity,
    },
    {
      title: "Community Health",
      description:
        "Fast response times and good contributor diversity indicate a healthy, sustainable project",
      icon: Users,
    },
    {
      title: "Documentation Quality",
      description:
        "Great docs make or break the developer experience. We check for completeness and clarity",
      icon: FileText,
    },
    {
      title: "Production Ready",
      description:
        "CI/CD status, test coverage, and compatibility signals help you choose production-ready projects",
      icon: Package,
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why star count isn't enough
          </h2>
          <p className="text-muted-foreground text-lg">
            We evaluate what really matters for open-source project health
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <Card key={reason.title} className="border-2">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{reason.title}</CardTitle>
                  <CardDescription className="text-base">
                    {reason.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button size="lg" onClick={() => navigate('/search')} className="rounded-full">
            Explore Repositories
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhyHealthScore;
