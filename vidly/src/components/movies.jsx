import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';

class Movies extends Component {
    state = {
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1
    };

    handleDelete = movie => {
        // make new movies object without specified movie
        const movies = this.state.movies.filter(m => m._id !== movie._id);

        // setState with new object
        this.setState({ movies });
    };

    handleLike = movie => {
        const movies = [...this.state.movies];  // clone array of objects
        const index = movies.indexOf(movie);  // find index of the object
        movies[index] = { ...movies[index] };  // set the index of movies to a new object
        movies[index].liked = !movies[index].liked;  // toggle liked property of the index of movies
        this.setState({ movies });
    }

    handlePageChange = page => {
        this.setState({ currentPage: page });  // change the page in our state to the current page
    }
    
    render() {
        // object destructuring
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, movies: allMovies } = this.state;

        if (count === 0) return <p>There are no movies in the database.</p>;

        // paginate the data, get a new array and store it in this constant
        const movies = paginate(allMovies, currentPage, pageSize);

        return(
            <React.Fragment>
                <p>Showing { count } movies in the database.</p>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { movies.map(movie => (  // render movies local in this method
                        <tr key={ movie._id }>
                            <td>{ movie.title }</td>
                            <td>{ movie.genre.name }</td> 
                            <td>{ movie.numberInStock }</td>
                            <td>{ movie.dailyRentalRate }</td>
                            <td>
                                <Like 
                                    onToggleClick={() => this.handleLike(movie) }  // when we click the like button
                                    liked={ movie.liked }  // whether or not the button is currently clicked
                                />
                            </td>
                            <td>
                                <button onClick={() => this.handleDelete(movie)} 
                                    className="btn btn-danger btn-sm">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        )) }                        
                    </tbody>
                </table>
                <Pagination
                    itemsCount={ count }  // total number of movies
                    pageSize={ pageSize }  // total number of pages
                    onPageChange={ this.handlePageChange }  // when the page changes
                    currentPage={ currentPage }  // the current page the user is on
                />
            </React.Fragment>
        );
    }
}

export default Movies;