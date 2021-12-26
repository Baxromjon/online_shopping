import React, {Component} from 'react';
import {TOKEN} from "../utils/constant";
import request from "../utils/request";
import api from "../utils/api";
import {firebaseAuth} from "../utils/firebase";
import {AvField, AvForm} from 'availity-reactstrap-validation'
import firebase from "firebase";


class Login extends Component {

    state = {
        reCaptcha: '',
        smsSent: false,
        data: '',
        confirmationResult: ''
    }

    componentDidMount() {
        if (localStorage.getItem(TOKEN)) {
            this.props.history.push('/cabinet')
        } else {
            this.props.history.push('/register')
            let cont = document.getElementById('reCaptcha');
            this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(cont, {
                'size': 'invisible',
                'callback': (res) => {
                },
                'expired-callback': () => {
                },
                'error-callback': () => {
                    alert("Xatolik!!! Iltimos birozdan keyin qayta urinib ko`ring!")
                }
            });
            this.recaptchaVerifier.render().then(r =>
                this.setState({reCaptcha: this.recaptchaVerifier}));

        }
    }

    login = (e, v) => {
        request({
            url: api.loginUrl,
            method: 'POST',
            data: v,

        }).then(res => {
            if (res.status === 200) {
                localStorage.setItem(TOKEN, 'Bearer ' + res.data.data)
                this.props.history.push('/cabinet')
            }
            {
                console.log("Loginga keldi")
            }
        }).catch(err => {
            alert(err.data)
        })
    }
    routeToRegister = () => {
        this.props.history.push('/register')
    }
    // routeToVerification = () => {
    //     this.props.history.push('/verification')
    // }
    sendFirebase = (phoneNumber) => {
        firebaseAuth.signInWithPhoneNumber(phoneNumber, this.state.reCaptcha)
            .then(res => {
                this.setState({
                    smsSent: true,
                    confirmationResult: res
                })
            })
    }
    // checkPasswordAndLogin = (e, v) => {
    //     request({
    //         method: 'POST',
    //         url: api.checkPasswordAndLoginUrl,
    //         data: v
    //     }).then(res => {
    //         this.sendFirebase(v.phoneNumber);
    //         this.setState({data: v})
    //     }).catch(err => {
    //         alert("err.response.data.message")
    //     })
    // }

    // verification = (e, v) => {
    //     // v.confirmationResult = this.state.confirmationResult;
    //     this.setState({
    //         confirmationResult: v.confirmationResult
    //     })
    //     request({
    //         method: 'POST',
    //         url: api.verification,
    //         data: v
    //     }).then(res => {
    //         alert("ddd")
    //         this.login(v)
    //         this.setState({data: v})
    //         this.routeToVerification()
    //     }).catch(err => {
    //         alert("jjjj")
    //     })
    // }

    // sendSmsToFirebase = (e, v) => {
    //     this.state.confirmationResult.confirm(v.code)
    //         //
    //         // this.setState({
    //         //     confirmationResult: confirm(v.code)
    //         // })
    //         .then(res => {
    //             this.login(this.state.data)
    //         }).catch(err => {
    //         alert("Kod xato")
    //     })
    //
    // }

    render() {
        return (
            <div>
                <h1 className="text-center">Login</h1>
                <AvForm onValidSubmit={this.login}>
                    <AvField
                        placeholder="enter phone number"
                        validate={{required: {value: true, errorMessage: "Please enter phoneNumber"}}}
                        name="phoneNumber"
                    />
                    <AvField
                        placeholder="enter password"
                        validate={{required: {value: true, errorMessage: "Please enter password"}}}
                        type="password"
                        name="password"
                    />
                    <button className="btn btn-success m-1">sign up</button>
                    {/*<button className="btn btn-primary m-1"*/}
                    {/*        onClick={this.routeToRegister}*/}
                    {/*        type="button"*/}
                    {/*>sign in*/}
                    {/*</button>*/}
                </AvForm>

            </div>
        );
    }


}


export default Login;