// Joi is used to define a schema (simple object). In this object we add all of our properties and their validation requirements.
import Joi from 'joi-browser';
import React, { Component } from 'react';
import Input from './common/input';

class LoginForm extends Component {
    state = {
        // set to empty strings because null and undefined cannot be used as values of controlled elements and components
        account: { username: '', password: '' },
        // using object instead of array bc it is easier to find the errors for a given input field
        errors: {}
    };

    // this schema does not have to be part of the state because it's not supposed to change
    // fluent way to define validation rules. 
    // .label assigns us a friendly name to this field
    schema = {   
        username: Joi.string().required().label('Username'), 
        password: Joi.string().required().label('Password') 
    };

    validate = () => {
        // makes our code look cleaner
        const options = { abortEarly: false };

        // first argument is object we want to validate. Second argument is our schema
        const { error } = Joi.validate(this.state.account, this.schema, options);

        // if result.error is falsy then return null, otherwise get that array and map it into an object
        if (!error) return null;

        // empty object
        const errors = {};

        // mapping this array into an object
        for (let item of error.details)
            errors[item.path[0]] = item.message;  // setting property in our errors object to the error message
        return errors;
    }

    // prevents default behavior of this event (i.e. reloading the page when we submit a form)
    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();  // this method will return an object for error catching
        this.setState({ errors: errors || {} });  // if truthy return error object, otherwise return an empty object
        if (errors) return;  // if we have errors immediately return so we don't call the server

        // call the server
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };  // whatever name is at runtime will be used to set the name key
        const schema = { [name]: this.schema[name] };  // dynamically setting value from our schema object
        const { error } = Joi.validate(obj, schema);  // we want the default abortEarly here so errors are displayed one at a time

        // if error is defined return the first detail of the error message property, otherwise return null 
        return error ? error.details[0].message : null;
        
    };

    // when the input field text changes
    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };  // clone errors property of our state object
        const errorMessage = this.validateProperty(input);  // returns an error message from the given input

        // if this errorMessage is truthy we will store it in our errors object
        if (errorMessage) errors[input.name] = errorMessage;  // we set set errors of input name to our errorMessage
        else delete errors[input.name];  // if we don't get an error message we should delete the existing property so 
        // the error is cleared

        const account = { ...this.state.account };  // clone the account object

        // string that identifies the name of the target property
        account[input.name] = input.value;  // set the username the input field

        this.setState({ account, errors });  // pass our new account object
    };

    render() { 
        // object destructuring
        const { account, errors } = this.state;

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={ this.handleSubmit }>
                    <Input
                        name='username'  // so we can identify the field
                        label='Username'  // the text above the input field
                        value={ account.username }  // call method when text changes
                        onChange={ this.handleChange }  // call method when text changes
                        error={ errors.username }  // error object that specifies the field that is invalid
                    />
                    <Input
                        name='password'  // so we can identify the field
                        label='Password'  // the text above the input field
                        value={ account.password }  // call method when text changes
                        onChange={ this.handleChange }  // call method when text changes
                        error={ errors.password }  // error object that specifies the field that is invalid
                    />
                    <button 
                        // a returned null is considered falsy, an object is truthy
                        disabled={ this.validate() }  // whether or not the button should be disabled
                        className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        );
    }
}
 
export default LoginForm;