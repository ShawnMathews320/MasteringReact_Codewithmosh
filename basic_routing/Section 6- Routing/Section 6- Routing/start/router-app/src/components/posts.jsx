import React from "react";
import queryString from 'query-string';  // used to parse strings

const Posts = ({ match, location }) => {
  // this will give us an object with properties based on the parameters in the query string
  const result = queryString.parse(location.search);    

  return (
    <div>
      <h1>Posts</h1>
      Year: { match.params.year } , Month: { match.params.month }
    </div>
  );
};

export default Posts;
