import useCart from "../hooks/useCart"

// Test component (optional)
function CartTest() {
    const { items, getItemTotalPrice, getTotalCartPrice, addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart } = useCart()
    
    return (
        <div>
            <button onClick={() => addItem('Apple', 1.50, 2)}>Add Apple</button>
            <button onClick={() => addItem('Banana', 0.75, 3)}>Add Banana</button>
            {items.map(item => (
                <div key={item.id}>
                    {item.name} - ${item.price} x {item.quantity}
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
            ))}
            <p>Total: ${getTotalCartPrice()}</p>
            <button onClick={clearCart}>Clear Cart</button>
        </div>
    )
}

export default CartTest