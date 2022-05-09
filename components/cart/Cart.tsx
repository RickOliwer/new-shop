import useCart from "../../store/cart"
import shallow from 'zustand/shallow';
import { useEffect, useState } from "react";
import { Iproducts } from "../../types/ProductTypes";
const Cart = () => {
    const cart = useCart((state: any) => ({
        items: state.items,
        add: state.add,
        remove: state.remove,
        open: state.open,
        setOpen: state.setOpen
    }),
    shallow
    );
    
    useEffect(() => {
        console.log('OPEN STATE CHANGED', cart.open);
      }, [cart.open]);
      useEffect(() => {
        console.log('CART RERENDER', cart.open);
      }, [cart.items]);
    return(
        <div>
            <button onClick={() => cart.setOpen(!cart.open)} className="px-4 py-2 border"><span>Add to Cart</span> <span>{cart.items.length}</span></button>
            {cart.open &&  <CartContent />}
           
            
        </div>
    )
}

export default Cart

const CartContent = ({}) => {
    const cart = useCart((state: any) => ({
        items: state.items,
        remove: state.remove,
        open: state.open,
        add: state.add,
    }),
    shallow
    )
    

    return (
        <div className="fixed z-50 p-6 bg-white border w-96 right-2">
            <div>
                <div>
                    <strong>Cart</strong>
                </div>
                <div>
                    <ul>
                        {cart.items.length > 0 ? (
                            <div>

                                {cart.items.map((product: Iproducts) => {
                                    return (
                                        <div key={product.id}>
                                            <h1>{product.name}</h1>
                                            <div className="flex">
                                                <div className="p-2 border cursor-pointer" onClick={() => cart.remove(product.id, product.quantity)}>-</div>
                                                <div>{product.quantity}</div>
                                                <div onClick={() => cart.add(product)} className="p-2 border cursor-pointer">+</div>
                                            </div>
                                        </div>
                                    )
                                    
                                })}
                            </div>
                        ): null}
                    </ul>
                </div>
            </div>
        </div>
    )
}