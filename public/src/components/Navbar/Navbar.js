import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsAuth(true);
    }
  }, []);

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <h1 className='navbar-brand mx-2'>Budget App</h1>
      <ul className='navbar-nav mr-auto'>
        {isAuth === true ? (
          <Fragment className="collapse navbar-collapse">
            {' '}
            <li className="nav-item">
              <Link to='/dashboard' className='nav-link'>Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to='/logout' className='nav-link'>Logout</Link>
            </li>
          </Fragment>
        ) : (
          <Fragment className="collapse navbar-collapse">
            {' '}
            <li className="nav-item">
              <Link to='/login' className='nav-link'>Login</Link>
            </li>
            <li className="nav-item">
              <Link to='/signup' className='nav-link'>Signup</Link>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;