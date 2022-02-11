import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
    state = {
        // we should initialize these properties to an empty array because it will take some time until we
        // get the data from the server. during this time we need to make sure movies and genres are not undefined
        // otherwise we will get a runtime error
        movies: [],  
        genres: [],  
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc'}
        
    };

    // called when an instance of this component is rendered in the DOM
    componentDidMount() {
        // clone existing array and add new genre item to it
        const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()]  

        // setting state of movies and genres available
        this.setState({ movies: getMovies(), genres });
    }

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
        this.setState({ movies });  // set state with new object
    }

    handlePageChange = page => {
        this.setState({ currentPage: page });  // change the page in our state to the current page
    }

    handleGenreSelect = genre => {
        // set state of the genre we clicked on
        this.setState({ selectedGenre: genre, currentPage: 1 });  // also reset current page to 1 
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn });  // set new state
    };
    
    render() {
        // object destructuring
        const { length: count } = this.state.movies;
        const { 
            pageSize, 
            currentPage, 
            movies: allMovies, 
            selectedGenre, 
            genres,
            sortColumn 
        } = this.state;

        if (count === 0) return <p>There are no movies in the database.</p>;

        // filter, sort, then paginate the data

        // if selectedGenre and id of selectedGenre are both truthy we get allMovies and filter them such that the genre of 
        // each movie is equal to the  selected genre. Otherwise if there is no selectedGenre we are going to set this filtered 
        // list of movies to the list of allMovies
        const filteredMovies = selectedGenre && selectedGenre._id
            ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
            : allMovies;

        // returns a new sorted array
        const sorted = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);
        
        // paginate the data, get a new array and store it in this constant
        const movies = paginate(sorted, currentPage, pageSize);

        return(
            // grid layout
            <div className='row'>

                {/* movie genres on left side */}
                <div className="col-3">
                    <ListGroup 
                        items={ genres }
                        onItemSelect={ this.handleGenreSelect }  // when our item is selected
                        selectedItem={ selectedGenre }
                    />
                </div>

                {/* movies listed in table with pagination below them */}
                <div className="col">
                    <p>Showing { filteredMovies.length } movies in the database.</p>

                    {/* our table of movies */}
                    <MoviesTable
                        movies={ movies }
                        sortColumn={ sortColumn }  // as the user navigates away from the list of movies then comes back
                        // we want to initialize this page with the last sort order
                        onLike={ this.handleLike }
                        onDelete={ this.handleDelete }
                        onSort={ this.handleSort }
                    />

                    <Pagination
                        itemsCount={ filteredMovies.length }  // total number of movies
                        pageSize={ pageSize }  // total number of pages
                        onPageChange={ this.handlePageChange }  // when the page changes
                        currentPage={ currentPage }  // the current page the user is on
                    />
                </div>

                
            </div>
        );
    }
}

export default Movies;