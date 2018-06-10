import React from "react"
import PropTypes from 'prop-types'
import DuelDialog from '../duelDialogNew/DuelDialogNew'
import RaisedButton from 'material-ui/RaisedButton'


class EditDuel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // dialogOpen: false
        }

    }

    // handleOpen = () => {
    //     this.setState({dialogOpen: true})
    // }

    handleClose = () => {
        this.props.handleClose()
        // this.setState({dialogOpen: false})
    }

    handleSaveClick = () => {

    }

    createButtons = () => {
        let buttons = []
        buttons.push(
            <RaisedButton key="edit-save-button"
                            label="SAVE"
                            primary={true} 
                            onClick={this.handleSaveClick}
                            style={{margin: 6}} />
        )
        buttons.push(
            <RaisedButton key="edit-close-button"
                label="Close"
                primary={false} 
                onClick={this.handleClose}
                style={{margin: 6}} />
        )
       
        return buttons
    }


    render = () => {
        let buttons = this.createButtons()
         

        return(
            <div>
                {this.props.duel? 
                    <DuelDialog duel={this.props.duel} 
                                open={this.props.open}
                                user={this.props.user}
                                handleClose={this.handleClose}
                                buttons={buttons}/> 
                    : <div />}
            </div>
        )
    }
}

EditDuel.propTypes = {
    duel: PropTypes.object.isRequired
}

export default EditDuel