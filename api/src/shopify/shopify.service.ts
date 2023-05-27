import { Injectable } from '@nestjs/common';
import '@shopify/shopify-api/adapters/node';
import {
  shopifyApi,
  LATEST_API_VERSION,
  BillingInterval,
} from '@shopify/shopify-api';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

const billing = {
  'My plan': {
    amount: 5.0,
    currencyCode: 'USD',
    interval: BillingInterval.OneTime,
  },
};


@Injectable()
export class ShopifyService {
  constructor(private config: ConfigService, private db: PrismaService) { }
  shopifyApi = shopifyApi({
    apiKey: this.config.get('SHOPIFY_API_KEY'),
    apiSecretKey: this.config.get('SHOPIFY_API_SECRET_KEY'),
    scopes: this.config.get('SCOPES').split(','),
    hostName: this.config.get('HOSTNAME'),
    hostScheme: this.config.get('HOSTSCHEME'),
    apiVersion: LATEST_API_VERSION,
    isEmbeddedApp: this.config.get('IS_EMBEDDED_APP'),
    isCustomStoreApp: false,
    userAgentPrefix: 'Custom prefix',
    // Change this to the billing object above once you are ready
    billing: undefined,
  });

  // AUTH
  async initAuth(req: any, res: Response, query: any) {
    console.log('initAuth');
    console.log({ req, res, query })
    return await this.shopifyApi.auth.begin({
      shop: req.query.shop,
      callbackPath: '/',
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    });
  }

  async authCallback(req: any, res: any) {
    const callbackResponse = await this.shopifyApi.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    await this.storeSession(callbackResponse.session.toObject());

    const host = this.shopifyApi.utils.sanitizeHost(req.query.host);
    const shop = this.shopifyApi.utils.sanitizeShop(req.query.shop, true);

    const redirectUrl = this.shopifyApi.auth.buildEmbeddedAppUrl('https://appclient.thingify.dev/')
    return res.redirect(redirectUrl);

  }

  // SESSION
  async storeSession(session) {
    console.log({ session });
  }
}
