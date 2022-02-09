import React, { Component } from 'react';

class Counter extends Component {
    // renders our component into the UI
    render() { 
        return (
            <div className='row'>
                <div className="col-1">
                    <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
                </div>
                <div className="col">
                    <button 
                        onClick={() => this.props.onIncrement(this.props.counter)}  // add 1 to button's state
                        className='btn btn-secondary btn-sm'>
                        +
                    </button>
                    <button 
                        onClick={() => this.props.onDecrement(this.props.counter)}  // add 1 to button's state
                        className='btn btn-secondary btn-sm m-2'
                        disabled={ this.props.counter.value === 0 ? 'disable' : '' }>
                        -
                    </button>
                    <button 
                        onClick={() => this.props.onDelete(this.props.counter.id) }  // call method in Counters to remove button
                        className="btn-danger btn-sm">
                        x
                    </button>
                </div>   
            </div>
        );
    }

    // dynamically assigns bootstrap classes to our span next to the increment button
    getBadgeClasses() {
        let classes = 'badge m-2 badge-';
        classes += (this.props.counter.value === 0) ? 'warning' : 'primary';
        return classes;
    }

    // formats what the span next to the increment button should display according to its value
    formatCount(){
        // object destructuring for this.state
        const { value } = this.props.counter;

        // ? means return what is right after it, : means otherwise return whats after that
        return value === 0 ? 'Zero' : value;
    }
}
 
export default Counter;