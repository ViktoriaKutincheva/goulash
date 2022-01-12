import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const Card = (props) => {

    return (
        <div className='weekday-card px-4 py-2 mb-2 rounded-sm relative mx-auto'>
            {props.expandable ? 
                <Link to='/weekDay' className='absolute top-4 right-6' onClick={props.cardOnClick} state={{ from: 'weekDays' }}> 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                </Link>
                : 
                ''
            }
            {props.collapsible ? 
                <Link to='/weekDays' className='absolute top-4 right-6' state={{ from: 'weekDay' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </Link>
                : 
                ''
            }
            {props.cardTitle ? <h2 className='h3 mb-0 font-light uppercase'>{props.cardTitle}</h2> : ''}
            
            
            <div>{props.children}</div>
        </div>
    )
}


Card.defaultProps = {
    expandable: false,
    collapsible: false,
}

Card.propTypes = {
    expandable: PropTypes.bool,
    collapsible: PropTypes.bool,
}

export default Card
