import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Faire un form de type login / signup 

// L'idéal serait de pouvoir switcher via un bouton sur ce meme composant entre login et signup

// Il y aurait du coup email, username, password, confirmation
// Ne pas hésiter à refactoriser les inputs (Vous pouvez ceci dit commencer simplement)
// Vous pouvez styiliser avec MUI ou autre attention à bien installer toutes les dépendances si c'est le cas

function Form() {
    const [formData, setFormData] = useState({
        username: "", 
        email: "", 
        password: "", 
        confirm: "", 
    })

    let inputTypes = ["username", "email", "password", "confirm"]

    return ( 
        <>

            <Box
                component="form"
                sx={{ width: "45vw", padding: "2rem", border: "solid 1px grey", margin:"auto", display:"flex", flexDirection: "column",
                borderRadius: "20px" }}
                noValidate
                autoComplete="off"
            >

            <h1 style={{ marginBottom: "5rem" }}>Signup</h1>

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

            <Button sx={{ height: "3rem" }} onClick={() => handleSubmit()} variant="contained">Signup</Button>

            </ Box>
        </>
     );
}

export default Form;