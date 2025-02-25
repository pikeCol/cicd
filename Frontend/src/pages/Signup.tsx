import React from "react";
import { Link } from "react-router-dom";
import styles from '../styles/Login.module.css';
const Signup: React.FC = () => {
    return (
        <div className={styles.signcontainer}>
            <div className={styles.signupform}>
                <h1><strong>Register</strong></h1>
                <form>
                    {/*<label htmlFor="email">E-Mail</label>*/}
                    <input type="text" id="email" name="email" placeholder="Enter your e-mail"/>

                    {/*<label htmlFor="username">Username</label>*/}
                    <input type="text" id="username" name="username" placeholder="Enter your username"/>

                    {/*<label htmlFor="password">Password</label>*/}
                    <input type="password" id="password" name="password" placeholder="Enter your password"/>

                    {/*<label htmlFor="password-check">Re-Enter Password</label>*/}
                    <input type="password" id="password-check" name="password-check" placeholder="Re-enter your password"/>
                    
                    {/*<label></label>*/}
                    <button className="submitbutton" type="submit"><strong>Sign Up</strong></button>

                    
                </form>
                <div className={styles.bottomtext}>
                    <p>Already have an account?</p>
                    <Link to="/login">
                    <a>Log in</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;