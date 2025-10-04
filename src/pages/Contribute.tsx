import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GitFork, Heart, Code, Users } from "lucide-react";

const Contribute = () => {
  const ways = [
    {
      icon: GitFork,
      title: "Find Good First Issues",
      description: "Discover beginner-friendly issues across quality open-source projects",
    },
    {
      icon: Code,
      title: "Contribute Code",
      description: "Submit pull requests to projects that match your skills and interests",
    },
    {
      icon: Heart,
      title: "Support Maintainers",
      description: "Star, sponsor, or help with documentation and community support",
    },
    {
      icon: Users,
      title: "Join Communities",
      description: "Connect with other contributors and become part of active projects",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Start Contributing to Open Source</h1>
            <p className="text-lg text-muted-foreground">
              Find meaningful ways to contribute to healthy, active projects that need your help
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {ways.map((way) => {
              const Icon = way.icon;
              return (
                <Card key={way.title} className="border-2">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{way.title}</CardTitle>
                    <CardDescription className="text-base">{way.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button size="lg">Browse Good First Issues</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contribute;
