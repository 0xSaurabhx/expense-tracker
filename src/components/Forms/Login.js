import React, {Component} from 'react';
import fire from '../../config/Fire';
import { FaEyeSlash,FaEye } from 'react-icons/fa';
import './Login.css';

class Login extends Component {
    state = {
        email: '',
        password: '',
        fireErrors: ''
    }

    login = e => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error) => {
            this.setState({fireErrors: error.message})
        });
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    toggleShowPassword = event => {
        event.preventDefault()
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }));
    };

    render() {
        const { password, showPassword } = this.state;

        let errorNotification = this.state.fireErrors ? 
            ( <div className="Error"> {this.state.fireErrors} </div> ) : null;

        
        return (
            <>
                {errorNotification}
                <form>
                    <input type="text"
                        className="regField"
                        placeholder="Email"
                        value={this.state.email} 
                        onChange={this.handleChange}
                        name="email"
                        />
                    <input
                        className="regField"
                        placeholder="Pasword"
                        value={password}
                        onChange={this.handleChange}
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                    />
                    <button className="showPasswordBtn" onClick={this.toggleShowPassword}>
                            {showPassword ? <FaEyeSlash/> : <FaEye/>}
                        </button>
                    <input className="submitBtn" type="submit" onClick={this.login} value="ENTER" />
                </form>
            </>
        );
    }
}
export default Login;