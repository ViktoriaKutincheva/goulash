import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom" 
// import { useState, useEffect } from "react"
import axios from "axios"
import ShoppingList from "./components/ShoppingList"
import Footer from "./components/Footer"
import WeekDays from "./components/WeekDays"
import Recipe from "./components/Recipe"
import WeekDay from "./components/WeekDay"
import Search from "./components/Search"
import { UserCircleIcon } from "@heroicons/react/solid"




function App() {

  
  const d = new Date();
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = weekday[d.getDay()]; 

  let today_recipes;
  let weekdays;

  async function get_weekdays() {
    const result = await axios.get('https://goulash-server.herokuapp.com/weekdays/')
    const data = result.data
    weekdays = data
    return weekdays
  }
  

  async function get_todays_recipes() {
    await get_weekdays();
    weekdays.map((weekday) => {
      if(weekday.day === day) { today_recipes = weekday.recipes }
      return today_recipes;
    })
  }
  
  get_todays_recipes();





  return (
    <Router>
      <>
    <div className='container mx-auto px-4 relative pb-16 '>
      <span className='absolute top-4 right-4'>
        <UserCircleIcon className="h-10 w-10" />
      </span>
      
      <h1 style={{fontFamily: "'Rochester', cursive", fontSize: "2.8em", color: "hsl(134, 67%, 53%)"}}>Goulash</h1>
      <h3 className='pl-7 -mt-6 uppercase font-light text-sm mb-2' style={{color: 'hsl(42, 10%, 54%)'}}>Plan your weekly menu</h3>
      
      <Routes>
        <Route 
          path='/' 
          exact 
          element={<ShoppingList />} /> 

        <Route path="/weekDays/*" element={<WeekDays weekdays={weekdays ? weekdays : ''} />} />
          
        <Route path="/recipe" element={<Recipe id='' />} />
          
        <Route path='/weekDay' element={
          <WeekDay day={day}  recipes={today_recipes} />
        } />
      
        <Route path='/search/*' element={<Search />} />
      </Routes>

      
      <Footer />
      <a href='https://www.freepik.com/vectors/food' className='hidden text-sm'>Food vector created by macrovector - www.freepik.com</a>

      </div>
    </>
    </Router>
    
  );
}

export default App;
