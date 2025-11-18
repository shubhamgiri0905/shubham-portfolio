export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  updated_at: string;
}

export interface GitHubAPIResponse {
  name: string;
  fork: boolean;
  private: boolean;
  description: string | null;
  html_url: string;
  language: string | null;
  updated_at: string;
}
