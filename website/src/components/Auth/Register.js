import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { registerUser } from '../../actions/authActions';


class Register extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            login: '',
            password: '',
            password2: '',
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    handleChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit (e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            login: this.state.login,
            password: this.state.password,
            password2: this.state.password2
        }
        this.props.registerUser(userData, this.props.history);
    }    
    
    render () {
        const { classes } = this.props;
        const { errors } = this.state
        return (
            <div>
                 <div className={classes.banner}>

                <h1>
                    <b>Register for a free account on BoardClub</b>
                </h1>
                <p>
                    Join a community of game enthusiasts and connect with people that want to play the same games as you!
                </p>
                 </div>
            <Paper elevation={2} style={{ padding: 15 }}>
            <p className={classes.redirect}>
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        type="email"
                        label="Email"
                        name="email"
                        variant="outlined"               
                        value={this.state.email}
                        onChange={this.handleChange}         
                        className={classes.textField}
                        helperText={errors.email ? errors.email : ''}
                        error={errors.email ? true : false}
                    />
                    <TextField
                        label="Login"
                        type="text"
                        name="login"
                        variant="outlined"                                       
                        value={this.state.login}  
                        onChange={this.handleChange}    
                        className={classes.textField}
                        helperText={errors.login ? errors.login : ''}
                        error={errors.login ? true : false}
                    />                    
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        variant="outlined"                                       
                        value={this.state.password}   
                        onChange={this.handleChange}   
                        className={classes.textField}
                        helperText={errors.password ? errors.password : ''}
                        error={errors.password ? true : false}
                    />
                    <TextField
                        label="Repeat password"
                        type="password"
                        name="password2"
                        variant="outlined"               
                        value={this.state.password2} 
                        onChange={this.handleChange}     
                        className={classes.textField}
                        helperText={errors.password2 ? errors.password2 : ''}
                        error={errors.password2 ? true : false}
                    />
                    <div className={classes.btnBlock}>
                    <Button variant="outlined" type="submit" className={classes.btnStyle} style={{ backgroundColor: "#65A2FE" }} >
                            Submit
                        </Button> 
                    </div>
                </form>
            </Paper>  
            </div>

        )
    }
}


const styles = {
    textField: {
        width: '100%',
        marginBottom: 25
    },
    btnBlock: {
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 20
    },
    btnStyle: {
        backgroundColor: "#65A2FE",
        color: "white",
        border: "white",
    },
    banner: {
        textAlign: 'center',
        marginBottom: "90px",
        color: "#595959"
    },
    redirect: {
        marginBottom: 50,
        textAlign: 'center',
        color: "#595959"
    },
}


const mapStateToProps = (state) => ({
    errors: state.errors
})


export default connect(mapStateToProps, { registerUser })(withRouter(withStyles(styles)(Register)));