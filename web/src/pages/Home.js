import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../pages/Home.css'
import {Col, Container, Row} from "reactstrap";
import {Link} from "react-router-dom";

class Home extends Component {
    routeToLogin = () => {
        this.props.history.push("/login")
    }
    routeToRegister = () => {
        this.props.history.push("/register")
    }

    render() {
        return (
            <div className="top-header">
                <Row>
                    <Col md={6}>
                        <div className="d-flex flex-column w-100">
                            <b>Welcome to Our Multi Shopping</b>
                            <span>Call Us: 123 - 456 - 7890</span>
                        </div>
                    </Col>
                    <Col md={6}>
                       <div className="d-flex justify-content-end align-items-center">
                           <div className="dropdown">
                               <button className="dropbtn">My Account</button>
                               <div className="dropdown-content">
                                   <Link to={'/login'}>Login</Link>
                                   <Link to={'/register'}>Register</Link>
                                   {/*<Link to={'/logout'}>Log out</Link>*/}
                               </div>
                           </div>
                       </div>
                    </Col>
                </Row>
                {/*<div className="top-header">*/}
                {/*    <div className="container-1">*/}
                {/*        <div className="row">*/}
                {/*            <div className="col-md-6">*/}
                {/*                <div className="header-contact d-flex">*/}
                {/*                    <ul>*/}
                {/*                        <li>Welcome to Our Multi Shopping</li>*/}
                {/*                        <li>*/}
                {/*                            <i className="fa fa-phone" aria-hidden="true"/>Call Us: 123 - 456 - 7890*/}
                {/*                        </li>*/}
                {/*                    </ul>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="text-right col-md-6">*/}
                {/*                <ul className="header-dropdown">*/}
                {/*                    <li className="mobile-wishlist"><a href="/pages/image/favorites.png"><i*/}
                {/*                        className="fa fa-heart" aria-hidden="true"></i> wishlist</a></li>*/}
                {/*                    <li className="onhover-dropdown mobile-account"><i className="fa fa-user"*/}
                {/*                                                                       aria-hidden="true"></i> My*/}
                {/*                        Account*/}
                {/*                        <ul className="onhover-show-div">*/}
                {/*                            <li><a href="/page/image/login">Login</a></li>*/}
                {/*                            <li><a href="/page/image/register">Register</a></li>*/}
                {/*                            <li><a href="/page/image/logout">Logout</a></li>*/}
                {/*                        </ul>*/}
                {/*                    </li>*/}
                {/*                </ul>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        );
    }
}

Home.propTypes = {};

export default Home;