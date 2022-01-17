import { useState, useEffect } from "react"
import axios from "axios"
import Button from "./Button"
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom"
import SearchResults from "./SearchResults"


    
const Search = () => {
    
    const [dishTypes, setDishTypes] = useState([]);
    let [allRecipes, setAllRecipes] = useState([]);
    let [searchQuery, setSearchQuery] = useState({
        searchTitle: '',
        searchDishTypes: '',
        searchIngredients: '',
        searchPrepTime: ''
    });
    let [searchResults, setResults] = useState([]);
    let navigate = useNavigate();

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
        let searchPrepTime = searchQuery.searchPrepTime;
        
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

        if(searchPrepTime) {
            filtered = filtered.filter((recipe) => {
                if(recipe.prepTime <=  searchPrepTime) {
                    return true;
                }
            })
        }
        
        setResults(filtered);

        //ToDo: replace useNavigate with useSearchParams?
        navigate('/search/searchResults');
    }



    return (
        <>
        
            
        <div>
            <h2>Find Recipes</h2>

            {/* ToDo: Hide/Show Form */}
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
                    <select id='searchPrepTime' className='rounded w-full' onChange={(e)=> handle(e)}>
                        <option value=''>Any</option>
                        <option value='30'>Up to 30 mins</option>
                        <option value='60'>Up to 1 hour</option>
                    </select>
                </div>
                <Button title='Find Recipes' color='orange' block={true} onClick={onFormSubmit} />
            </form>
                
        </div>

        {/* ToDo: fix paths */}
        <Routes>
            <Route path='/searchResults/*' element={<SearchResults results={searchResults} />}></Route>
        </Routes>
        </>
    )
}
    
export default Search
        