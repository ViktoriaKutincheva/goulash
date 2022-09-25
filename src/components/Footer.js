import { NavLink, useLocation } from "react-router-dom"


const Footer = () => {
    let location = useLocation();
    const d = new Date();
    let dayId = d.getDay();
    
    
    return (
        
        <footer className='container mx-auto flex justify-between content-center fixed bottom-0 left-0 right-0 lg:left-1/4 lg:right-1/4 lg:w-1/2 md:w-8/12 ' >
            <NavLink to={'/weekdays/' + dayId} className='flex-grow text-center py-2 '>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className='block text-xs '>Today's Menu</span>
            </NavLink>
            {/* {location.pathname === '/' ?  */}
                <NavLink to='/weekdays' className='flex-grow text-center py-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8  mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <span className='block text-xs'>This Week's Menu</span>
                </NavLink> 
            {/* :  */}
                <NavLink to="/" className='flex-grow text-center py-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className='block text-xs'>Shopping List</span>
                </NavLink> 
            {/* } */}
            <NavLink to='/search' className='flex-grow text-center py-2'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className='block text-xs'>Find Recipes</span>
            </NavLink>
        </footer>
        
    )
}

export default Footer
