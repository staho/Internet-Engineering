import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import config from '../../config'

class Login extends React.Component {
    static muiName = 'Login'
    constructor(props){
        super(props)
        this.state = {
            showDialog: false,
            username: "",
            password: ""

        }
    }

    handleOpen = () => {
        this.setState({showDialog: true})
    }

    onSubmit = () => {

        let userData = JSON.stringify({
            username: this.state.username,
            password: this.state.password
        })

        fetch(config.apiUrl + "/login", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: userData
        }).then(response => {
            return response.json()
        }).then(jsonResponse => {
            localStorage.setItem("token", jsonResponse.token)
            this.handleClose()
            this.props.onChange(true)
        }).catch(err => {
            console.error(err)
        })
    }

    handleClose = () => {
        this.setState({showDialog: false})
    }

    onUsernameChange = (event) => {
        this.setState({username: event.target.value})
    }

    onPasswordChange = (event) => [
        this.setState({password: event.target.value})
    ]

    render(){

        const actions = [
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
            />
          ]
      
        return(
            <div>
                <FlatButton {...this.props} label="Login"
                    onClick = {this.handleOpen}
                />
                <Dialog 
                    title="Sign in"
                    actions={actions}
                    modal={false}
                    open={this.state.showDialog}
                    onRequestClose={this.handleClose}
                    width="10%"
                    maxWidth="20%"
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
            </div>
        )
    }
}

export default Login
