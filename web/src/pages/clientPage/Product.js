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
        this.getCategory()
        this.getMeasurement()
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

    getCategory = () => {
        request({
            url: api.getCategory,
            method: 'GET'
        }).then(res => {
            this.setState({category: res.data})
        }).catch(err => {
        })
    }

    getMeasurement = () => {
        request({
            url: api.getMeasurement,
            method: 'GET'
        }).then(res => {
            this.setState({measurement: res.data})
        }).catch(err => {
        })
    }

    editProduct = (product) => {
        this.openModal();
        this.setState({
            currentProduct: product,
            currentCategory: product.category,
            currentMeasurement: product.measurement
        })
    }

    saveProduct = (e, v) => {
        let current = this.state.currentProduct;
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

    deleteProductModal = (product) => {
        console.log(product)
        this.setState({
            deleteModal: true,
            currentProduct: product,
            currentCategory: product.category,
            currentMeasurement: product.measurement
        })
    }
    hideDeleteModal = () => {
        this.setState({
            deleteModal: !this.state.deleteModal,
            currentProduct: ''
        })
    }

    deleteProduct = () => {
        let current = this.state.currentProduct
        request({
            url: api.deleteProduct + '/' + current._id,
            method: 'DELETE'
        }).then(res => {
            this.hideDeleteModal()
            this.getProduct()
        }).catch(err => {
        })
    }


    render() {
        return (
            <div>
                <h1 className="text-center">Product list</h1>
                <button className="btn btn-success btn-outline-light"
                        onClick={this.openModal}
                >addProduct
                </button>
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
                                        onClick={() => this.deleteProductModal(item)}>DELETE
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
                                placeholder="enter product name"
                                defaultValue={this.state.currentProduct.name}
                                name="name" required/>
                            <AvField
                                placeholder="enter product standard price"
                                defaultValue={this.state.currentProduct.standardPrice}
                                name="standardPrice" required/>
                            <AvField
                                type="select"
                                name="categoryId"
                                defaultValue={this.state.currentCategory.name}>
                                <option value="" disabled>select category</option>
                                {this.state.category?.map(item =>
                                    <option value={item._id}>{item.name}</option>)}
                            </AvField>
                            <AvField
                                type="select"
                                name="measurementId"
                                defaultValue={this.state.currentMeasurement.name}>
                                <option value="">Select Measurement</option>
                                {this.state.measurement?.map(item =>
                                    <option value={item._id}>{item.name}</option>)}
                            </AvField>
                            <button className="btn btn-success">Save</button>
                            <button className="btn btn-danger"
                                    onClick={this.openModal}>Cancel
                            </button>
                        </AvForm>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.deleteModal}>
                    <ModalHeader>{"Do you want delete this product  " + this.state.currentProduct.name}</ModalHeader>
                    <ModalFooter>
                        <button className="btn btn-danger"
                                onClick={this.deleteProduct}>Delete
                        </button>
                        <button className="btn btn-success"
                                onClick={this.hideDeleteModal}>Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            </div>


        );
    }
}

Product.propTypes = {};

export default Product;