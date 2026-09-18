// Faire Quiz en React 

// Importer le json 
// La question et son numéro s'affichent
// Vous avez 4 choix possibles + 1 bouton pour valider une fois la réponse sélectionnée
// On a ensuite le verdict : bonne ou mauvais réponse 
// Une fois le verdict tombé le bouton de validation de la réponse devient un bouton pour passer 
// à la question suivante 
// Une fois la dernière question passée on affiche le score et un bouton recommencer 

// Utiliser useState pour chaque données dynamiques (que vous devez identifier)
// Utiliser le conditionnel (if et if ... else)
// Utiliser .map pour parcourir le json du Quiz

import { useState } from "react";
import quiz from "./data/quiz-yvelines.json"

function Quiz() {
    // Nos différents states nécessaires au quiz
    const [questionIndex, setQuestionIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [answer, setAnswer] = useState("")
    const [submitted, setSubmitted] = useState(false)

    // Nos opérations liées / fonctions 
    function handleClick(key) {
        setAnswer(key)
    }

    function handleSubmit() {
        if (answer === quiz["quiz_yvelines"][questionIndex]["reponse_correcte"]) {
            setScore(score + 1)
        }
        setSubmitted(true)
    }

    function handleNext() {
        setQuestionIndex(questionIndex+1)
        setSubmitted(false)
        setAnswer("")
    }

    function handleReset() {
        setQuestionIndex(0)
        setScore(0)
    }   


    // Le rendu du Quiz en jsx
    return ( 
        <>
            <h1>Quiz</h1>

            {  !(questionIndex + 1 > quiz["quiz_yvelines"].length) ?

                <>
                    <h2>Question {quiz["quiz_yvelines"][questionIndex]["id"]}</h2>
                    <h2>Score : {score}</h2>


                    <h2>{ quiz["quiz_yvelines"][questionIndex]["question"] }</h2> 

                    {Object.entries(quiz["quiz_yvelines"][questionIndex]["options"]).map(([key, option]) => (
                        submitted 
                        ? <button style={{ backgroundColor : (key === quiz["quiz_yvelines"][questionIndex]["reponse_correcte"]) ? 'green' : (key === answer) && 'red'  }} key={key} onClick={() => handleClick(key)}>{option}</button> 
                        : <button style={{ backgroundColor : (key === answer) && 'grey' }} key={key} onClick={() => handleClick(key)}>{option}</button>   
                    
                    ))}

                    { submitted 
                    ? <button onClick={() => handleNext()}>Suivant</button> 
                    : <button onClick={() => handleSubmit()}>Valider</button> }
                </>

                : 

                <>
                    <h2>Le quiz est fini !</h2>
                    <h2>Score final : {score}</h2>
        
                    
                    <button onClick={() => handleReset()}>Recommencer</button>
                </>
            }
        </>
    );
}

export default Quiz;