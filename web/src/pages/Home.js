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
    routeToWishlist = () => {
        this.props.history.push("/wishlist")
    }
    routeToProducts=()=>{
        this.props.history.push("/products")
    }

    render() {
        return (
            <div>
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
                                <div className="text-right col-md-6">
                                    <ul className="header-dropdown">
                                        <li className="mobile-wishlist" onClick={this.routeToWishlist}><i
                                            className="fa fa-heart" aria-hidden="true"></i> wishlist
                                        </li>
                                    </ul>
                                </div>
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
                    {/*                </ul>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div>
                    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="javascript:void(0)">Logo</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#mynavbar">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="mynavbar">
                                <ul className="navbar-nav me-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href="javascript:void(0)">Category</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="javascript:void(0)" onClick={this.routeToProducts}>Products</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="javascript:void(0)">About US</a>
                                    </li>
                                </ul>
                                <form className="d-flex">
                                    <input className="form-control me-2" type="text" placeholder="Search"/>
                                    <button className="btn btn-primary" type="button">Search</button>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

Home.propTypes = {};

export default Home;