import { createContext, useState, useEffect } from 'react'
import { products } from '../assets/assets'
import { toast } from 'react-toastify'

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
    const currency = '₹'
    const delivery_fee = 50
    const [ search , setSearch ] = useState('')
    const [ showSearch , setShowSearch ] = useState(false)
    const [ cartItems, setCartItems ] = useState({})

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Please select a size')
            return
        }

        let cartData = structuredClone(cartItems)
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] = cartData[itemId][size] + 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)
    }

    const getCartCount = () => {
        let count = 0
        for (const item in cartItems) {
            for (const size in cartItems[item]) {
                try {
                    if (cartItems[item][size] > 0) {
                        count += cartItems[item][size]
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return count
    }

    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
