import Counter from "./Counter.jsx";
import Articles from "./Articles.jsx";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from "./Home.jsx";
import Random from "./Random.jsx";

function App() {

  return(
    <>
      <BrowserRouter>
        {/* Navigation */}
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/articles">Articles</Link> |{" "}
          <Link to="/counter">Counter</Link> |{" "}
          <Link to="/random">Random</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/random" element={<Random />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
