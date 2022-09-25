import axios from 'axios'
import { useState, useEffect } from 'react'
import Card from './CardWeekday'  
import { Route, Routes, Outlet, useNavigate } from "react-router-dom"
import WeekDay from './WeekDay'



const WeekDays = () => {

    const [week_days, setWeekdays] = useState([]);     

    useEffect(() => 
        axios.get('https://goulash-server.herokuapp.com/weekdays')
        .then((res) => res.data)
        .then((days) => {
            setWeekdays(days)
        }), 
    []);
       
        
    return (
        <>
            <div className='weekdays relative pb-3'>
                {week_days && 
                    week_days.map((weekday, index) => {
                        let recipes = weekday.recipes;
                                                        
                        return <Card key={index} cardTitle={weekday.day} expandable={true} dayId={weekday.id} >
                            { recipes && recipes.map((recipe, index) => <p key={index} className='h5'>{recipe.title}</p>) } 
                            </Card>
                        })
                    }           
            </div>        
        </>
                    
    )
}

export default WeekDays
