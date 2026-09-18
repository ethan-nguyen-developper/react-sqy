import { useState } from "react"

// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

// Faire un form de type login / signup

// L'idéal serait de pouvoir switcher via un bouton sur ce menu composant entre login et signup

// Il y aurait du coup email, username, password, confirmation
// Na pas hésiter à refactoriser les inputs (Vous pouvez ceci dit commencer simplement)
// Vous pouvez styliser avec MUI ou autre, attention à bien installer toutes les dépendances si c'est le cas

function Form() {
    // const [username, setUsername] = useState("")
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    // const [confirmation, setConfirmation] = useState("")

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirm: ""
    })

    let inputTypes = ["username", "email", "password", "confirm"]

    // const [isLogin, setIsLogin] = useState(false)

    return (
        <>
            <h1>Form en React</h1>

            { inputTypes.map(type => (
                <input
                key={type}
                    type={ type == "password" || type == "confirm" ? "password" : "text" }
                    name={type}
                    value={formData[type]}
                    placeholder={"Ici le " + (type)}
                    onChange={(e) => setFormData({ ... formData, [type] : e.target.value})}
                />
            ))}

            <button onClick={() => handleSubmit()}>Submit</button>

            {/* <h1>Page Form</h1>

            { isLogin
                ?
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" onClick={() => setIsLogin(true)}>Login</Button>
                        <Button variant="outlined" onClick={() => setIsLogin(false)}>Signup</Button>   
                    </Stack>
                :
                    <Stack spacing={2} direction="row">
                        <Button variant="outlined" onClick={() => setIsLogin(true)}>Login</Button>
                        <Button variant="contained" onClick={() => setIsLogin(false)}>Signup</Button>
                    </Stack>
            }

            { isLogin
                ?
                    <form action="#">
                        <br /><h2>Login</h2>

                        <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                        noValidate
                        autoComplete="off"
                        >
                            <TextField
                                id="outlined-basic"
                                label="Outlined"
                                variant="outlined"
                                name="username"
                                value={username}
                                placeholder="Ici le username..."
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <TextField
                                id="outlined-basic"
                                label="Outlined"
                                variant="outlined"
                                name="password"
                                value={password}
                                placeholder="Ici le password..."
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Box>

                        <Button variant="contained">Soumettre</Button>
                    </form>
                :
                    <form action="#">
                        <br /><h2>Signup</h2>

                        <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                        noValidate
                        autoComplete="off"
                        >
                            <TextField
                                id="outlined-basic"
                                label="Outlined"
                                variant="outlined"
                                name="username"
                                value={username}
                                placeholder="Ici le username..."
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <TextField
                                id="outlined-basic"
                                label="Outlined"
                                variant="outlined"
                                name="email"
                                value={email}
                                placeholder="Ici l'email..."
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <TextField
                                id="outlined-basic"
                                label="Outlined"
                                variant="outlined"
                                name="password"
                                value={password}
                                placeholder="Ici le password..."
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <TextField
                                id="outlined-basic"
                                label="Outlined"
                                variant="outlined"
                                name="confirmation"
                                value={confirmation}
                                placeholder="Ici la confirmation..."
                                onChange={(e) => setConfirmation(e.target.value)}
                            />
                        </Box>

                        <Button variant="contained">Soumettre</Button>
                    </form>
                    
            } */}
        </>
    )
}

export default Form
