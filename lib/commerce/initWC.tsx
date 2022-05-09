const WooCommerceApi = require('@woocommerce/woocommerce-rest-api').default;
const WC = new WooCommerceApi({
  url: process.env.WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: 'wc/v3',
});
export default WC;