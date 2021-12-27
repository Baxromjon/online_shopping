import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/clientPage/Product";
import Home from "./pages/Home";
import WishList from "./pages/clientPage/WishList";


class App extends Component {
    render() {
        return (
            <div className="container pt-3">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/products" component={Product}/>
                        <Route exact path="/wishList" component={WishList}/>
                    </Switch>
                </Router>

            </div>
        );
    }
}

App.propTypes = {};

export default App;
