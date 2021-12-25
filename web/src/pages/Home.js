import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../pages/Home.css'

class Home extends Component {
    routeToLogin = () => {
        this.props.history.push("/login")
    }
    routeToRegister = () => {
        this.props.history.push("/register")
    }

    render() {
        return (
            <div>
                <div className="top-header">
                    <div className="container-1">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="header-contact">
                                    <ul>
                                        <li>Welcome to Our Multi Shopping</li>
                                        <li><i className="fa fa-phone" aria-hidden="true"></i>Call Us: 123 - 456 - 7890
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="text-right col-md-6">
                                <ul className="header-dropdown">
                                    <li className="mobile-wishlist"><a href="/pages/image/favorites.png"><i
                                        className="fa fa-heart" aria-hidden="true"></i> wishlist</a></li>
                                    <li className="onhover-dropdown mobile-account"><i className="fa fa-user"
                                                                                       aria-hidden="true"></i> My
                                        Account
                                        <ul className="onhover-show-div">
                                            <li><a href="/page/image/login">Login</a></li>
                                            <li><a href="/page/image/register">Register</a></li>
                                            <li><a href="/page/image/logout">Logout</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
            ;
    }
}

Home.propTypes = {};

export default Home;