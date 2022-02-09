import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {
    render() { 
        // object destructuring
        const { onReset, counters, onDelete, onIncrement, onDecrement } = this.props;

        return (
            <div>
                <button 
                    onClick={ onReset } 
                    className="btn btn-primary btn-sm m-2">
                    Reset
                </button>
                { counters.map(counter => 
                <Counter 
                    key={ counter.id }  // this attribute is used internally by React, so we can't access it in our counter component
                    onDelete={ onDelete }
                    onIncrement={ onIncrement }
                    onDecrement={ onDecrement }
                    counter={ counter }  // object includes everything we need to know about counter
                />
                )}
            </div>
        );
    }
}
 
export default Counters;