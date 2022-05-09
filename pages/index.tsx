import Image from 'next/image';
import { useState } from 'react';
import Cart from '../components/cart/Cart';
import getProducts from '../lib/commerce/getAllProducts'
import useCart from '../store/cart';
import { IProductsProps } from '../types/ProductTypes'



const Home = ({products}: IProductsProps) => {
  console.log('my products===>', products);

  const [addedToCart, setAddedToCart] = useState(false)
  const addToCart = useCart((state: any) => state.add);
  
  return (
   <main className='p-20'>
     <div className='fixed top-0 left-0 z-30 flex justify-between w-screen px-10 py-2 bg-white '>
      <h1>Products</h1>

      <Cart />

     </div>

     <div className='grid grid-cols-4 gap-4'>
       {products?.map((product) => {
         return (
           <div key={product?.id}>
             <div className='relative h-[200px] w-[300px]'>
               <Image 
                layout="fill"
                objectFit='contain'
                src={product?.image?.mediaItemUrl}
               />
             </div>
             <p>{product?.name}</p>
             <p>dataID: {product?.databaseId}</p>
             <p>price: {product?.price}</p>
             {product?.price && (
               <button onClick={() => addToCart(product)} className='px-4 py-2 duration-300 ease-in-out border cursor-pointer hover:scale-110'>add to cart</button>
             )}
           </div>
         )
       })}
     </div>
   </main>
  )
}

export const getStaticProps = async () => {
  const products = await getProducts()

  if(!products){
    return {
      notFound: true,
    }
  }

  console.log("products ===>", products);
  

  return {
    props: {
      products
    }
  }
}

export default Home
