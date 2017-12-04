import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const NotFound = () =>
  <div>
    <h2>Post not found</h2>
    <Link to="/"><Button>Back</Button></Link>
  </div>;

export default NotFound;
