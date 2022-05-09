export interface IProductsProps {
    products: Iproducts[]
}

export interface Iproducts{
    id: string
    databaseId: number
    name: string
    sku?: any
    attributes: any
    image: any
    quantity: number
}