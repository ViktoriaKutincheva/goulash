import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom" 
// import { useState, useEffect } from "react"
import ShoppingList from "./components/ShoppingList"
import Footer from "./components/Footer"
import WeekDays from "./components/WeekDays"
import Recipe from "./components/Recipe"
import WeekDay from "./components/WeekDay"
import Search from "./components/Search"
import { UserCircleIcon } from "@heroicons/react/solid"
//import SearchResults from "./components/SearchResults"




function App() {

  return (
    <Router>
      <>
    <div className='container mx-auto px-4 relative pb-16 '>
      <span className='absolute top-4 right-4'>
        <UserCircleIcon className="h-10 w-10" />
      </span>
      
      <h1 style={{fontFamily: "'Rochester', cursive", fontSize: "2.8em", color: "hsl(134, 67%, 53%)"}}><Link to='/' className='no-underline'>Goulash</Link></h1>
      <h3 className='pl-7 -mt-6 uppercase font-light text-sm mb-2' style={{color: 'hsl(42, 10%, 54%)'}}>Plan your weekly menu</h3>
      
      <Routes>
        <Route 
          path='/' 
          exact 
          element={<ShoppingList />} /> 

        <Route path='/search/*' element={<Search />} />
        <Route path='/recipes/:recipeID' element={<Recipe />} />
        <Route path='/weekdays/*' element={<WeekDays />} />
        <Route path='/weekdays/:weekDay' element={<WeekDay />}/>
      </Routes>

      
      <Footer />
      <a href='https://www.freepik.com/vectors/food' className='hidden text-sm'>Food vector created by macrovector - www.freepik.com</a>

      </div>
    </>
    </Router>
    
  );
}

export default App;
