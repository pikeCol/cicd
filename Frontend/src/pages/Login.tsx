import React from "react";
import { Link } from "react-router-dom";
import styles from '../styles/Login.module.css';
import spotifyLogo from "../assets/Primary_Logo_White_RGB.svg";
const Login: React.FC = () => {
    return (
        <div className={styles.signcontainer}>
            <div className={styles.signinform}>
                <h1 className="welcome"><strong>Welcome Back</strong></h1>
                <form> {/* for our accounts*/}
                    <div className="formWrapper">
                    {/*<label htmlFor="username">Username</label>*/}
                    <input type="text" id="username" name="username" placeholder="Enter your username"/>

                    {/*<label htmlFor="password">Password</label>*/}
                    <input type="password" id="password" name="password" placeholder="Enter your password"/>

                    <div className={styles.options}>
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>

                        <Link to="/forgotpass"><a className={styles.forgor}>Forgot Password</a></Link>
                    </div>
                    </div>
                
                    <button className="submit" type="submit"><strong>Sign In</strong></button> 
    
                </form>
                {/* for spotify account*/}
                <div className={styles.altLoginDivider}>
                    <span>Or</span>
                </div>
                <div className={styles.spotifyButton}>
                    <button><img src={spotifyLogo}></img><strong>Login with Spotify</strong></button> 
                </div>
                <div className={styles.bottomtext}>
                    <p>Don't have an account?</p>
                    <Link to="/signup">
                    <a> Sign up</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
