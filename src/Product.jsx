// Dans cette page on peut utiliser useParam qui permet de récup les paramètres dans l'url
// De cette manière on recup l'id du produit et faire une requete API 
import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react"
import { ShopContext } from "./context/ShopContext";

function Product() {
    let { product, setProduct } = useContext(ShopContext)

    let params = useParams()

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/' + params.id)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setProduct(data)
        })
        .catch(err => console.log(err))
    }, [])

    return ( 
        <>
            <h2>{product.title}</h2>
            <img src={product.image} alt={product.title} />
            <h3>{product.price}</h3>
            <h4>{product.description}</h4>
            <button>Ajouter au panier</button>
        </>
    );
}

export default Product;