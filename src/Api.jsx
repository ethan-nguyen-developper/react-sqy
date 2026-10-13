import { useState, useEffect } from "react";


function Api() {
    const [press, setPress] = useState(false)

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/1')
        .then(res => res.json())            
        .then(json => console.log(json))
    }, [])

    return ( 
        <>
            <h1>Page d'api !</h1>    
            <button onClick={() => setPress(!press)}>State</button>
        </> 
    );
}

export default Api;