export class SDKConfig {
  protected integrationId: string;
  protected integrationSecret: string;
  protected type: 'merchant' | 'partner';

  constructor(integrationId: string, integrationSecret: string, type: 'merchant' | 'partner' = 'merchant', demo=false) {
    this.integrationId = integrationId;
    this.integrationSecret = integrationSecret;
    this.type = type;
  }

  public update(integrationId: string, integrationSecret: string) {
    this.integrationId = integrationId;
    this.integrationSecret = integrationSecret;
  }

  public getIntegrationId() {
    return this.integrationId;
  }

  public getIntegrationSecret() {
    return this.integrationSecret;
  }
}
