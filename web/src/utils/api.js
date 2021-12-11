import {BASEURL} from "./constant";

export default {
    loginUrl: '/auth/login',
    registerUrl: '/auth/register',

    getProduct: '/products/allProducts',
    editProduct: '/product/edit',
    deleteProduct: '/product/delete',
    addProduct: '/product/add',
    getById: '/product/byId',

    //CATEGORY
    getCategory: '/category/getAll',
    addCategory: '/category/add',
    editCategory: '/category/edit',
    deleteCategory: '/category/delete',
    getCategoryById: '/category/byId',

    //MEASUREMENT
    getMeasurement: '/measurement/getAll',
    addMeasurement: '/measurement/add',
    editMeasurement: '/measurement/edit',
    deleteMeasurement: '/measurement/delete',
    getMeasurementById: '/measurement/byId',
}