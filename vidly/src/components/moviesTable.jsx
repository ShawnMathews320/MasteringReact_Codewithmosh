import Like from './common/like';
import TableHeader from './common/tableHeader';
import React, { Component } from 'react';

class MoviesTable extends Component {
    columns = [  // doesn't have to be part of the state bc it's not going to change throughout the lifecycle of the component
        { path: 'title', label: 'Title'},
        { path: 'genre.name', label: 'Genre'},
        { path: 'numberInStock', label: 'Stock'},
        { path: 'dailyRentalRate', label: 'Rate'},
        { key: 'like' },
        { key: 'delete' }
    ];

    render() { 
        const { movies, onDelete, onLike, onSort, sortColumn } = this.props;  // our props

        return (
            <table className='table'>
                <TableHeader 
                    columns={ this.columns }
                    sortColumn={ sortColumn }
                    onSort={ onSort }
                />
                    <tbody>
                        { movies.map(movie => (  // render movies local in this method
                            <tr key={ movie._id }>
                                <td>{ movie.title }</td>
                                <td>{ movie.genre.name }</td> 
                                <td>{ movie.numberInStock }</td>
                                <td>{ movie.dailyRentalRate }</td>
                                <td>
                                <Like 
                                    onToggleClick={() => onLike(movie) }  // when we click the like button
                                    liked={ movie.liked }  // whether or not the button is currently clicked
                                />
                                </td>
                                <td>
                                    <button onClick={() => onDelete(movie)} 
                                    className="btn btn-danger btn-sm">
                                    Delete
                                    </button>
                                </td>
                            </tr>
                            )) }                        
                    </tbody>
            </table>
        );   
    }
}

export default MoviesTable;