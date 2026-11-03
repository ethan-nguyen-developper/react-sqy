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
import Product from "./Product.jsx"
import Cart from "./Cart.jsx"
import NoPage from "./NoPage.jsx"

// Imports liés à MUI 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import cartLogo from "./assets/cart.svg"

// Imports liés au contexte
import { ShopContext, ShopContextProvider } from "./context/ShopContext.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"

// Import de la route protegée 
import { PrivateRoute } from "./auth/PrivateRoute.jsx"

// Imports liés au routeur
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useContext, useState, useEffect } from "react"

// Import pour le CSS 
import "./Menu.css"


function Menu() {
    const { cart } = useContext(ShopContext)

    return ( <>
        <AuthProvider>
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
                        
                        <Link to="/cart"><img  src={cartLogo} width={50} heigh={50} /></Link> 
                        {cart && <p>{cart.length}</p>}

                </Toolbar>
                
            </AppBar>

            
                {/* Routes */}
                    <Routes>
                        {/* Ici mes routes non-protégées */}
                        <Route path="/form" element={<Form />} />
                        <Route path="*" element={<NoPage />} />

                        {/* Ici j'ai mes routes protégées  */}
                        <Route element={ <PrivateRoute /> } >
                            <Route path="/" element={<Home />} />
                            <Route path="/random" element={<Random />} />
                            <Route path="/articles" element={<Articles />} />
                            <Route path="/counter" element={<Counter />} />
                            <Route path="/quiz" element={<Quiz />} />
                            <Route path="/api" element={<Api />} />
                            <Route path="/todo" element={<Todo />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/product/:id" element={<Product />} />
                            <Route path="/cart" element={<Cart />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
        </ AuthProvider>
    </> );
}

export default Menu;