import axios from "axios";
import parse from 'html-react-parser';
import List from './List';
import { useState, useEffect } from "react";
import DOMPurify from 'dompurify';
import Button from "./Button";



const Recipe = (props) => { 
    let recipeID = props.id;
    let title;
    let summary;
    let instructions;
    let [singleRecipe, setSingleRecipe] = useState(null)
    let recipeWeekday;
    let recipeWeekDayText;
    let toShoppingList = [];
    
      

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

    function handle(e) {
        recipeWeekday = e.target.value;
        recipeWeekDayText = e.target.options[e.target.selectedIndex].text;
    }

    const onRecipeAdd = (e) => {
        e.preventDefault();
        axios.get('https://goulash-server.herokuapp.com/weekdays/' + recipeWeekday)
        .then((res) => res.data )
        .then((data) => {
            let containsRecipe = data.recipes.some( recipe => recipe.id === singleRecipe.id );
            if(!containsRecipe) {
                axios.patch('https://goulash-server.herokuapp.com/weekdays/' + recipeWeekday, {
                    recipes: [...data.recipes, singleRecipe]
                });
                document.getElementById('recipeAddForm').classList.add('hidden');
                document.getElementById('recipeAddSuccess').classList.remove('hidden');
                // console.log(singleRecipe.ingredients);
                singleRecipe.ingredients.map((ingredient) => {
                    // toShoppingList.push(grocery);
                    axios.post('http://goulash-server.herokuapp.com/groceries', {
                        item: ingredient.name,
                        quantity: ingredient.measures.metric.amount + ' ' + ingredient.measures.metric.unitShort,
                        id: Math.floor(Math.random() * 100)
                    })
                    .then((res) => console.log(res))
                });
            } else {
                document.getElementById('recipeAddError').classList.remove('hidden');
            }
            console.log(toShoppingList);
            
            
        })
    }
    
        


    
    return (
        <article className='pb-3'>
            <img src={singleRecipe && singleRecipe.image} alt={title} />
            <h1 className="h2">{singleRecipe && parse(title)}</h1>
            <p>{singleRecipe && parse(summary)}</p>
            {/* On submit, write recipe to weekdays */}
            {/* ToDo: detect curent day and display only the rest of the week  */}
            {/* ToDo: After adding a recipe to menu, manage success and error messages. Include link to Weekdays */}
            <div className='recipe-add mt-2 rounded-sm bg-chocolate-200 px-3 py-3'>
                <div id='recipeAddForm'>
                    <h6>Add to this week's menu</h6>
                    <form>
                        <div className='w-full flex'>
                            <select className='rounded mr-2 flex-grow' onChange={(e) => handle(e)}>
                                <option value='1'>Monday</option>
                                <option value='2'>Tuesday</option>
                                <option value='3'>Wednesday</option>
                                <option value='4'>Thursday</option>
                                <option value='5'>Friday</option>
                                <option value='6'>Saturday</option>
                                <option value='7'>Sunday</option>
                            </select>
                            <Button title='Add' color='orange' onClick={onRecipeAdd}/>
                        </div>
                    </form>
                    <p id='recipeAddError' className='hidden mt-1'>"{singleRecipe && parse(title)}" has already been added to your menu for {recipeWeekDayText}.</p>
                </div>
                <div id='recipeAddSuccess' className='hidden'>
                    <h6 className='mb-0'>{singleRecipe && parse(title)} was added to your menu.</h6>
                </div>
                
               
            </div>

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
