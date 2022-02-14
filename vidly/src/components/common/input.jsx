import React, { Component } from 'react';

// this handles the interface of our input component
const Input = ({ name, label, value, error, onChange }) => {
    return (
        <div className="form-group">
            <label htmlFor={ name }>{ label }</label>
            <input 
                value={ value} 
                onChange={ onChange }
                id={ name } 
                name={ name }
                type="text" 
                className="form-control" 
            />
            {/* if error is truthy then the expression will be returned */}
            {error && <div className="alert alert-danger">{ error }</div>}
        </div>
    );
}
 
export default Input;