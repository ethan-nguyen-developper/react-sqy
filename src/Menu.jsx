// Import des pages / composants 
import Counter from "./Counter.jsx"
import Articles from "./Articles.jsx"
import Home from "./Home.jsx"
import Random from "./Random.jsx"
import Quiz from "./Quiz.jsx"
import Api from "./Api.jsx"
import Form from "./Form.jsx"
import Todo from "./Todo.jsx"

// Imports liés à MUI 
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import "./Menu.css"

// Imports liés au routeur
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Menu() {
    return (
        <>
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
                    </nav>
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
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Menu