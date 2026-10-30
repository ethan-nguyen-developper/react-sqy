import { useEffect, useContext } from "react"
import { ShopContext } from "./context/ShopContext"
import { useNavigate } from "react-router-dom"

import "./Shop.css"

// TODO //

// 1 - Faire page individuelle pour les produits (product.jsx) -> quand on clique sur un item on arrive sur la page dédiée
// On peut rediriger le user lorsqu'il cliquez sur un produit avec useNavigate

// 2 - Il va falloir coder la route dans le Menu -> product/:id -> on pourra utiliser cette route

// 3 - Sur la page du produit on pourra utilise useParams qui permet de récupérer l'id de l'URL et donc de faire un call API 
// afin d'afficher les infos du produit souhaité. 

// 4 - L'idée est d'exploiter au maximum le contexte précedemment crée


function Shop() {
    const { products, setProducts, cart, addToCart } = useContext(ShopContext)

    let navigate = useNavigate()

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
                    <div onClick={() => navigate("/product/" + product.id)} key={product.id} className="product-card">
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