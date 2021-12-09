import React, {Component} from 'react';
import PropTypes from 'prop-types';
import request from "../../utils/request";
import api from "../../utils/api"

class Product extends Component {

    state={
        product:[],
        currentProduct:'',
        measurement:[],
        currentMeasurement:[],
        category:[],
        currentCategory:'',

    }

    componentDidMount() {
        this.getProduct()
    }

    getProduct=()=>{
        request({
            url:api.getProduct,
            method:'GET'
        }).then(res=>{
            this.setState({products:res.data})
            console.log(res.data)
        }).catch(err=>{})
    }

    render() {
        return (
            <div>
                <h1>Product list</h1>
            </div>
        );
    }
}

Product.propTypes = {};

export default Product;