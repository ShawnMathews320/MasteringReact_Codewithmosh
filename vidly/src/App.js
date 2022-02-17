import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Movies from './components/movies';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navbar';
import './App.css';

class App extends Component {
  render() { 
    return (
      <React.Fragment>
        <NavBar />
        <main className='container'>
          <Switch>
            {/* registration page */}
            <Route path='/register' component={ RegisterForm } />

            {/* login page */}
            <Route path='/login' component={ LoginForm } />

            {/* make the path equal to the id of the movie */}
            <Route path='/movies/:id' component={ MovieForm } /> 

            <Route path="/movies" component={ Movies }></Route>
            <Route path="/customers" component={ Customers }></Route>
            <Route path="/rentals" component={ Rentals }></Route>
            <Route path="/not-found" component={ NotFound }></Route>

            {/* our home page. exact attribute is applied bc we don't want an invalid page to match the '/' */}
            <Redirect from='/' exact to='/movies' />

            {/* paths did not match so redirect user to not found page */}
            <Redirect to='not-found' />
          </Switch>
          
        </main>
      </React.Fragment>
    );
  }
}
 
export default App;
