import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import DuelDialog from '../duelDialogNew/DuelDialogNew'
import config from '../../../config'
import RaisedButton from 'material-ui/RaisedButton'


const style = {
    // marginRight: 20,
    right: 10,
    bottom: 76,
    position: "absolute",

}

const buttonStyle = {
    margin: 6
}

class AddDuel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openDialog: false,
            user: this.props.user,
            versusDataSource: [],
            versusUsername: "",
            versusTimeout: null
        }
    }

    onAddClick = (event) => {
        event.preventDefault()
        this.setState({openDialog: true})
        // console.log("XD")

    }

    handleClose = () => {
        this.setState({openDialog: false, versusUsername: ""})
    }

    onVersusNewRequest = (data, index) => {

    }

    onVersusInputChange = value => {
        console.log(value)
        this.setState({versusUsername: value})

        clearTimeout(this.state.versusTimeout)

        this.setState({versusTimeout: setTimeout(
            () => this.fetchSugestions(value),
            350
        )})
        
    }


    fetchSugestions = value => {
        let data = JSON.stringify({q: value})

        fetch(config.getRoute("users"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: data
        }).then(response => {
            if(!response.ok) {
                throw new Error(response.statusText)
            }
            else return response
        }).then(response => {
            return response.json()
        }).then(jsonRes => {
                this.setState({versusDataSource: jsonRes.users})

        }).catch(err => {
            console.error(err)
        })
    }

    handleAddClick = () => {
        let data = JSON.stringify({user2: this.state.versusUsername})
        fetch(config.getRoute("newDuel"), {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: data
        }).then(res => {
            if(!res.ok) throw new Error(res.statusText)
            return res
        }).then(res => {
            return res.json()
        }).then(jsonRes => {
            console.log(jsonRes)
            this.handleClose()
        }).catch(err => {
            console.error(err)
        })
    }

    createAddButtons = () => {
        let addButton = <RaisedButton 
                            key="add-add-button"
                            label="Add" 
                            primary={true} 
                            onClick={this.handleAddClick}
                            style={buttonStyle}
                            />
        let cancelButton = <RaisedButton 
                                key="add-cancel-button"
                                label="Cancel" 
                                secondary={false} 
                                onClick={this.handleClose}
                                style={buttonStyle}
                            />
        return [addButton, cancelButton]
    }

    render() {

        let duelDialog = <div />
        if(this.state.openDialog) {
            duelDialog = <DuelDialog 
                            key="add-dialog"
                            open={this.state.openDialog}
                            newDuel={false}
                            user={this.props.user} 
                            handleClose={this.handleClose}
                            versusUsername={this.state.versusUsername}
                            versusDataSource={this.state.versusDataSource}
                            versusInputChange={this.onVersusInputChange}
                            versusNewRequest={this.onVersusNewRequest} 
                            buttons={this.createAddButtons()}>
                                </DuelDialog> 
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