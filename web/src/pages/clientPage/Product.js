import React, {Component} from 'react';
import PropTypes from 'prop-types';
import request from "../../utils/request";
import api from "../../utils/api"
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {AvField, AvForm} from 'availity-reactstrap-validation';


class Product extends Component {

    state = {
        product: [],
        currentProduct: '',
        measurement: [],
        currentMeasurement: [],
        category: [],
        currentCategory: '',
        showModal: false,
        deleteModal: false

    }

    componentDidMount() {
        this.getProduct()
    }

    openModal = () => {
        this.setState({showModal: !this.state.showModal})
    }

    getProduct = () => {
        request({
            url: api.getProduct,
            method: 'GET'
        }).then(res => {
            this.setState({product: res.data})
        }).catch(err => {
        })
    }

    editProduct = (product) => {
        console.log(product)
        this.openModal();
        this.setState({
            currentProduct: product
        })
    }

    saveProduct = (e, v) => {
        let current = this.state.currentProduct;
        console.log(current)
        request({
            url: !current ? api.addProduct : (api.editProduct + '/' + current._id),
            method: !current ? 'POST' : 'PUT',
            data: v
        }).then(res => {
            this.getProduct()
            this.openModal()
        }).catch(err => {
        })
    }

    deleteProduct = (product) => {
        console.log(product)
        this.setState({
            deleteModal: true,
            currentProduct: product
        })
    }

    render() {
        return (
            <div>
                <h1 className="text-center">Product list</h1>
                <button className="btn btn-success btn-outline-light">addProduct</button>
                <hr/>
                <br/>
                <table className="table table-bordered text-center">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Product name</th>
                        <th>Standard Price</th>
                        <th>Product Category</th>
                        <th>Measurement</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.state.product?.map((item, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.standardPrice}</td>
                            <td>{item.category.name}</td>
                            <td>{item.measurement.name}</td>
                            <td>
                                <button className="btn btn-success"
                                        onClick={() => this.editProduct(item)}>EDIT
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-danger"
                                        onClick={() => this.deleteProduct(item)}>DELETE
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <Modal isOpen={this.state.showModal}>
                    <ModalHeader>
                        {this.state.currentProduct ? 'Edit Product' : 'Add product'}
                    </ModalHeader>
                    <ModalBody>
                        <AvForm onValidSubmit={this.saveProduct}>
                            <AvField
                                defaultValue={this.state.currentProduct.name}
                                name:"name" required/>
                        </AvForm>
                    </ModalBody>
                </Modal>
            </div>


        );
    }
}

Product.propTypes = {};

export default Product;