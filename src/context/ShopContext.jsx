import { useState, createContext } from "react"

// On commence par créer le contexte sans ajouter de valeur initiale
export const ShopContext = createContext()


// Le fournisseur / Provider dyuy contexte (doit prendre en sandwich le composant cible)
export const ShopContextProvider = ({ children }) => {
    // Ici on va regrouper l'ensemble de states liés au Shop
    const [products, setProducts] = useState([]) 
    const [cart, setCart] = useState(window.localStorage.getItem("cart") ? JSON.parse(window.localStorage.getItem("cart")) : [])

    
    function addToCart(product) {
        // On vient vérifier si le produit est déjà ou pas dans notre cart 
        if (cart.find((item) => item.id == product.id)) {

            // On crée une variable qui va contenir l'item modifié au niveau de sa quantité
            let newCart = cart.map((item) => {
                return (item.id == product.id) ? { ... item, qty: item.qty + 1 } : item
            })
            setCart(newCart)

        } else {
            // Sinon on ajoute simplement le produit dans le cart 
            let newObj = { ... product, qty: 1 }
            let newCart = [ ...cart, newObj]
            setCart(newCart)
        }
    }

    // On vient vérifier la qty, -1 ou on supprime le produit selon
    function deleteFromCart() {

        // Imlpémenter cette fonctionnalité 

    }

    const ShopContextValues = {
        products, 
        setProducts,
        cart, setCart, addToCart
    }

    return <ShopContext.Provider value={ShopContextValues}>{children}</ShopContext.Provider>
} 