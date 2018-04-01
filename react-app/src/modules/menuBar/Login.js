import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import config from '../../config'
// import Tooltip from 'material-ui/Tooltip'

class Login extends React.Component {
    static muiName = 'Login'
    constructor(props) {
        super(props)
        this.state = {
            showDialog: false,
            showRegisterDialog: false,
            username: "",
            password: "",
            passwordRepeat: "",
            pwdValidationStatus: "",
            usrValidationStatus: "",
        }
    }

    handleOpen = () => {
        this.setState({ showDialog: true, showRegisterDialog: false })
    }

    handleRegisterOpen = () => {
        this.setState({ showDialog: false, showRegisterDialog: true })
    }

    onSubmit = () => {

        let userData = JSON.stringify({
            username: this.state.username,
            password: this.state.password
        })

        fetch(config.getRoute("login"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: userData
        }).then(response => {
            if(!response.ok)
                throw new Error(response.statusText)
            
            return response
        }).then(response => {
            return response.json()
        }).then(jsonResponse => {
            localStorage.setItem("token", jsonResponse.token)
            this.handleClose()
            this.props.onChange(true, this.state.username)
        }).catch(err => {
            console.error(err)
        })
    }

    handleClose = () => {
        this.setState({ showDialog: false, showRegisterDialog: false })
    }

    onUsernameChange = event => {
        this.setState({ username: event.target.value })

        if (event.target.value.length > 4) {
            this.setState({ usrValidationStatus: "" })
        } else {
            this.setState({ usrValidationStatus: "Username must be at least 5 characters long" })
        }
    }

    onPasswordChange = event => { this.setState({ password: event.target.value }) }

    onPasswordRepeatChange = event => {
        let target = event.target.value
        this.setState({ passwordRepeat: target })

        if (this.state.password === target) {
            this.setState({ pwdValidationStatus: "" })
        } else {
            this.setState({ pwdValidationStatus: "Passwords doesn't match" })
        }
    }

    onRegisterSubmit = () => {
        if (this.state.pwdValidationStatus === ""
            && this.state.usrValidationStatus === "") {

            let userData = JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })

            fetch(config.getRoute("register"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: userData
            }).then(response => {
                if(!response.ok)
                    throw new Error(response.statusText)
                
                return response
            }).then(response => {
                return response.json()
            }).then(jsonResponse => {
                console.log(jsonResponse)

                if (jsonResponse.errors) {
                    if (jsonResponse.errors.username) {
                        if (jsonResponse.errors.username.kind === "unique") {
                            this.setState({ usrValidationStatus: "Username already in database" })
                        }
                    } else if (jsonResponse.errors.password) {
                        //TODO: Dunno what but todo
                    }

                } else {
                    this.handleClose()
                    this.clearFields()
                }


            }).catch(err => {
                let errors = err.errors
                for (let propt in errors) {
                    console.log(propt)
                }
                console.error(err)
            })
        } else {
            console.log("Sth wrong with verification")
        }
    }

    clearFields = () => {
        this.setState({
            username: "",
            password: "",
            passwordRepeat: "",
            usrValidationStatus: "",
            pwdValidationStatus: ""
        })
    }

    render() {

        const actions = [
            // <Tooltip id="tooltip-bottom" title="Don't have an account?" placement="bottom">
            <FlatButton
                label="SIGN UP"
                primary={false}
                onClick={this.handleRegisterOpen}
            />
            // </ Tooltip>,
            ,
            <FlatButton
                label="Cancel"
                primary={false}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={false}
                onClick={this.onSubmit}
            />,

        ]

        const actionsRegister = [
            <FlatButton
                label="Cancel"
                primary={false}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.onRegisterSubmit}
            />,

        ]

        return (
            <div>
                <FlatButton {...this.props} label="Login"
                    onClick={this.handleOpen}
                />
                {/* <FlatButton {...this.props} 
                    label="Sign up" 
                    onClick={this.handleRegisterOpen}
                /> */}
                <Dialog
                    title="Sign in"
                    actions={actions}
                    modal={false}
                    open={this.state.showDialog}
                    onRequestClose={this.handleClose}
                // width="10%"
                // maxWidth="20%"
                >
                    <TextField
                        floatingLabelText="Username"
                        value={this.state.username}
                        onChange={this.onUsernameChange}
                        fullWidth={true}
                    /><br />
                    <TextField
                        hintText="Password Field"
                        floatingLabelText="Password"
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                        type="password"
                        fullWidth={true}
                    />
                </ Dialog>
                <Dialog
                    title="Sign up"
                    actions={actionsRegister}
                    modal={false}
                    open={this.state.showRegisterDialog}
                    onRequestClose={this.handleClose}
                // width="10%"
                // maxWidth="20%"
                >
                    <TextField
                        floatingLabelText="Username"
                        value={this.state.username}
                        onChange={this.onUsernameChange}
                        errorText={this.state.usrValidationStatus}
                        fullWidth={true}
                    /><br />
                    <TextField
                        hintText="Password Field"
                        floatingLabelText="Password"
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                        type="password"
                        fullWidth={true}
                    />
                    <TextField
                        hintText="Repeat password"
                        floatingLabelText="Repeat password"
                        value={this.state.passwordRepeat}
                        onChange={this.onPasswordRepeatChange}
                        type="password"
                        fullWidth={true}
                        errorText={this.state.pwdValidationStatus}
                    />
                </ Dialog>

            </div>
        )
    }
}

export default Login
