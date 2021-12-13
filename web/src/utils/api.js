import {BASEURL} from "./constant";

export default {
    loginUrl: '/auth/login',
    registerUrl: '/auth/register',
    //PRODUCT
    getProduct: '/products/allProducts',
    editProduct: '/products/edit',
    deleteProduct: '/products/delete',
    addProduct: '/products/add',
    getById: '/products/byId',

    //CATEGORY
    getCategory: '/categories/getAll',
    addCategory: '/categories/add',
    editCategory: '/categories/edit',
    deleteCategory: '/categories/delete',
    getCategoryById: '/categories/byId',

    //MEASUREMENT
    getMeasurement: '/measurements/getAllMeasurement',
    addMeasurement: '/measurements/addMeasurement',
    editMeasurement: '/measurements/editMeasurement',
    deleteMeasurement: '/measurements/deleteMeasurement',
    getMeasurementById: '/measurements/byIdMeasurement',
}