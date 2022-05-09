import { Item } from 'framer-motion/types/components/Reorder/Item';
import produce from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware'
import { Iproducts } from '../types/ProductTypes';

const useCart: any = create(
    persist(
        (set) => ({
            open: false,
            setOpen: (open: boolean) =>
                set(
                    produce((state: any) => {
                        state.open = open;
                    })
                ),
            items: [],
            add: (item: Iproducts) =>
                set(
                    produce((state: any) => {
                        const exists = state.items.find((product: any) => product.id === item.id);
                        if(!exists) {
                            console.log("new item", item);
                            
                            state.items.push({...item, quantity: 1})
                        } else {
                            console.log("exists", exists);
                            exists.quantity += 1
                        }
                    })
                ),
            remove: (id: string, quantity: boolean) => 
                set(
                    produce((state: any) => {
                        const exists = state.items.find((product: any) => product.id === id)
                        if(quantity){
                            if(exists.quantity === 1){
                                state.items = state.items.filter((item: any) => item.id !== id)
                            }else {

                                exists.quantity -= 1
                            }
                        } else {

                            state.items = state.items.filter((item: any) => item.id !== id)
                        }
                    })
                ),
            
        }),
        {name: 'cart'}
    )
);

export default useCart