import { useState, useEffect } from "react"
import axios from "axios";
import Button from "./Button";


    
const Search = () => {


    const [dishTypes, setDishTypes] = useState([]);
    let [allRecipes, setAllRecipes] = useState([]);
    let [searchQuery, setSearchQuery] = useState({
        searchTitle: '',
        searchDishTypes: '',
        searchIngredients: '',
        searchPrepTime: ''
    })


    useEffect(() => {axios.get('https://goulash-server.herokuapp.com/dishtypes')
            .then((res) => res.data)
            .then((types) => setDishTypes(types))
    }, []);

    useEffect(() => {
        axios.get('https://goulash-server.herokuapp.com/recipes')
        .then((res) => res.data)
        .then((recipes) =>  setAllRecipes(recipes));
    }, []);


    function handle(e) {
        const newQuery = {...searchQuery}
        newQuery[e.target.id] = e.target.value;
        setSearchQuery(newQuery)
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        let title = searchQuery['searchTitle'].toLowerCase();
        //let searchDishType = searchQuery.dishtype;
        let ingredients = searchQuery['searchIngredients'].toLowerCase();
        //let searchPrepTime = searchQuery.prepTime;

        

        
        let filtered = allRecipes.filter((recipe) => {
            if(recipe.title.toLowerCase().includes(title)) {
                return true;
            } else {
                return false;
            }
        });
        if(ingredients) { 
            filtered = filtered.filter((rec) => {
                let include = false;
                rec.ingredients.forEach((ingredient) => {
                    if(ingredient.originalName.toLowerCase().includes(ingredients)) {
                        include = true;
                    } 
                });
                if(include === true) {
                    return true;
                } else {
                    return false;
                }
            });
        }
        console.log(filtered);
        // console.log(filteredRecipes);
    }



    return (
        <div>
            <h2>Find Recipes</h2>
            <form className='pb-5'>
                <div className='flex-grow w-full mb-3'>
                    <label className='block'>Title</label>
                    <input type='text' id='searchTitle' className='rounded w-full' onChange={(e) => handle(e)}/>
                </div>
                <div className='flex-grow w-full mb-3'>
                    <label className='block'>Dish Type</label>
                    <select className='rounded w-full'>
                        <option value=''></option>
                        {dishTypes.map((dishtype, index) => <option key={index} value={dishtype.toLowerCase()}>{dishtype}</option>)}
                    </select>
                </div>
                <div className='flex-grow w-full mb-3'>
                    <label className='block'>Ingredients</label>
                    <input type='text' id='searchIngredients' className='rounded w-full' placeholder='e.g. Potatoes, Salmon '  onChange={(e) => handle(e)}/>
                </div>
                <div className='flex-grow w-full mb-3'>
                    <label className='block'>Preparation Time</label>
                    <select className='rounded w-full'>
                        <option value=''>Any</option>
                        <option value='upto30'>Up to 30 mins</option>
                        <option value='upto1'>Up to 1 hour</option>
                    </select>
                </div>
                <Button title='Find Recipes' color='orange' block={true} onClick={onFormSubmit} />
            </form>
                
        </div>
    )
}
    
export default Search
        