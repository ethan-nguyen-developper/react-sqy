// Afficher les articles depuis le articles.json dans le dossier data en utilisant .map

// Imports
import articles from "./data/articles.json"

function Articles() {
    return (
        <>
            {articles.map((article, index) =>
                <div key={index}>
                    <p>{article.titre}</p>
                </div>
            )}
        </>
    )
}

export default Articles