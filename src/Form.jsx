import { useState, useEffect } from "react";

// Imports MUI 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// Que vérifie-t-on une fois les données du Form transmises ?

// 1 - Tous les champs sont ils remplis ?
// 2 - Vérifier le format du MDP -> 12car dont au moins 1 car spé, 1 majuscule, 1 minuscule, 1 chiffre (cf CNIL) -> REGEX
// 3 - Vérifier le format de l'email (et le username) -> REGEX
// 4 - La correspondance des MDP
// 5 - Annuler les caractères spéciaux non désirables 
// 6 - Trimer les données cad enlever les espaces (avant / après) inutiles 

// Comment faire ? On voudrait afficher un message de type erreur quand une des verifications a échouée

// A faire : 
// Ce qui est listé plus haut 


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
    }, [view]) 

    // Fonction d'assainissement/vérification des données
    function checkFormData() {
        // Trimer les données 
        let password = formData.password.trim()
        let email = formData.email.trim()

        // Verif des formats : mdp et email 
        let checkPassword = passwordRegex.test(password)
        let checkEmail = emailRegex.test(email)

        if (!checkPassword) {
            setError("Le mot de passe n'est pas au bon format")
            return
        } else if (!checkEmail) {
            setError("L'email n'est pas au bon format")
            return
        }

        // Verif des correspondances entre mdp et confirm
        if (password === formData.confirm.trim()) {
            // On procède à l'envoi des données vers l'API / BDD
            console.log("Les checks sont réussis on peut envoyer vers l'api")
        } else {
            setError("Les mots de passe doivent etre identiques...")
        }
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