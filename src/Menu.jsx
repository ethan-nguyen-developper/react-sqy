import Counter from "./Counter.jsx";
import Articles from "./Articles.jsx";
import Home from "./Home.jsx";
import Random from "./Random.jsx";
import Quiz from "./Quiz.jsx";

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Menu() {
    return (
        <>
            <BrowserRouter>
                {/* Navigation */}
                <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/articles">Articles</Link> |{" "}
                <Link to="/counter">Counter</Link> |{" "}
                <Link to="/random">Random</Link> |{" "}
                <Link to="/quiz">Quiz</Link>
                </nav>

                {/* Routes */}
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/counter" element={<Counter />} />
                <Route path="/random" element={<Random />} />
                <Route path="/quiz" element={<Quiz />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Menu
