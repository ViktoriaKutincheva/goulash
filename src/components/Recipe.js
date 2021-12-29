import axios from "axios";
import parse from 'html-react-parser';
import List from './List';
import { useState, useEffect } from "react";
import DOMPurify from 'dompurify';



const Recipe = (props) => {
    let recipeID = 716381;
    let [singleRecipe, setSingleRecipe] = useState(null)

      

    useEffect(() => {
        // Fetch Recipe From Server by ID
        const fetchRecipe = async () => {
            const response = await axios.get('https://goulash-server.herokuapp.com/recipes/' + recipeID)
            return response.data
        }  


        const getRecipe = async () => {
            const recipeFromServer = await fetchRecipe()
            setSingleRecipe(recipeFromServer)
        }

       getRecipe();
      
    }, [recipeID])


    let title = DOMPurify.sanitize(singleRecipe.title);
    let summary = DOMPurify.sanitize(singleRecipe.summary);
    let instructions = DOMPurify.sanitize(singleRecipe.instructions);


    
    return (
            <article className='prose'>
            <h1>{singleRecipe && parse(title)}</h1>
            <p>{singleRecipe && parse(summary)}</p>

            <div className='recipe-ingredients'>
                <h2>Ingredients</h2>
                <ul>
                    {singleRecipe && 
                          <List listItems={singleRecipe.ingredients}/>
                    }
                </ul>
               
        </div>
        <div className='recipe-preparation'>
                <h2>Instructions</h2>
                {singleRecipe && parse(instructions)}
        </div>
    </article>
    )
}

export default Recipe
