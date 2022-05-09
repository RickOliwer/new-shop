const WP = async (query: string, variables?: any) => {
    try {
      const token = Buffer.from(
        `${process.env.WP_HEADLESS_GRAPHQL_AUTH_USER}:${process.env.WP_HEADLESS_GRAPHQL_AUTH_PASS}`
      ).toString('base64');
      const response = await fetch(`${process.env.WORDPRESS_SITE_URL}graphql`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: variables || {},
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('WP ERROR ==>', error);
      return null;
    }
  };
  
  export default WP;