import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import DuelDialog from '../duelDialog/DuelDialog'


const style = {
    // marginRight: 20,
    right: 10,
    bottom: 76,
    position: "absolute",

}

class AddDuel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openDialog: false,
            user: this.props.user
        }
    }

    onAddClick = (event) => {
        event.preventDefault()
        this.setState({openDialog: true})
        // console.log("XD")

    } 

    handleClose = () => {
        this.setState({openDialog: false})
    }

    render() {

        let duelDialog = <div />
        if(this.state.openDialog) {
            duelDialog = <DuelDialog 
                            key="add-dialog"
                            showDialog={this.state.openDialog}
                            newDuel={true}
                            user={this.props.user} 
                            handleClose={this.handleClose}/> 
        }

        return (
            <div>
                {duelDialog}
                <FloatingActionButton style={style} >
                    <ContentAdd onClick={event => this.onAddClick(event)}/>
                </FloatingActionButton>

            </div>

        )
    }



}

export default AddDuel