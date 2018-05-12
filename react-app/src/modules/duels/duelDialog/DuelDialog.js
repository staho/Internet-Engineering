import React from 'react'
import Dialog from 'material-ui/Dialog'
import config from '../../../config'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

class DuelDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            duel: props.duel,
            open: props.showDialog,
            newDuel: false

        }
    }

    handleClose = () => {
        this.setState({open: false})
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if(nextProps.showDialog !== prevState.open) {
            return {
                open: nextProps.showDialog,
                duel: nextProps.duel,
                newDuel: prevState.newDuel
            }
        }

        return null
    }


    render() {
        // console.log("render dialog", this.state.duel)
        let title = "New duel"

        if(!this.state.newDuel && this.state.duel) {
            title = `${this.state.duel.username1.username} vs ${this.state.duel.username2.username}`
        }

        return (
        <Dialog
            title={title}
            // actions={actionsRegister}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >
            {/* <TextField
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
            /> */}
        </ Dialog>
        )
    }

}

export default DuelDialog