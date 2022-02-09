import React, { Component } from 'react';
import Counters from './components/counters';
import NavBar from './components/navbar';

class App extends Component {

    state = {
        counters: [
            { id: 1, value: 4 },
            { id: 2, value: 0 },
            { id: 3, value: 0 },
            { id: 4, value: 0 }
        ]
    };

    handleIncrement = counter => {
        const counters = [...this.state.counters];  // use spread operator to clone counters
        const index = counters.indexOf(counter);  // find where the element is
        counters[index] = { ...counter };  // set the element index we found to the counter value
        counters[index].value++;  // add 1 to the value we found
        this.setState({ counters });  // update the state with new array
    }

    handleDecrement = counter => {
        const counters = [...this.state.counters];  // use spread operator to clone counters
        const index = counters.indexOf(counter);  // find where the element is
        counters[index] = { ...counter };  // set the element index we found to the counter value
        counters[index].value--;  // minus 1 to the value we found
        this.setState({ counters });  // update the state with new array
    }

    handleReset = () => {
        // using map method to get each counter and reset its value to zero
        const counters = this.state.counters.map(c => {
            c.value = 0;
            return c;
        });
        this.setState({ counters });  // update state with new array
    }

    // State should be modified in the component that owns a piece of the state (i.e. here, not counter)
    // raised from counter and handled here to delete a button
    handleDelete = (counterId) => {
        const counters = this.state.counters.filter(c => c.id !== counterId);  // create a new object without the counterId value
        this.setState({ counters });  // update the state with new version
    };

    render() { 
        return (
            <React.Fragment>
                <NavBar 
                    totalCounters={ this.state.counters.filter(c => c.value > 0).length }
                />
                <main className="container">
                    <Counters 
                        counters={ this.state.counters }
                        onReset={ this.handleReset }
                        onIncrement= { this.handleIncrement }
                        onDecrement={ this.handleDecrement }
                        onDelete={ this.handleDelete }                        
                    />
                </main>
            </React.Fragment>
        );
    }
}
 
export default App;