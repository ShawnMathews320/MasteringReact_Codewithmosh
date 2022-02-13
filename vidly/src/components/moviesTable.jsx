import Like from './common/like';
import React, { Component } from 'react';
import Table from './common/table';
import { Link } from 'react-router-dom';

class MoviesTable extends Component {
    columns = [  // doesn't have to be part of the state bc it's not going to change throughout the lifecycle of the component
        { 
            path: 'title',
            label: 'Title', 
            content: movie => <Link to={ `/movies/${ movie._id }` }>{ movie.title }</Link>
        },
        { path: 'genre.name', label: 'Genre'},
        { path: 'numberInStock', label: 'Stock'},
        { path: 'dailyRentalRate', label: 'Rate'},
        { 
            key: 'like',  // when we click the like button and whether or not the button is currently clicked
            content: movie =>  // setting content to a function that takes a movie object and returns a React element
                <Like 
                    onToggleClick={() => this.props.onLike(movie) } 
                    liked={ movie.liked } 
                /> 
        },
        { 
            key: 'delete', 
            content: movie =>  // setting content to a function that takes a movie object and returns a React element
                <button 
                    onClick={() => this.props.onDelete(movie)} 
                    className="btn btn-danger btn-sm">
                    Delete
                </button> 
        }
    ];

    render() { 
        const { movies, onSort, sortColumn } = this.props;  // our props

        return (
            // this component is a wrapper around this table and has all of the data that the table needs
            <Table
                columns={ this.columns }
                data={ movies }
                sortColumn={ sortColumn }
                onSort={ onSort }
            />
        );   
    }
}

export default MoviesTable;