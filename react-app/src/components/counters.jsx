import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {
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
        this.setState({ counters });  // update the state with new object
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
            <div>
                <button onClick={ this.handleReset } className="btn btn-primary btn-sm m-2">Reset</button>
                { this.state.counters.map(counter => 
                <Counter 
                    key={ counter.id }  // this attribute is used internally by React, so we can't access it in our counter component
                    onDelete={ this.handleDelete }
                    onIncrement={ this.handleIncrement }
                    counter={ counter }  // object includes everything we need to know about counter
                />
                )}
            </div>
        );
    }
}
 
export default Counters;