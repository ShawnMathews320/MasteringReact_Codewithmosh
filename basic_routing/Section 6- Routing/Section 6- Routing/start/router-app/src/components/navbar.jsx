// the Link component gives us single page applications, where the entire page won't be reloaded when a user navigates from
// one page to another. Only the content area will be updated,
// inside Link components there is still an anchor (<a> tag), but this anchor has a handler for the onClick event. When we click
// these links the handler is called and this function prevents the default behavior of an anchor. The anchor will only update
// the url specified in the Link component
import { Link } from "react-router-dom";  
import React from "react";

const NavBar = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/products">Products</Link>
      </li>
      <li>
        <Link to="/posts/2018/06">Posts</Link>
      </li>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
    </ul>
  );
};

export default NavBar;
