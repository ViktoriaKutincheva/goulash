import Card from './CardWeekday'
import { useLocation } from 'react-router-dom'




const WeekDay = (props) => {

    const location = useLocation();
    const { from } = location.state; console.log(from)

    return (
            <Card cardTitle={props.day ? props.day : ''} collapsible={true}>
                <ul className='list-none weekday-recipes-list'>
                    {props.recipes && props.recipes.map((todaysRecipe, index) => {
                        return <li key={index}>
                            <h5 className='uppercase'>{todaysRecipe.title}</h5>
                        </li>
                    })}
                </ul>
            </Card>
           
    )
}

export default WeekDay
