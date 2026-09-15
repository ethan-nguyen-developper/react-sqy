// Faire un composant qui tire un élève au sort

// Vous aurez beoin de la liste des élèves, d'utiliser le state

// Fonctionnement :
// - On clique sur le bouton de démarrage (button avec onClick)
// - La liste des élèves défile et s'arrête sur un élève au bout de x secondes

import { useState } from "react";

let students = ["Abdallah", "Nohlan", "Soen", "Ethan", "Mathis", "Tony"];

function Random() {
    // Gestion des states et des données
    const [randomStudent, setRandomStudent] = useState(" ");
    const [list, setList] = useState([... students])

    // Fonctions
    function generateRandom() {
        let newRandomStudent = list[Math.floor(Math.random() * list.length)];
        setRandomStudent(newRandomStudent);
        setList(list.filter(student => student != newRandomStudent));
    }

    function reset() {
        setList([... students])
        setRandomStudent("")
    }

    // Rendu en JSX
    return (
        <>
            <h1>Random Student !!</h1>

            { (list.length)

            ? <button onClick={() => generateRandom()}>Random !</button>

            : <button onClick={() => reset()}>Reset</button>

            }

            
            <h2>{randomStudent}</h2>
        </>
    )
}

export default Random