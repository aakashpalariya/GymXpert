import React from 'react'
import styles from './Auth.module.css'

const SignInForm = () => {
    return (
        <div className={styles.signin_box}>
            <h1>Sign In</h1>
            <p>Enter your email and password to sign in!</p>
            <form>
                <p className={styles.labels}>Email</p>
                <input type="email" placeholder="info@gmail.com" className={styles.auth_input_field} />

                <p className={styles.labels}>Password</p>
                <div className={styles.password_wrapper}>
                    <input type="password" placeholder="Enter your password" className={styles.auth_input_field} />
                </div>

                <div className={styles.auth_options}>
                    <div>
                        <input type='checkbox' className={styles.auth_checkbox} id="keep-logged-in" />
                        <label>Keep me logged in</label>
                    </div>
                    <a href="/reset-password" className={styles.auth_forgot_password}>Forgot password?</a>
                </div>
                <div className={styles.signin_wrapper}>
                    <button type="submit" className={styles.signin_button}>Sign In</button>
                </div>
            </form>
            <p className={styles.signup_text}>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
    )
}

export default SignInForm