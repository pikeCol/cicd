import React from "react";
import { Link } from "react-router-dom";
import styles from '../styles/Login.module.css';
const Forgotpass: React.FC = () => {
    return (
        <div className={styles.signcontainer}>
            <div className={styles.signinform}>
                <h1 className="welcome"><strong>Forgotten Password</strong></h1>
                <form>
                    <div className="formWrapper">
                    {/*<label htmlFor="email">E-Mail</label>*/}
                    <input type="text" id="email" name="email" placeholder="Enter your e-mail"/>

                    </div>
                
                    <button className="submit" type="submit"><strong>Send Link</strong></button>
    
                </form>
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

export default Forgotpass;
