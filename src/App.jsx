// Imports de composants 
import Menu from "./Menu.jsx"

// Import du ShopContext Provider 
import { ShopContextProvider } from "./context/ShopContext.jsx"

// On veut transmettre des données liées au shop vers le menu afin que l'icone de panier puisse afficher
// le nombre total d'items dans le panier -> on veut que ce soit dynamique

// Au bon endroit récupérer le contexte provider et prendre en sandwich le composant qui doit recevoir les données

// Puis dans la navbar afficher le nombres d'items avec un numéro.

function App() {
  return (
    <>
      <ShopContextProvider><Menu /></ShopContextProvider>
    </>
  )
}

export default App