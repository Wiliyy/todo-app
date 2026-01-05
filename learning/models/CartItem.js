export class CartItem {
    constructor(id , name , price , quantity) {
        /*
        this.id it mean out of the constructor there private variable equal null and only get the value from the constructor
        */
        this.id = id
        this.name = name
        this.price = price
        this.quantity = quantity
    }
    increaseQuantity() {
        this.quantity += 1
    }
    decreaseQuantity() {
        if (this.quantity > 0) {
            this.quantity -= 1
        }
        return this.quantity
    }
    getTotalPrice() {
        return this.price * this.quantity
    }
    
    toPlainObject() {
        return {
            id : this.id,
            name :this.name,
            price : this.price,
            quantity : this.quantity
        }
    }

    static fromPlainObject(plainObject) {
        return new CartItem(
            plainObject.id,
            plainObject.name,
            plainObject.price,
            plainObject.quantity
        )
    }
}