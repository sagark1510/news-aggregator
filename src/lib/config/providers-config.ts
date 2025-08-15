import { NewsConfig } from "../types/NewsConfig";

const providersConfig: NewsConfig = {
  defaultProvider: "NewsApiAI",
  providers: [
    {
      name: "NewsApiAI",
      enabled: true,
      config: {
        apiKey: "e039edcb-d62e-41ee-bca1-b1d64f2f8b5d",
        baseUrl: "https://eventregistry.org/api/v1",
      },
    },
    {
      name: "Guardian",
      enabled: true,
      config: {
        apiKey: "1bb51a1d-4d4a-41db-8291-7b787c4e3afb",
        baseUrl: "https://content.guardianapis.com",
      },
    },
    {
      name: "NewsApiOrg",
      enabled: true,
      config: {
        apiKey: "c1a35f605ae04659866dd7f8cfe52758",
        baseUrl: "https://newsapi.org/v2",
      },
    },
  ],
};

export default providersConfig;
