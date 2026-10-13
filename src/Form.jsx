import { useState } from 'react'
import Input from "./Input.jsx"
import Button from "@mui/material/Button"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"


import "./style/Form.css"
// Faire fonctionner le Login et Signup : 

// 1 - Quand on arrive sur notre app React on tombe directement sur le form signup/login  
// 2 - Empecher l'accès aux autres pages tant que le user n'est pas login (rendu conditionnel)
// 3 - Il faudra faire les mofis au niveau de la route login coté API 
// 4 - On se contentera pour le moment de renvoyer un message de confirmation vers le front 



// Ajouter un bouton qui permette de sélectionner entre Signup et Login 
// Selon cette sélection afficher les bons inputs 
function Form() {
    const [inputValue, setInputValue] = useState({
        email: "",
        username: "",
        password: "",
        confirm: ""
    })

    const [isLogin, setIsLogin] = useState(false)

    const updateInputs = (event) =>  {
        setInputValue({ ...inputValue, [event.target.name] : event.target.value })
    } 

    async function handleSubmit(route) {
        // Vérification des données : leur forme, les 2 mdp etc
        // On pourra utiliser les ... Expressions régulières aka les REGEX
        // let emailRegex = new Regexp("[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]")
        // let passwordRegex = new Regexp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{12,}$")

        // if (!emailRegex.test(inputValue.email)) {
        //     console.log("error : format email invalide")
        // }
 
        // Vérifier que les mdp correspondent bien 
        // if (inputValue.password != inputValue.confirm) {
        //     console.log("error : les mdp ne sont pas les memes")
        // }

        const res = await fetch('http://localhost:3000/user/' + route, {
            method: 'POST',
            body: JSON.stringify(inputValue),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            }
        })

        const data = await res.json()

        console.log(data)
    }

    

    return ( 
        
        <div className="wrapper">
            {/* <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Signup" : "Login"}</button> */}
            <ToggleButtonGroup
                color="primary"
                value={isLogin}
                exclusive
                onChange={() => setIsLogin(!isLogin)}
                aria-label="Platform"
            >

                <ToggleButton value="false">Login</ToggleButton>
                <ToggleButton value="true">Signup</ToggleButton>

            </ToggleButtonGroup>

            <form>

            { isLogin ?

                <>
                    <h2>Formulaire de Login</h2>
                    
                    <div className="login-container">
                        <Input 
                            type="text" 
                            name="email" 
                            onChange={updateInputs} 
                            inputValue={inputValue} 
                        />

                        <Input 
                            type="password" 
                            name="password" 
                            onChange={updateInputs} 
                            inputValue={inputValue} 
                        />

                        {/* <button onClick={() => handleSubmit("login")}>Login</button> */}
                        <Button  onClick={() => handleSubmit("login")} variant="contained">Login</Button>
                    </div>

                </>         

            :
            
                <>
                    <h2>Formulaire de Signup</h2>

                    <div className="signup-container">
                        <Input 
                            type="text" 
                            name="email" 
                            onChange={updateInputs} 
                            inputValue={inputValue} 
                        />
                        <Input 
                            type="text" 
                            name="username" 
                            onChange={updateInputs} 
                            inputValue={inputValue} 
                        />
                        <Input 
                            type="password" 
                            name="password" 
                            onChange={updateInputs} 
                            inputValue={inputValue} 
                        />
                        <Input 
                            type="password" 
                            name="confirm" 
                            onChange={updateInputs} 
                            inputValue={inputValue} 
                        />

                        {/* <button onClick={() => handleSubmit("signup")}>Signup</button> */}
                        <Button  onClick={() => handleSubmit("signup")} variant="contained">Signup</Button>
                    </div>
                </>
            }

            </form>
    
        </div>
    )
}

export default Form 