import { useState, useEffect, useContext, createContext } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export function AuthProvider({ children }) {
    // On va réunir l'ensemble des states et fonctions liées à l'authorisation
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

    let navigate = useNavigate()


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
            
        .then(data => {

            console.log(JSON.parse(data.body))

            let token = data.body

            if (view === "login") {
                // On enregistre, pour le moment, le token en LS 
                window.localStorage.setItem("jwt", token)
                // On redirige ensuite vers la page appropriée avec useNavigate
                navigate('/')

            } else {
                // Si on est en signup on change la vue de Signup à Login
                setView("login")
            }
        })
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

    let AuthContextValues = {
        formData, setFormData,
        view, setView, 
        inputTypes, setInputTypes,
        error, setError, 
        checkFormData, fetchData, handleSubmit
    }

    return <AuthContext.Provider value={AuthContextValues}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)