import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturedCollections = () => {
  const navigate = useNavigate();

  const collections = [
    {
      title: "Editor's Picks",
      description: "Curated selection of exceptional projects",
      icon: Star,
      count: 24,
      color: "text-amber-500 bg-amber-50",
    },
    {
      title: "Rising Stars",
      description: "Fast-growing projects with strong momentum",
      icon: TrendingUp,
      count: 37,
      color: "text-blue-500 bg-blue-50",
    },
    {
      title: "Beginner Friendly",
      description: "Great first-time contribution opportunities",
      icon: Heart,
      count: 58,
      color: "text-pink-500 bg-pink-50",
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Collections
          </h2>
          <p className="text-muted-foreground text-lg">
            Curated selections to help you discover quality projects faster
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {collections.map((collection) => {
            const Icon = collection.icon;
            return (
              <Card key={collection.title} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/search')}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${collection.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle>{collection.title}</CardTitle>
                  <CardDescription>{collection.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {collection.count} repositories
                    </span>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCollections;
