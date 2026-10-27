import { useState, useEffect, useContext } from "react"
import { ShopContext } from "./context/ShopContext"

// Dans cette page de eshop on va afficher une liste de produits depuis la Fake Store API (voir la doc)

// On va utiliser useEffect pour le fetch et useState pour la gestion du state 

// Afin de lister/afficher les produits on pourra utiliser .map 

// On doit pouvoir ajouter des produits à un panier cad enregistrer les produits sélectionnés en 
// Local Storage 

import "./Shop.css"

function Shop() {
    const { products, setProducts, cart, setCart, addToCart } = useContext(ShopContext)

    // On vient fetch les produits depuis la Fake Store API lors du render initial
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setProducts(data)
        })
        .catch(err => console.log(err))
    }, [])

    // On vient enregistrer le cart en LS dès que le state cart change de valeur
    useEffect(() => {
        window.localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart]) 


    return ( 
        <>

            <section className="products-grid">

                {products && products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.title} />
                        <h2>{product.title}</h2>
                        <h3>{product.price} £</h3>
                        <button onClick={() => addToCart(product)}>Ajouter au panier</button>
                </div> )) }

            </section>
        </>
    );
}

export default Shop;