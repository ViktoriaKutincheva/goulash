import axios from 'axios'
import { useState, useEffect } from 'react'
import Card from './CardWeekday'  
import { Route, Routes } from "react-router-dom"
import WeekDay from './WeekDay'



const WeekDays = (weekdays) => {

    const [week_days, setWeekdays] = useState([]); 
    let [current_day, setCurrentDay] = useState('');
    let [current_day_recipes, setCurrentDayRecipes] = useState([]);

    useEffect(() => 
        axios.get('https://goulash-server.herokuapp.com/weekdays')
        .then((res) => res.data)
        .then((days) => {
            setWeekdays(days)
        }), 
    []);
       
        
    return (
        
                    <div className='weekdays relative'>
                    
                           {week_days && 
                            week_days.map((weekday, index) => {
                                let recipes = weekday.recipes;
                                const onClick = () => {
                                    setCurrentDay(weekday.day);
                                    setCurrentDayRecipes(recipes);
                                }
                                                    
                                return <Card key={index} cardTitle={weekday.day} expandable={true} cardOnClick={onClick}>
                                    { recipes && recipes.map((recipe, index) => <p key={index} className='text-sm'>{recipe.title}</p>) } 
                                    </Card>
                            })
                        } 
                                
                        <Routes>
                            <Route path='/weekDay' element={<WeekDay day={current_day} recipes={current_day_recipes} />} />
                        </Routes>
                    </div>
                    
    )
}

export default WeekDays
