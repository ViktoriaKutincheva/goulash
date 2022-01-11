import { Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import Recipe from './Recipe';



const SearchResults = (props) => {
    const [clickedRecipeID, setClickedRecipeID] = useState(null);
    //let navigate = useNavigate();


    return (
        <>
            
            <ul className="list-none mt-6 list-search-results -mx-4 ">
            {props.results.map((result, key) => { 
                const onDetailsClick = () => {
                    setClickedRecipeID(result.id);
                    console.log(clickedRecipeID);
                    // navigate('/recipe');
                }
                return <li key={key} className='flex mb-0 px-4 py-3 items-start' onClick={onDetailsClick} >
                    
                    <img src={result.image} alt="" className='w-3/12 mr-3 h-auto rounded' />
                    <div className='grow'>
                        <h3 className='mb-1 h4'><Link to='/recipe'>{result.title}</Link></h3>
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            {result.servings} servings
                        </p> 
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg> 
                            Ready in {result.prepTime} mins</p>
                        {/* <Button title="Details" color="green" size="btn-sm mt-2" onClick={onDetailsClick} />   */}
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
