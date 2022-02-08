import React, { Component } from 'react';

class Counter extends Component {

    // state includes any data that the component needs
    state = {
        value: this.props.value
    }

    handleIncrement = product => {
       this.setState({ value: this.state.value + 1 });
    }

    // renders our component into the UI
    render() { 
        return (
            <div>
                <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
                <button 
                    onClick={(product) => this.handleIncrement(product)} 
                    className='btn btn-secondary btn-sm'>
                    Increment
                </button>
            </div>
        );
    }

    // dynamically assigns bootstrap classes to our span next to the increment button
    getBadgeClasses() {
        let classes = 'badge m-2 badge-';
        classes += (this.state.count === 0) ? 'warning' : 'primary';
        return classes;
    }

    // formats what the span next to the increment button should display according to its value
    formatCount(){
        // object destructuring for this.state
        const { count } = this.state;

        // ? means return what is right after it, : means otherwise return whats after that
        return count === 0 ? 'Zero' : count;
    }
}
 
export default Counter;