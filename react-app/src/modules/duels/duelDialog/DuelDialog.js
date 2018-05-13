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

        }
    }

    handleClose = () => {
        this.setState({open: false})
        if(this.props.handleClose) {
            this.props.handleClose()
        }
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        // console.log(this.state, prevState)
        // console.log(this.props,  nextProps)
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

        // if(nextProps.duel !== prevState.duel) {
        //     return {
        //         duel: nextProps.duel,
        //         textFieldValue1: "",
        //         textFieldValue2: "",
        //         avatar1: "",
        //         avatar2: ""
        //     }
        // }

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

        return {
            newDuel: nextProps.newDuel,
            textFieldValue1: nextProps.user.username,
            avatar1: `${config.getRoute("avatars")}/${nextProps.user._id}.png`

        }
    }

    handleUpdateInput2 = (value) => {
        let date = new Date()

        if(this.state.prevDate2){
            let diff = date.getTime() - this.state.prevDate2.getTime()
            if(diff > 500) {
                this.fetchSugestions(value, 2)
            }
            // console.log(diff, date.getTime(), this.state.prevDate2.getTime())
            
        }

        this.setState({textFieldValue2: value, prevDate2: date})
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
        let title = "New duel"

        if(!this.state.newDuel && this.state.duel) {
            title = `${this.state.duel.username1.username} vs ${this.state.duel.username2.username}`
        }

        // console.log(this.state.newDuel)

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
                    // defaultValue={username1}
                    searchText={this.state.textFieldValue1}
                    // onUpdateInput={this.handleUpdateInput}
                    />
             </ListItem>
             <ListItem
                disabled={true}
                leftAvatar={
                    <Avatar src={this.state.avatar2}>

                        </Avatar>
                }
                >
                 <AutoComplete
                    hintText="Type anything"
                    dataSource={this.state.dataSource2}
                    // defaultValue={username2}
                    searchText={this.state.textFieldValue2}
                    onUpdateInput={this.handleUpdateInput2}
                    />
             </ListItem>
             </List>
        </ Dialog>
        )
    }

}

export default DuelDialog