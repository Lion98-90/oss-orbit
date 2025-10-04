import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search as SearchIcon, Star, Clock, GitFork, ExternalLink, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Search = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<'normal' | 'ai'>('normal');
  const [activityDays, setActivityDays] = useState([30]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const languages = [
    { name: "JavaScript" },
    { name: "Python" },
    { name: "TypeScript" },
    { name: "Rust" },
    { name: "Go" },
    { name: "Java" },
    { name: "C++" },
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Enter a search query",
        description: "Please enter something to search for",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('search-repos', {
        body: {
          query: searchQuery,
          searchType,
          language: selectedLanguage,
          activityDays: activityDays[0],
          minStars: 0,
        }
      });

      if (error) throw error;

      setProjects(data.repos || []);
      setTotalCount(data.totalCount || 0);

      if (data.repos.length === 0) {
        toast({
          title: "No results found",
          description: "Try adjusting your search query or filters",
        });
      }
    } catch (error: any) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: error.message || "Failed to search repositories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatStars = (stars: number) => {
    if (stars >= 1000) return `${(stars / 1000).toFixed(1)}k`;
    return stars.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Search Header */}
          <div className="mb-8 space-y-4">
            <Tabs value={searchType} onValueChange={(v) => setSearchType(v as 'normal' | 'ai')} className="w-full max-w-3xl">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="normal" className="flex items-center gap-2">
                  <SearchIcon className="w-4 h-4" />
                  Normal Search
                </TabsTrigger>
                <TabsTrigger value="ai" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI Search
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative max-w-3xl flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={searchType === 'ai' 
                    ? "Describe what you're looking for (e.g., 'fast web framework for building APIs')" 
                    : "Search for projects (e.g., react, machine learning)"
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-12 pr-4 py-6 text-lg border-2 focus-visible:ring-primary"
                />
              </div>
              <Button 
                size="lg" 
                onClick={handleSearch} 
                disabled={loading}
                className="px-8"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
              </Button>
            </div>
            
            {searchType === 'ai' && (
              <p className="text-sm text-muted-foreground max-w-3xl">
                AI Search uses Gemini to understand your needs and generate detailed summaries for each repository.
              </p>
            )}
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
                      variant={selectedLanguage === lang.name ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSelectedLanguage(selectedLanguage === lang.name ? "" : lang.name)}
                    >
                      <span className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-primary/50" />
                        <span>{lang.name}</span>
                      </span>
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
            </aside>

            {/* Results */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    {loading ? 'Searching...' : totalCount > 0 ? `Found ${totalCount.toLocaleString()} repositories` : 'Enter a search query to get started'}
                  </h2>
                  {totalCount > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Showing {projects.length} results {searchType === 'ai' && '• AI-enhanced summaries'}
                    </p>
                  )}
                </div>
              </div>

              {/* Project Cards */}
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : projects.length > 0 ? (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <Card key={project.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <CardTitle className="text-xl">{project.fullName}</CardTitle>
                              <a 
                                href={project.htmlUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
                              </a>
                            </div>
                            <CardDescription className="text-base leading-relaxed">
                              {searchType === 'ai' && project.aiSummary ? (
                                <>
                                  <span className="inline-flex items-center gap-1 text-primary font-medium mb-1">
                                    <Sparkles className="w-3 h-3" />
                                    AI Summary:
                                  </span>
                                  <p className="mt-1">{project.aiSummary}</p>
                                </>
                              ) : (
                                project.description || 'No description available'
                              )}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Stats */}
                          <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{formatStars(project.stars)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{formatDate(project.updatedAt)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <GitFork className="w-4 h-4" />
                              <span>{project.forks} forks</span>
                            </div>
                            {project.openIssues > 0 && (
                              <div className="flex items-center space-x-1">
                                <span>{project.openIssues} open issues</span>
                              </div>
                            )}
                          </div>

                          {/* Topics */}
                          {project.topics && project.topics.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {project.topics.slice(0, 5).map((topic: string) => (
                                <Badge key={topic} variant="secondary" className="text-xs">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {/* Language and License */}
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center space-x-4 text-sm">
                              {project.language && (
                                <>
                                  <span className="font-medium">{project.language}</span>
                                  <span>•</span>
                                </>
                              )}
                              <span>{project.license}</span>
                            </div>
                            <Button 
                              size="sm" 
                              onClick={() => window.open(project.htmlUrl, '_blank')}
                            >
                              View on GitHub
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : !loading && (
                <Card className="p-12 text-center">
                  <SearchIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Start Searching</h3>
                  <p className="text-muted-foreground">
                    Enter a search query and click Search to discover open-source projects
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
