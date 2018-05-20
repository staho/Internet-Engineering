import React from "react"
import Snackbar from 'material-ui/Snackbar'

class AddedSnackbar extends React.Component {


    render() {
        return(
            <Snackbar
                open={this.props.open}
                message="Duel added successfuly"
                autoHideDuration={3000}
                // onRequestClose={this.handleRequestClose}
                />

        )
    }
}

export default AddedSnackbar