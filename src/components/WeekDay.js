import Card from './CardWeekday'
import { useLocation, useParams, Link, Outlet } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';




const WeekDay = (props) => {

    const params = useParams();
    const dayId = params.weekDay;
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = weekday[dayId]; 
    const [recipes, setRecipes] = useState('');
    

    useEffect(() => {
        axios.get('https://goulash-server.herokuapp.com/weekdays/' + dayId)
        .then((res) => {
            const data = res.data;
            setRecipes(data.recipes);
        });
    }, [])
    console.log(recipes)

    return (
        <>
            <Card cardTitle={day} collapsible={true}>
                <ul className="list-none list-search-results -mx-4 ">
                {recipes.length !=0 && recipes.map((recipe, key) => { 
                    
                    return <li key={key} id={recipe.id} className='flex mb-0 px-4 py-3 items-start' >
                        <img src={recipe.image} alt="" className='w-3/12 mr-4 h-auto rounded' />
                        <div className='grow'>
                            <h3 className='mb-1 h4'><Link to={'/recipes/' + recipe.id}>{recipe.title}</Link></h3>
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1 text-chocolate-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                                {recipe.servings} servings
                            </p> 
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1 text-chocolate-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg> 
                                {recipe.prepTime} mins</p>
                        </div>
                    </li>
                    
                })}  
                <li className='mb-0 px-4 py-3'><Link to='/search' className='btn btn-orange'>Add recipes</Link></li>
                </ul>
            </Card>
            <Outlet />
            </>
           
    )
}

export default WeekDay
