// Notre premier composant fonctionnel qui est un compteur basique (counter)

// 1 - Imports
import { useState } from "react";

// 2 - Fonction de composant fonctionnel

function Counter() {
    // A - Données (states, variables)

    // Ici count est la valeur du state et setCount la fonction de modification du state
    const [count, setCount] = useState(0);

    // B - Opérations (différentes fonctions liées au composant)
    function increment() {
        setCount(count + 1)
    }

    // C - Le rendu, la vue du composant en JSX (simili HTML mais en fait c'est du JS...)
    return (
        <>
            <h2>{count}</h2>
            <button onClick={() => increment()}>Click here !</button>
            <br />
            <button onClick={() => setCount(0)}>Reset</button>
        </>
    )
}

// 3 - Export du composant
export default Counter
