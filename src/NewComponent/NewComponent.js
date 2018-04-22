import React from 'react';
import './NewComponent.css'
const newCmp = (props) => {
    return (
        <div className='NewCmp'>
            <p className={props.className} onClick={props.click}>
                Hello! My Name is {props.name} and my age is {props.age}!!!
            </p>
            <input type='text' onChange={props.changer} value={props.name}/>
        </div>
    )
}

export default newCmp;

