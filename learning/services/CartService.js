import { CartItem } from "../models/CartItem"

export class CartService {
    constructor() {
        this.items = []
    }


addItem(
    name , price , quantity =1
)
{
    const id = this.generateId()
    const item = new CartItem(id, name, price, quantity)
    this.items.push(item)
    return item

}

removeItem(id) {
    this.items = this.items.filter(item => item.id !== id)
}

increaseQuantity(id) {
    const item = this.items.find(item => item.id === id)
    if (item) {
        item.increaseQuantity()
        return item
    }
    return null
}
decreaseQuantity(id) {
    const item = this.items.find(item => item.id === id)
    if (item) {
        item.decreaseQuantity()
        return item
    }
    return null
}

    getTotalPrice(id) {
        const item = this.items.find(item => item.id === id)
        if (item) {
            return item.getTotalPrice()
        }
        return null
    }

    getTotalCartPrice() {
        return this.items.reduce((total, item) => {
            return total + item.getTotalPrice()
        }, 0)
    }

    getAllItems() {
        return this.items.map(item => item.toPlainObject())
    }

    generateId() {
        return Date.now() + Math.random()
    }

    clearCart() {
        this.items = []
    }
}