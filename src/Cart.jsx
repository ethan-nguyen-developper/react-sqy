import { useEffect, useState } from "react"

function Cart() {

    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    )

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    function deleteFromCart(id) {
        setCart(cart.filter((product) => product.id !== id))
    }
    console.log(cart)

    return (
        <>
            {cart ?
                cart.map((product) => (
                    <div key={product.id}>
                        <h3>{product.title}</h3>
                        <img src={product.image} alt={product.title} />
                        <h4>{product.price}</h4>

                        <button onClick={() => deleteFromCart(product.id)}>
                            Supprimer
                        </button>
                    </div>
                ))
                :
                <h1>Le panier est vide</h1>
            }

            
        </>
    )
}

export default Cart