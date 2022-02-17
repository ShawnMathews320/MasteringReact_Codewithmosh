import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';

class Movies extends Component {
    state = {
        // we should initialize these properties to an empty array because it will take some time until we
        // get the data from the server. during this time we need to make sure movies and genres are not undefined
        // otherwise we will get a runtime error
        movies: [],  
        genres: [],  
        currentPage: 1,
        pageSize: 4,
        searchQuery: '',
        selectedGenre: null,
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
        // controlled components cannot be null or undefined, hence why searchQuery is ''
        this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 });  // also reset current page to 1 
    }

    // we pass what the user types in the input field (query)
    handleSearch = query => {
        // set selectedGenre to null so the user can view their results if any genre is previously selected
        // set currentPage to 1 bc the user might be on a different page and if the results have less pages than the user is
        // on then nothing will display on the screen
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn });  // set new state
    };
    
    getPagedData = () => {
        // pass object destructuring
        const { 
            pageSize, 
            currentPage, 
            sortColumn,
            selectedGenre, 
            searchQuery,
            movies: allMovies 
        } = this.state;

        // filter, sort, then paginate the data

        // if we have a searchQuery we call allMovies.filter where m goes to the title of the movie in lowercase and check
        // to see if it starts with our searchQuery in lowercase. otherwise if we have genre we filter the movies by the
        // selectedGenre
        let filteredMovies = allMovies;
        if (searchQuery)  
            filteredMovies = allMovies.filter(m =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())    
            );
        else if (selectedGenre && selectedGenre._id)
            filteredMovies = allMovies.filter(m => m.genre._id === selectedGenre._id);

        // returns a new sorted array
        const sorted = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);
        
        // paginate the data, get a new array and store it in this constant
        const movies = paginate(sorted, currentPage, pageSize); 

        return { totalCount: filteredMovies.length, data: movies };
    }

    render() {
        // object destructuring
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, genres, sortColumn, selectedGenre, searchQuery } = this.state;

        if (count === 0) return <p>There are no movies in the database.</p>;    
        
        // all the logic for filtering, sorting, and pagination is encapsulated in this method
        const { totalCount, data: movies } = this.getPagedData();

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
                    {/* button that links to newMovieForm page */}
                    <Link
                        to='/movies/new'
                        className='btn btn-primary'
                        style={{ marginBottom: 20}}
                    >
                        New Movie
                    </Link>

                    <p>Showing { totalCount } movies in the database.</p>

                    {/* controlled component (gets all data from props and raises events to change data) it is directly
                    controlled by its parent. We encapsulate this input field in a component so we have a simpler interface
                    to work with */}
                    <SearchBox
                        value={ searchQuery }
                        onChange={ this.handleSearch }
                    />

                    {/* our table of movies */}
                    <MoviesTable  // events that our movies table raises
                        movies={ movies }
                        sortColumn={ sortColumn }  // as the user navigates away from the list of movies then comes back
                        // we want to initialize this page with the last sort order
                        onLike={ this.handleLike }
                        onDelete={ this.handleDelete }
                        onSort={ this.handleSort }
                    />

                    <Pagination
                        itemsCount={ totalCount }  // total number of movies
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