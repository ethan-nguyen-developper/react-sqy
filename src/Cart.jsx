// Fichier du panier 

// Afficher l'ensemble des produits ajoutés au panier (vous pouvez recup par le LS)
// On veut pouvoir modifier le contenu du panier -> modifier les qtés d'un produit ou le supprimer totalement
// Si rien dans le panier un message annonce qu'il est vide 

// Il faudra aussi afficher le total en terme de prix comme un panier classique de eShop 

// On doit pouvoir accéder au panier en cliquant sur son icone 

import { ShopContext } from "./context/ShopContext";
import { useContext } from "react"

function Cart() {

    let { cart, setCart } = useContext(ShopContext)

    return ( 
        <>

            {cart.length ? cart.map((item) => (
                <div key={item.id}>
                    <img src={item.image} alt={item.title} />
                    <h2>{item.title}</h2>
                    <h3>Quantité : {item.qty}</h3>
                </div>
            )) : <h1>Le panier est vide ...</h1>}

            {/* Utiliser reducer pour le total ? */}
            <h2>Total : {  cart.reduce((sum, item) => sum + (item.price*item.qty), 0) } $</h2>

        </> 
    );
}

export default Cart;