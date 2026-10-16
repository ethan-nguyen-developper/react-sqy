import { useState, useEffect } from "react";

// Imports MUI 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


// Connecter le Front avec le back -> On veut que signup et login soient fonctionnels

// Démarrez votre app express et lancez phpmyadmin (et react bien sur)

// Créer une fonction dans le react qui aura pour role de fetch/post les données après signup et après le login 

// On peut annuler les règles sur le mot de passe pour le moment 

// Il faudra bien vérifier que le nouveau user est crée en BDD / Un message de confirmation doit aussi etre renvoyé quand on se login 

// Pour le moment on renvoit juste un statut 200 avec un message vers le front quand c'est fonctionnel.


function Form() {
    const [formData, setFormData] = useState({
        username: "", 
        email: "", 
        password: "", 
        confirm: "", 
    })
    const [view, setView] = useState("signup")
    const [inputTypes, setInputTypes] = useState(["username", "email", "password", "confirm"])
    const [error, setError] = useState("")

    // Les expressions régulières/regex nous permettent de vérifier la composition du mail et mdp
    let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/
    let emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

    // Ici le useEffect vient changer les types d'input lors de chaque changement de vue 
    // le state view représente la vue en cours (login ou signup) et se trouve ici dans le tableau de dépendances
    useEffect(() => {
        if (view === "signup") {
            setInputTypes(["username", "email", "password", "confirm"])
        } else {
            setInputTypes(["username", "password"])
        }

        setError("")
    }, [view]) 

    // Fonction d'assainissement/vérification des données
    function checkFormData() {
        // Trimer les données 
        let username = formData.username.trim()
        let password = formData.password.trim()

        if (view == "signup") {
            let confirm = formData.confirm.trim()
            let email = formData.email.trim()
    
            // let checkPassword = passwordRegex.test(password)
            let checkEmail = emailRegex.test(email)
    
            // if (!checkPassword) {
            //     setError("Le mot de passe n'est pas au bon format")
            //     return
            // } 
            
            if (!checkEmail) {
                setError("L'email n'est pas au bon format")
                return
            }
    
            // Verif des correspondances entre mdp et confirm
            if (password !== confirm) {
                // On procède à l'envoi des données vers l'API / BDD
                console.log("Les checks sont réussis on peut envoyer vers l'api")
                setError("Les mdp doivent etre identiques")
                return
            } 

            // Regroupes les données en entrée dans un objet/tableau
            let finalFormData = {
                username, 
                email, 
                password
            }

            fetchData(finalFormData)

        } else {

            let finalFormData = {
                username, 
                password
            }

            fetchData(finalFormData)
        }   
    }

    // Fonction qui effectue les requetes vers l'API -> Signup et Login 
    function fetchData(finalFormData) {
        let url = (view === "signup") ? "http://localhost:3000/user/signup" : "http://localhost:3000/user/login"

        fetch(url, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(finalFormData)})
        .then(data => data.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))
    }


    // Fonction de soumission -> Vérifie que tous les champs soient remplis, affiche une erreur sinon
    function handleSubmit() {
        inputTypes.forEach((inputType) => {
            if (formData[inputType] === "") {
                setError("Veuillez remplir tous les champs")
                return
            }
        })
        checkFormData()
    }

    return ( 
        <>
            <Box
                component="form"
                sx={{ width: "45vw", padding: "2rem", border: "solid 1px lightgrey", margin:"auto", display:"flex", flexDirection: "column",
                borderRadius: "20px" }}
                noValidate
                autoComplete="off"
            >
                <ToggleButtonGroup
                    color="primary"
                    value={view}
                    exclusive
                    aria-label="Platform"
                    onChange={(event, newView) => setView(newView) }
                >
                    <ToggleButton value="login">Login</ToggleButton>
                    <ToggleButton value="signup">Signup</ToggleButton>
                </ToggleButtonGroup>



                <h1 style={{ marginBottom: "5rem" }}>{ view === "signup" ? "Signup" : "Login"}</h1>

                {inputTypes.map(type => (
                    <TextField 
                        key={type}
                        type={ type == "password" || type == "confirm" ? "password" : "text" } 
                        name={type}
                        value={formData[type]}
                        placeholder={"ici le " + type}
                        onChange={(e) => setFormData({ ... formData, [type] : e.target.value})}
                        variant="outlined"
                        label={type}
                        sx={{ marginBottom: "1rem" }}
                    />)
                )}

                <Button sx={{ height: "3rem" }} onClick={() => handleSubmit()} variant="contained">Submit</Button>

                { error && <h3 style={{ color: "darkred" }}>{error}</h3> }

            </ Box>
        </>
     );
}

export default Form;