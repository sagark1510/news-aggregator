import { NewsProvider } from "@/lib/types/NewsProvider";

class NewsProviderFactory {
  private static providers = new Map<
    string,
    new (config: any) => NewsProvider
  >();

  static register(
    name: string,
    providerClass: new (config: any) => NewsProvider
  ) {
    this.providers.set(name, providerClass);
  }

  static create(name: string, config: any): NewsProvider {
    const ProviderClass = this.providers.get(name);
    if (!ProviderClass) {
      throw new Error(`Provider ${name} not found`);
    }
    console.log({ config });
    return new ProviderClass(config);
  }

  static getAvailableProviders(): string[] {
    return Array.from(this.providers.keys());
  }
}

export default NewsProviderFactory;
