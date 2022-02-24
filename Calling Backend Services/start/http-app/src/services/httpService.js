import axios from 'axios';
import { toast } from 'react-toastify';

// first function called if response is null, the second function if an error occurs
axios.interceptors.response.use(null, error => {
    const expectedError = 
      error.response && 
      error.response.status >= 400 && 
      error.response.status < 500;
  
    // if we have an unexpected error
    if (!expectedError) {
      console.log('Logging the error', error);
      toast.error('An unexpected error occurred.');
    }
  
    // to pass control to our catch block we need to return a rejected promise
    return Promise.reject(error);  // creates a rejected promise 
  })

  // has four methods: get, post, put, and delete
  export default {
      get: axios.get,
      post: axios.post,
      put: axios.put,
      delete: axios.delete
  }