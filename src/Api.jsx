import { useState, useEffect } from "react"

function Api() {
    const [press, setPress] = useState(false)

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/1')
            .then(res=>res.json())
            .then(json=>console.log(json))
    }, [press])

    return (
        <>
            <h1>Page Api</h1>
            <button onClick={() => setPress(!press)}>Press</button>
        </>
    )
}

export default Api