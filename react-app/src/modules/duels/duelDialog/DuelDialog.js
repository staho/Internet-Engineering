import React from 'react'
import Dialog from 'material-ui/Dialog'
import config from '../../../config'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import AutoComplete from 'material-ui/AutoComplete'
// import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import RaisedButton from 'material-ui/RaisedButton'
import AddedSnackbar from './AddedSnackbar'

const buttonStyle = {
    margin: 6,
}
const buttonDivStyle = {
    position: "absolute",
    right: 6,
    bottom: 6
}


class DuelDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            duel: props.duel,
            open: props.showDialog,
            newDuel: false,
            dataSource1: [],
            dataSource2: [],
            textFieldValue1: "",
            textFieldValue2: "",
            avatar1: "",
            avatar2: "",
            prevDate2: new Date(),
            prevDate1: new Date(),
            createdDuel: {},
            snackBarOpen: false

        }
    }

    handleClose = () => {
        this.setState({open: false, duel: undefined})
        if(this.props.handleClose) {
            this.props.handleClose()
        }
    }

    handleAdd = () => {
        if(this.state.createdDuel && this.state.createdDuel.user2) {
            let data = JSON.stringify(this.state.createdDuel)
            fetch(config.getRoute("newDuel"), {
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
        }).then(resJson => {
            if(resJson.success){
                this.openSnackBar()
                this.handleClose()
            }
        }).catch(err => {
            console.error(err)
        })
        }
    }

    openSnackBar = () => {
        this.setState({openSnackBar: true})
        let promise = new Promise(resolve => {
            setTimeout(this.setState({openSnackBar: false}), 3000)
        })
      

    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        console.log(nextProps, prevState)
        if(nextProps.showDialog !== prevState.open) {
            
            return {
                open: nextProps.showDialog,
                duel: nextProps.duel,
                newDuel: nextProps.newDuel,
                textFieldValue1: nextProps.duel.username1.username,
                textFieldValue2: nextProps.duel.username2.username,
                avatar1: `${config.getRoute("avatars")}/${nextProps.duel.user1}.png`,
                avatar2: `${config.getRoute("avatars")}/${nextProps.duel.user2}.png`,
            }
        }


        if(nextProps.duel) {
            console.log("xdd")
            return {
                duel: nextProps.duel,
                textFieldValue1: nextProps.duel.username1.username,
                textFieldValue2: nextProps.duel.username2.username,
                avatar1: `${config.getRoute("avatars")}/${nextProps.duel.user1}.png`,
                avatar2: `${config.getRoute("avatars")}/${nextProps.duel.user2}.png`,
                newDuel: nextProps.newDuel,

            }
        }
        console.log("hir")
        return {
            newDuel: nextProps.newDuel,
            textFieldValue1: nextProps.user.username,
            avatar1: `${config.getRoute("avatars")}/${nextProps.user._id}.png`

        }
    }

    handleUpdateInput = (value, storeNum) => {
        let date = new Date()
        let prevDate = this.state[`prevDate${storeNum}`]
        if(prevDate){
            let diff = date.getTime() - prevDate.getTime()
            if(diff > 500) {
                this.fetchSugestions(value, storeNum)
            }
            
        }
        
        if( storeNum === 1 ) {
            this.setState({textFieldValue1: value, prevDate1: date})
        } else if( storeNum === 2 ) {
            this.setState({textFieldValue2: value, prevDate2: date})
        }
    }

    onNewRequest = (choosenRequest, index) => {
        let data = JSON.stringify({username: choosenRequest})
        fetch(config.getRoute("userProfile"), {
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
            let user = jsonRes.user
           this.setState({createdDuel: {user2: choosenRequest}, avatar2: `${config.getRoute("avatars")}/${user._id}.png`,})
        }).catch(err => {
            console.error(err)
        })
        console.log(choosenRequest)
    }

    fetchSugestions = (value, storeNum) => {
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
            if (storeNum === 1) {
                this.setState({dataSource1: jsonRes.users})
            } else if(storeNum === 2) {
                this.setState({dataSource2: jsonRes.users})
            } else {
                this.setState({dataSource1: jsonRes.users, dataSource2: jsonRes.users})
            }
        }).catch(err => {
            console.error(err)
        })
    }


    render() {
        let title = "New duel",
            buttons = []

        if(!this.state.newDuel && this.state.duel) {
            title = `${this.state.duel.username1.username} vs ${this.state.duel.username2.username}`
            buttons.push(<RaisedButton 
                            key="save-btn" 
                            label="Save" 
                            primary={true} 
                            style={buttonStyle}/>)
        } else {
            buttons.push(<RaisedButton 
                            key="add-btn" 
                            label="Add" 
                            primary={true} 
                            style={buttonStyle} 
                            onClick={this.handleAdd}
                            />)
        }

        buttons.push(<RaisedButton 
                        key="cancel-btn" 
                        label="Cancel" 
                        secondary={true} 
                        style={buttonStyle}
                        onClick={this.handleClose}
                        />)

        // console.log(this.state.avatar2)

        return (
            <Dialog
                title={title}
                // actions={actionsRegister}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                >
                <List>
                    <ListItem
                        disabled={true}
                        leftAvatar={
                            <Avatar src={this.state.avatar1} />
                        }
                        >
                        <AutoComplete
                            hintText="Type anything"
                            dataSource={this.state.dataSource1}
                            searchText={this.state.textFieldValue1}
                            onUpdateInput={(value) => this.handleUpdateInput(value, 1)}
                            onNewRequest={this.onNewRequest}
                            />
                    </ListItem>
                    <ListItem
                        disabled={true}
                        leftAvatar={
                            <Avatar src={this.state.avatar2} />
                        }
                        >
                        <AutoComplete
                            hintText="Username"
                            dataSource={this.state.dataSource2}
                            searchText={this.state.textFieldValue2}
                            onUpdateInput={(value) => this.handleUpdateInput(value, 2)}
                            onNewRequest={this.onNewRequest}
                            
                            />
                        </ListItem>
                    </List>
                    <div style={buttonDivStyle}>
                        {buttons}
                    </ div>
                    <AddedSnackbar open={this.state.snackBarOpen} />
            </ Dialog>
        )
    }

}

export default DuelDialog