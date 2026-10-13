// Optimiser la todo  : 

// Rajouter un système d'erreur -> par exemple quand on soumet un input vide un message apparait "Veuillez saisir une todo"
// Réfléchir à comment rajouter chaque todo au LS et que nos actions que ce soit check ou delete se reflètent aussi dans le LS

// Idéalement on veut que lorsque l'on arrive sur la page de todo nos anciennes todos soient visibles 
// Un indice poour l'affichage initial des todos : useEffect...

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'

function Todo() {
    const [inputValue, setInputValue] = useState("")
    // On récupère les todos depuis le LS sauf si on a rien enregistré en LS (dans ce cas tableau vide)
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("Todos")) || [])
    const [error, setError] = useState("")

    // useEffect qui permet de sauvegarder le tableau des todos chaque fois que celui change
    useEffect(() => {
        // sauvegarder en LS 
        localStorage.setItem("Todos", JSON.stringify(todos))
    }, [todos])

    function addTodo() {
        // On vérifie si le champ est vide auquel cas on affiche le message d'erreur
        if (inputValue.trim() === "") {
            setError("Veuillez renseigner du texte dans l'input !")

        } else {
            // On crée un objet de todo avec les bonnes informations
            let todoObject =  {
                id : uuidv4(),
                content : inputValue, 
                date : new Date().toLocaleDateString(),
                check: false
            }

            setTodos([ ... todos, todoObject])
            setInputValue("")
            setError("")
        }
    }

    function handleCheck(todo) {
        todo.check = !todo.check

        // On crée une copie au préalable de notre tableau de Todos
        let todosCopy = [ ... todos ]
        // On vient enlever de cette copie la todo pour laquelle on veut changer le check 
        todosCopy = todosCopy.filter((task) => task.id != todo.id)

        // On vient push la nouvelle todo modifiée dans la copie du tableau
        todosCopy.push(todo)

        // On définit la copie du tableau copmme nouveau state pour les todos
        setTodos(todosCopy)
    }

    function handleDelete(todo) {
        let todosCopy = [ ... todos ]
        todosCopy = todosCopy.filter((task) => task.id != todo.id)

        setTodos(todosCopy)
    }

    console.log(todos)

    return ( 
        <>
            <h1>Ma todo</h1>

            <input 
                type="text" 
                placeholder="Votre todo ici"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />

            <button onClick={() => addTodo()}>Ajouter</button>

            { error && <h3 style={{ color: "darkred" }}>{error}</h3> }

            <div>
                {todos && todos.map((todo) => (
                    <>
                        <h3 key={todo.id} >{todo.content}</h3>
                        <h4>{todo.date}</h4>
                        <button onClick={() => handleDelete(todo)}>X</button>
                        <input 
                            onChange={() => handleCheck(todo)}
                            type="checkbox" 
                            name="check" 
                            id="check" 
                            value={todo.check} />
                    </>
                ))}
            </div>
        </>
     );
}

export default Todo;