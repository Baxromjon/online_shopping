import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/clientPage/Product";
import Home from "./pages/Home";


class App extends Component {
    render() {
        return (
            <div className="container pt-3">
                <Router>
                    <Switch>
                        <Route path="/" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route exact path="/products" component={Product}/>
                    </Switch>
                </Router>

            </div>
        );
    }
}

App.propTypes = {};

export default App;
