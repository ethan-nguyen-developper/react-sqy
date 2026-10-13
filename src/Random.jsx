// Faire un composant qui tire un èlève au sort 

// Vous aurez besoin de la liste des élèves, d'utiliser le state (pour l'élève choisi par exemple)

// Fonctionnement : 
// - On clique sur un bouton de démarrage (button avec onClick)
// - La liste des élèves défile et s'arrete sur un èlève au bout de x secondes

// Tips: Math.random...Math.floor...useState...

import { useState } from "react";

let students = ["Abdallah", "Nohlan", "Soen", "Ethan", "Mathis", "Tony", "Louis"]

function Random() {
    const [randomStudent, setRandomStudent] = useState("")
    const [list, setList] = useState([... students])


    function generateRandom() {
        let newRandomStudent = list[Math.floor(Math.random() * list.length)]
        setRandomStudent(newRandomStudent)
        setList(list.filter(student => student != newRandomStudent))
    }

    function reset() {
        setList([... students])
        setRandomStudent("")
    }
    
    return (  
        <>
            <h1>Random Student !!</h1>

            { (list.length) 
            
            ? <button onClick={() => generateRandom()}>Random !</button>
            
            : <button onClick={() => reset()}>Reset</button> 

            }
-
            <h2>{randomStudent}</h2>
        </>
    );
}

export default Random ;