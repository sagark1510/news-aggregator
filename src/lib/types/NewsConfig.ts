export interface ProviderConfig {
  name: string;
  enabled: boolean;
  config: {
    apiKey: string;
    baseUrl: string;
  };
}

export interface NewsConfig {
  defaultProvider: string;
  providers: ProviderConfig[];
}
