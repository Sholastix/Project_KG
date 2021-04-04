import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import cssStyles from './Navbar.module.css';

import Homepage from '../../components/Homepage/Homepage';
import Employee from '../Employee/Employee';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';

const Navbar = () => {

    return (
        <Router>
            <nav className={cssStyles.nav}>
                <h3>Project_KG</h3>
                <ul className={cssStyles.navLinks}>
                    <Link className={cssStyles.navRefs} to='/'>
                        <li>Homepage</li>
                    </Link>
                    <Link className={cssStyles.navRefs} to='/employees/'>
                        <li>Employees</li>
                    </Link>
                    <Link className={cssStyles.navRefs} to='/signin'>
                        <li>SignIn</li>
                    </Link>
                    <Link className={cssStyles.navRefs} to='/signup'>
                        <li>SignUp</li>
                    </Link>
                </ul>
            </nav>

            <Switch>
                <Route exact path='/' component={Homepage} />
                <Route path='/employees/' component={Employee} />
                <Route path='/signin' component={Signin} />
                <Route path='/signup' component={Signup} />
            </Switch>
        </Router>
    );
};

export default Navbar;