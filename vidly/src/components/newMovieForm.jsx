import Joi from 'joi-browser';
import { getGenres } from '../services/fakeGenreService';
import { getMovie, saveMovie } from '../services/fakeMovieService';
import Form from './common/form';

class NewMovieForm extends Form {
    state = {
        data: {
            title: '',
            genreId: '',  // specifically the id of a genre, not the entire genre object with id and name
            numberInStock: '',
            dailyRentalRate: ''
        },
        // set to empty strings because null and undefined cannot be used as values of controlled elements and components
        genres: [],
        errors: {}
    };
    
    schema = {
        _id: Joi.string(),  // did not set to required bc when we create a new movie we don't have the id property
        title: Joi.string()
            .required()
            .label('Title'),
        genreId: Joi.string()
            .required()
            .label('Genre'),
        numberInStock: Joi.number()
            .required()
            .min(0)  // minimmum 0 in stock
            .max(100)  // maximum 100 in stock
            .label('Number in Stock'),
        dailyRentalRate: Joi.number()
            .required()
            .min(0)  // minimum 0 daily rentals
            .max(10)  // maximum 10 daily rentals
            .label('Daily Rental Rate')
    }

    // called immediately after a component is mounted
    componentDidMount() {
        const genres = getGenres();  // get genres from our fakeGenreService
        this.setState({ genres });  // update the state

        const movieId = this.props.match.params.id;  // read id parameter in the route

        // if it equals new immediately return it bc we don't need to populate the form with an existing movie object
        if (movieId === 'new') return;  

        const movie = getMovie(movieId);  // if the movie is not new we'll get the movie with the given id

        // if the movie does not exist redirect user to not-found page
        // using .replace instead of .push because the latter will cause the back button to create an infinite loop when the
        // user selects it
        if (!movie) return this.props.history.replace('/not-found');  
        
        // not setting the data propery to the movie object we get from the server because the restful apis we have on the server
        // are general purpose, they are not built for a specific page. so the data they return is often used on several pages 
        this.setState({ data: this.mapToViewModel(movie) });  // each page needs a piece of this data 
    }

    // method gets a movie object that we get from the server and maps it to a different kind of movie object we can use
    // on this form. we refer to that kind of movie as a ViewModel; it's a model of the view.
    mapToViewModel(movie) {
        // returning a new object with these transformations
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    doSubmit = () => {
        saveMovie(this.state.data);  // gives our ViewModel as argument

        this.props.history.push('/movies');  // redirect user to here
    }

    render() { 
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={ this.handleSubmit }>
                    { this.renderInput('title', 'Title') }

                    {/* renders a dropdown list */}
                    { this.renderSelect('genreId', 'Genre', this.state.genres) }
                    
                    { this.renderInput('numberInStock', 'Number in Stock', 'number') }
                    { this.renderInput('dailyRentalRate', 'Rate') }
                    { this.renderButton('Save') }
                </form>
            </div>
        );
    }
}
 
export default NewMovieForm;