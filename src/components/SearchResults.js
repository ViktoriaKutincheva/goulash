import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Recipe from './Recipe';
import Button from './Button';



const SearchResults = (props) => {
    const [clickedRecipeID, setClickedRecipeID] = useState('');
    let navigate = useNavigate();


    return (
        <>
            
            <ul className="list-none mt-6">
            {props.results.map((result, key) => { 
                const onDetailsClick = () => {
                    setClickedRecipeID(result.id);
                    console.log(clickedRecipeID);
                    navigate('/recipe');
                }
                return <li key={key} className='flex mb-6 items-start'>
                    <img src={result.image} alt="" className='w-3/12 mr-3 h-auto rounded' />
                    <div className='grow'>
                        <h4 className='mb-2'>{result.title}</h4>
                        <p>{result.servings} servings; ready in {result.prepTime}mins</p>
                        <Button title="Details" color="green" size="btn-sm mt-2" onClick={onDetailsClick} />  
                    </div>
                </li>
            })}  
            </ul>
            <Routes>
                <Route path="/recipe" element={<Recipe id={clickedRecipeID} />} />
            </Routes>
        </>
    )
}

export default SearchResults
