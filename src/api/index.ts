import {SDKConfig} from "../config";
import {Payment} from "../payment";
import axios, { AxiosRequestHeaders } from "axios";

export class Api {
  protected endpointUrl: string;
  protected config: SDKConfig;

  constructor(demo: boolean, config: SDKConfig) {
    this.endpointUrl = demo ? 'https://business.api.staging.fena.co/' : 'https://business.api.fena.co/';
    this.config = config;
  }

  private constructHeaders(): AxiosRequestHeaders {
    return { integration_id: this.config.getIntegrationId(), integrationSecret: this.config.getIntegrationSecret() };
  }

  public setDemoMode(_: boolean) {
    this.endpointUrl = _ ? 'https://business.api.staging.fena.co/' : 'https://business.api.fena.co/';
  }

  public async createPayment(payment: Payment) {
    const headers = this.constructHeaders();
    try {
      await axios.post(this.endpointUrl + 'public/payments/create', payment, {
        headers
      })
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  public async processPayment(paymentId: string) {
    const headers = this.constructHeaders();
    try {
      await axios.post(this.endpointUrl + 'public/payments/', paymentId, {
        headers
      })
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  public async createAndProcessPayment(requestData: any) {
    const headers = this.constructHeaders();
    try {
      const result = await axios.post(this.endpointUrl + 'public/payments/create-and-process', requestData, {
        headers
      });
      return result.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
}
