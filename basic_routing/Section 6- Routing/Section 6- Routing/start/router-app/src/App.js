import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";  // render a component based on what we have in the current url
import NavBar from "./components/navbar";
import Products from "./components/products";
import Posts from "./components/posts";
import Home from "./components/home";
import Dashboard from "./components/admin/dashboard";
import ProductDetails from "./components/productDetails";
import NotFound from "./components/notFound";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="content">
          {/* Switch will render the first child that matches its location. We don't need the 'exact' attribute with Switch */}
          {/* when using the Switch component you should order your routes from most specific to most generic names */}
          <Switch> 
            {/* Route components with these props. if the url pattern is matched it will render its component prop */}   
            {/* Routes are a wrapper around the component we specify inside of it */}
            {/* three default props are passed to the component inside of the route component: history, location, and match */}
            
            {/* how to pass Route parameters */}
            <Route
              path='/products/:id'
              component={ ProductDetails }
            />

            {/* use the render attribute if you want to pass additional props to the component inside of the Route component */}
            <Route 
              path='/products' 
              render={(props) => <Products
                sortBy='new'  // additional prop
                { ...props }  // continue displaying default props
              />
              }
            />
            
            {/* pass multiple parameters to Route. Append a ? to the parameters to make them optional */}
            <Route path='/posts/:year?/:month?' component={ Posts } /> 

            {/* use exact attribute so if none of the paths match the user will be redirected to the not-found page */}
            <Route path='/' exact component={ Home } /> 

            {/* this will be matched if the current url matches what we pass in the 'from' attribute. Then it will redirect the 
            user to the new destination in the 'to' attribute */}
            <Redirect from="/messages" to='/posts' />

            <Route path='/admin' component={ Dashboard } />            
            <Route path='/not-found' component={ NotFound } />

            {/* none of the routes match so we will redirect the user to here */}
            <Redirect to='/not-found' />
          </Switch>
                                         
        </div>
      </div>
    );
  }
}

export default App;
