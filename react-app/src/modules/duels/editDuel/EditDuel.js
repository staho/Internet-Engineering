import React from "react"
import PropTypes from 'prop-types'
import DuelDialog from '../duelDialogNew/DuelDialogNew'

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


    render = () => {
        return(
            <div>
                {this.props.duel? 
                    <DuelDialog duel={this.props.duel} 
                                open={this.props.open}
                                handleClose={this.handleClose}/> 
                    : <div />}
            </div>
        )
    }
}

EditDuel.propTypes = {
    duel: PropTypes.object.isRequired
}

export default EditDuel