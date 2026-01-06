import { useCallback, useState } from "react"
import { CartService } from "../services/CartService"
import { CartItem } from "../models/CartItem"



function useCart(initialItems = []) {

    const [items , setItems] = useState(() =>
        initialItems.map(item => CartItem.fromPlainObject(item))
    )

    const [service] = useState(() => {
        const cartService = new CartService()
        initialItems.forEach(item => {
            cartService.addItem(item.name, item.price, item.quantity)
        })
        return cartService
    })

    const addItem = useCallback((name, price, quantity = 1) => {
        const newItem = service.addItem(name, price, quantity)
        setItems(prev => [...prev, newItem])
    }, [service])

    const removeItem = useCallback((id) => {
        service.removeItem(id)
        setItems(prev => prev.filter(item => item.id !== id))
    }, [service])

    const increaseQuantity = useCallback((id) => {
        const updatedItem = service.increaseQuantity(id)
        if (updatedItem) {
            setItems(prev => prev.map(item => item.id === id ? updatedItem : item))
        }
    }, [service])

    const decreaseQuantity = useCallback((id) => {
        const updatedItem = service.decreaseQuantity(id)
        if (updatedItem) {
            setItems(prev => prev.map(item => item.id === id ? updatedItem : item))
        }
    }, [service])
    
    const clearCart = useCallback(() => {
        service.clearCart()
        setItems([])
    }, [service])

    const getItemTotalPrice = useCallback((id) => {
        console.log("getTotalPrice", id)
        return service.getTotalPrice(id)
    }, [service])

    const getTotalCartPrice = useCallback(() => {
        return service.getTotalCartPrice()
    }, [service])

    const getAllItems = useCallback(() => {
        return service.getAllItems()
    }, [service])
    
    return {
        items: items.map(item => item.toPlainObject()),
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getItemTotalPrice,
        getTotalCartPrice,
        getAllItems
    }
}

export default useCart