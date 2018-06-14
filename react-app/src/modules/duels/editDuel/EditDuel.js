import React from "react"
import PropTypes from 'prop-types'
import DuelDialog from '../duelDialogNew/DuelDialogNew'
import RaisedButton from 'material-ui/RaisedButton'
import config from '../../../config'


class EditDuel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userScore: "",
            oponentScore: ""
            // dialogOpen: false
        }

    }

    handleClose = () => {
        this.props.handleClose()
        // this.setState({dialogOpen: false})
    }

    handleUserInputChange = event => {
        event.preventDefault()
        this.setState({userScore: event.target.value})
    }

    handleOponentInputChange = event => {
        event.preventDefault()
        
        this.setState({oponentScore: event.target.value})
    }

    handleSaveClick = () => {

        let score = {
            user1: null,
            user2: null
        }

        if(this.props.user._id === this.props.duel.user1) {
            score.user1 = parseInt(this.state.userScore)
            score.user2 = parseInt(this.state.oponentScore)
        } else if (this.props.user._id === this.props.duel.user2) {
            score.user2 = parseInt(this.state.userScore)
            score.user1 = parseInt(this.state.oponentScore)
        }

        let content = JSON.stringify({
            _id: this.props.duel._id,
            result: {score: score}
        })

        fetch(config.getRoute("duel"), {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: content
        }).then(response => {
            this.props.onEditSuccess()
            console.log(response)
        }).catch(error => {
            console.error(error)
        })


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
                                userScore={this.state.userScore}
                                oponentScore={this.state.oponentScore}
                                handleOponentInputChange = {this.handleOponentInputChange}
                                handleUserInputChange = {this.handleUserInputChange}
                                handleClose={this.handleClose}
                                buttons={buttons}/> 
                    : <div />}
            </div>
        )
    }
}

// EditDuel.propTypes = {
//     duel: PropTypes.object.isRequired
// }

export default EditDuel