// Import des pages / composants 
import Counter from "./Counter.jsx"
import Articles from "./Articles.jsx"
import Home from "./Home.jsx"
import Random from "./Random.jsx"
import Quiz from "./Quiz.jsx"
import Api from "./Api.jsx"
import Form from "./Form.jsx"
import Todo from "./Todo.jsx"
import Shop from "./Shop.jsx"

// Imports liés à MUI 
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import cart from "./assets/cart.svg"

// Imports liés au contexte
import { ShopContextProvider } from "./context/ShopContext.jsx"

// Imports liés au routeur
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Import pour le CSS 
import "./Menu.css"


// Afficher le svg du caddie dans la NavBar 

// Créer un fichier de contexte -> ShopContext qui sera dans le dossier context 
// Dans ce fichier vous viendrez importer les éléments nécessaires (createContext, useContext)

// 1 - Vous allez créer le contexte avec createContexte - sans valeur initiale 
// 2 - Vous allez créer le contexteProvider - Sous forme de fonction 



function Menu() {
    return ( <>
        <BrowserRouter>
            {/* Navigation */}
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    <MenuIcon />
                    </IconButton>
                        <nav>
                            <Button color="inherit"><Link to="/">Home</Link> </Button>
                            <Button color="inherit"><Link to="/quiz">Quiz</Link></Button>
                            <Button color="inherit"><Link to="/random">Random</Link> </Button>
                            <Button color="inherit"><Link to="/articles">Articles</Link> </Button>
                            <Button color="inherit"><Link to="/counter">Counter</Link> </Button>
                            <Button color="inherit"><Link to="/api">Api</Link> </Button>
                            <Button color="inherit"><Link to="/form">Form</Link> </Button>
                            <Button color="inherit"><Link to="/todo">Todo</Link> </Button>
                            <Button color="inherit"><Link to="/shop">Shop</Link> </Button>
                        </nav>
                        <img src={cart} width={50} height={50} />


                </Toolbar>
                

            </AppBar>

            {/* Routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/random" element={<Random />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/counter" element={<Counter />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/form" element={<Form />} />
                <Route path="/api" element={<Api />} />
                <Route path="/todo" element={<Todo />} />
                <Route path="/shop" element={<ShopContextProvider><Shop /></ShopContextProvider>} />
            </Routes>
        </BrowserRouter>
    </> );
}

export default Menu;