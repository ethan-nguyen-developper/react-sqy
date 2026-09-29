import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"

function Todo() {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
    const [error, setError] = useState("");

    useEffect(() => {

    }, [])

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    function addTodo() {
        if (inputValue.trim()  === "") {
            setError("Veuillez saisir un input")
        } else {
            let todoObject = {
                id: uuidv4(),
                content: inputValue,
                date: new Date().toLocaleDateString(),
                check: false
            }

            setInputValue("");
            setTodos([ ... todos, todoObject]);
            setError("")
        }
    }

    function handleCheck(todo) {
        todo.check = !todo.check

        let todosCopy = [ ... todos]
        todosCopy = todosCopy.filter(task => task.id != todo.id)

        setTodos([ ... todosCopy, todo])
    }

    function handleDelete(todo) {
        let todosCopy = [ ... todos]
        todosCopy = todosCopy.filter(task => task.id != todo.id)

        setTodos([ ... todosCopy])
    }

    return (
        <>
            <h1>Bienvenue sur votre Todo</h1>

            <input
                type="text"
                placeholder="Votre todo..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />

            <button onClick={() => addTodo()}>Ajouter</button>

            { error && <h3 style={{ color: "darkred" }}>{error}</h3>}

            <div>
                { todos && todos.map((todo) => (
                    <div key={todo.id}>
                        <h3>{todo.content }</h3>
                        <h4>{todo.date}</h4>
                        <button onClick={() => handleDelete(todo)}>X</button>
                        <input
                            onChange={() => handleCheck(todo)}
                            type="checkbox"
                            name="check"
                            id="check"
                            value={todo.check}
                        />
                    </div>
                )) }
            </div>
        </>
    )
}

export default Todo