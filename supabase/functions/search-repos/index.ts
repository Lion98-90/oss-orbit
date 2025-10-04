import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SearchParams {
  query: string;
  searchType: 'normal' | 'ai';
  language?: string;
  activityDays?: number;
  minStars?: number;
  page?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, searchType, language, activityDays, minStars, page = 1 }: SearchParams = await req.json();
    
    const GITHUB_TOKEN = Deno.env.get('GIT_API_KEY');
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!GITHUB_TOKEN) {
      throw new Error('GitHub API key not configured');
    }

    // Build GitHub search query
    let searchQuery = query;
    if (language) searchQuery += ` language:${language}`;
    if (minStars) searchQuery += ` stars:>=${minStars}`;
    if (activityDays) {
      const date = new Date();
      date.setDate(date.getDate() - activityDays);
      searchQuery += ` pushed:>=${date.toISOString().split('T')[0]}`;
    }

    console.log('Searching GitHub with query:', searchQuery);

    // Search GitHub
    const githubResponse = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}&sort=stars&order=desc&per_page=10&page=${page}`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'RepoHealth-App',
        },
      }
    );

    if (!githubResponse.ok) {
      const errorText = await githubResponse.text();
      console.error('GitHub API error:', githubResponse.status, errorText);
      throw new Error(`GitHub API error: ${githubResponse.status}`);
    }

    const githubData = await githubResponse.json();
    
    if (searchType === 'normal') {
      // Return GitHub data as-is for normal search
      const repos = githubData.items.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        htmlUrl: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language,
        updatedAt: repo.updated_at,
        openIssues: repo.open_issues_count,
        forks: repo.forks_count,
        license: repo.license?.name || 'No License',
        topics: repo.topics || [],
      }));

      return new Response(
        JSON.stringify({ repos, totalCount: githubData.total_count }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // AI Search: Generate summaries using Gemini
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured');
    }

    const reposWithSummaries = [];

    for (const repo of githubData.items.slice(0, 10)) {
      const repoInfo = `Repository: ${repo.full_name}
Description: ${repo.description || 'No description'}
Language: ${repo.language || 'Not specified'}
Stars: ${repo.stargazers_count}
Topics: ${repo.topics?.join(', ') || 'None'}`;

      const prompt = `Based on this GitHub repository information, write a single professional paragraph (2-3 sentences) that explains what this project does and why it's useful. Highlight the main technologies and unique features. Write it like a tech expert explaining the project to another developer. Do not use bullet points.

${repoInfo}`;

      try {
        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: prompt }]
              }],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 200,
              }
            }),
          }
        );

        if (!geminiResponse.ok) {
          console.error('Gemini API error for repo:', repo.full_name);
          throw new Error('Gemini API error');
        }

        const geminiData = await geminiResponse.json();
        const aiSummary = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || repo.description;

        reposWithSummaries.push({
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          aiSummary: aiSummary.trim(),
          htmlUrl: repo.html_url,
          stars: repo.stargazers_count,
          language: repo.language,
          updatedAt: repo.updated_at,
          openIssues: repo.open_issues_count,
          forks: repo.forks_count,
          license: repo.license?.name || 'No License',
          topics: repo.topics || [],
        });
      } catch (error) {
        console.error('Error generating AI summary for:', repo.full_name, error);
        // Fallback to regular description
        reposWithSummaries.push({
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          aiSummary: repo.description || 'No description available',
          htmlUrl: repo.html_url,
          stars: repo.stargazers_count,
          language: repo.language,
          updatedAt: repo.updated_at,
          openIssues: repo.open_issues_count,
          forks: repo.forks_count,
          license: repo.license?.name || 'No License',
          topics: repo.topics || [],
        });
      }
    }

    return new Response(
      JSON.stringify({ repos: reposWithSummaries, totalCount: githubData.total_count }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Search error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
