import WP from "../wordpress/wp"


const getProducts = async () => {
    try {
        const response = await WP(
            `query getProducts {
                products(first: 100) {
                  nodes {
                    id
                    name
                    databaseId
                    ... on SimpleProduct {
                        price(format: RAW)
                    }
                    image {
                      mediaItemUrl
                    }
                    sku
                    attributes {
                      nodes {
                        options
                        label
                        ... on GlobalProductAttribute {
                          id
                          terms {
                            nodes {
                              name
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `
        )
        const data = response?.data?.products?.nodes
        if(!data){
            throw "Could not fetch data"
        }
        return data
    } catch (error) {
        console.log('ERROR getProducts ===>', error);
        return false
    }
}
export default getProducts