import React from 'react'
import Dialog from 'material-ui/Dialog'
import config from '../../../config'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

class DuelDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            duel: {...props.duel},
            open: props.showDialog

        }
    }

    handleClose = () => {
        this.setState({open: false})
    }

    render() {

        return (
        <Dialog
            title="${this.state.duel.username1} vs "
            // actions={actionsRegister}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >
            <TextField
                floatingLabelText="Username"
                // value={this.state.username}
                // onChange={this.onUsernameChange}
                // errorText={this.state.usrValidationStatus}
                // fullWidth={true}
            /><br />
            <TextField
                hintText="Password Field"
                // floatingLabelText="Password"
                // value={this.state.password}
                // onChange={this.onPasswordChange}
                // type="password"
                // fullWidth={true}
            />
            <TextField
                hintText="Repeat password"
                // floatingLabelText="Repeat password"
                // value={this.state.passwordRepeat}
                // onChange={this.onPasswordRepeatChange}
                // type="password"
                // fullWidth={true}
                // errorText={this.state.pwdValidationStatus}
            />
        </ Dialog>
        )
    }

}

export default DuelDialog