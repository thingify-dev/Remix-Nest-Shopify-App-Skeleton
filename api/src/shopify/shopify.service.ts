import { Injectable } from '@nestjs/common';
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION, BillingInterval } from '@shopify/shopify-api';
import { ConfigService } from '@nestjs/config';

const billing = {
  'My plan': {
    amount: 5.0,
    currencyCode: 'USD',
    interval: BillingInterval.OneTime,
  }
}


@Injectable()
export class ShopifyService {
  constructor(private config: ConfigService) { }
  shopify = shopifyApi({
    apiKey: this.config.get('SHOPIFY_API_KEY'),
    apiSecretKey: this.config.get('SHOPIFY_API_SECRET_KEY'),
    scopes: this.config.get('SCOPES'),
    hostName: this.config.get('HOSTNAME'),
    hostScheme: this.config.get('HOSTSCHEME'),
    apiVersion: LATEST_API_VERSION,
    isEmbeddedApp: this.config.get('IS_EMBEDDED_APP'),
    isCustomStoreApp: false,
    userAgentPrefix: 'Custom prefix',
    // Change this to the billing object above once you are ready
    billing: undefined,
  })

  async initAuth(req: any, res: Response, query: any) {
    console.log('initAuth')
    return await this.shopify.auth.begin({
      shop: this.shopify.utils.sanitizeShop(req.query.shop, true),
      callbackPath: '/shopify/auth/callback',
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    });
  }

  async authCallback(req: any, res: any) {
    await this.shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    const host = this.shopify.utils.sanitizeHost(req.query.host);
    return res.redirect(`${this.config.get('HOSTNAME')}/?shop=${req.query.shop}&host=${encodeURIComponent(host)}`);
  }
}
