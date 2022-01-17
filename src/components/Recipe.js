import axios from "axios";
import parse from 'html-react-parser';
import List from './List';
import { useState, useEffect } from "react";
import DOMPurify from 'dompurify';



const Recipe = (props) => { 
    let recipeID = props.id;
    let title;
    let summary;
    let instructions;
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

    if(singleRecipe) {
        title = DOMPurify.sanitize(singleRecipe.title);
        summary = DOMPurify.sanitize(singleRecipe.summary);
        instructions = DOMPurify.sanitize(singleRecipe.instructions);
    }
    
        


    
    return (
            <article className='pb-3'>
            <img src={singleRecipe && singleRecipe.image} alt={title} />
            <h1 className="h2">{singleRecipe && parse(title)}</h1>
            <p>{singleRecipe && parse(summary)}</p>

            <div className='recipe-ingredients mt-8'>
                <h2 className="h3">Ingredients</h2>
                <ul className="list-none mb-8">
                    {singleRecipe && singleRecipe.ingredients.map((ingredient, key) => {
                        return <li className="border-b py-2 my-0" key={key}>{ingredient.originalString}</li>
                    })}
                </ul>
               
        </div>
        <div className='recipe-preparation'>
                <h2 className="h3">Instructions</h2>
                {singleRecipe && parse(instructions)}
        </div>
    </article>
    )
}

export default Recipe
