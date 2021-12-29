import React from 'react'

const Button = (props) => {
    let btnClass;
    props.block === true ? 
        btnClass = 'w-full rounded text-base btn-' + props.color + ' ' + (props.size ? props.size : '')
    : 
        btnClass = 'rounded text-base btn-' + props.color + ' ' + (props.size ? props.size : '')
    return (
        <button className={btnClass} onClick={props.onClick}>
            {props.title}
        </button>
    )
}

export default Button
