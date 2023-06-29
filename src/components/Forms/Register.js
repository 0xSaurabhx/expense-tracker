import React, {Component} from 'react';
import fire from '../../config/Fire';
import './Reg.css';

class Register extends Component {
    state = {
        email: '',
        password: '',
        displayName: '',
        showPassword: false,
        fireErrors: ''
    }

    register = e => {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
            var currentUser = fire.auth().currentUser;
            currentUser.updateProfile({
                displayName: this.state.displayName
            })
        })
        .catch((error) => {
            this.setState({fireErrors: error.message})
        });
    }

    toggleShowPassword = () => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }));
    };

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

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
                        placeholder="Your Name"
                        value={this.state.displayName} 
                        onChange={this.handleChange}
                        name="displayName"
                        />
                    <input type="text"
                        className="regField"
                        placeholder="Email"
                        value={this.state.email} 
                        onChange={this.handleChange}
                        name="email"
                        />
                <div className="passwordField">
                    <input
                        className="regField"
                        placeholder="Pasword"
                        value={password}
                        onChange={this.handleChange}
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                    />
                    <button className="showPasswordBtn" onClick={this.toggleShowPassword}>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                        </div>
                    <input className="submitBtn" type="submit" onClick={this.register} value="REGISTER" />
                </form>
            </>
        );
    }
}
export default Register;