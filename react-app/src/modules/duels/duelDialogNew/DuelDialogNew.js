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
            newDuel: false,
            versusAvatar: ""
        }
    }

    versusNewRequest = (data, index) => {
        // console.log(data)
        let avatar = `${config.getRoute("avatars")}/${this.props.versusDataSource.find(user => user.username === data)._id}.png`
        // console.log(avatar)
        this.setState({versusAvatar: avatar})
        this.props.versusNewRequest(data, index)
    }

    render = () => {
        let scoreCurUser = undefined
        let scoreSecUser = undefined
        if(!this.props.newDuel && this.props.duel.result) {
            if(this.props.user._id === this.props.duel.user1){
                scoreCurUser = this.props.duel.result.score.user1
                scoreSecUser = this.props.duel.result.score.user2
            } else if (this.props.user._id === this.props.duel.user2){
                scoreCurUser = this.props.duel.result.score.user2
                scoreSecUser = this.props.duel.result.score.user1
                

            }
        }

        let title = "New duel",
            avatar1 = "",
            avatar2 = "",
            username2 = "",
            buttons = this.props.buttons? this.props.buttons : []

        if(!this.props.newDuel && this.props.duel) {
            title = `${this.props.duel.username1.username} vs ${this.props.duel.username2.username}`
            avatar1 = `${config.getRoute("avatars")}/${this.props.duel.user1}.png`
            avatar2 = `${config.getRoute("avatars")}/${this.props.duel.user2}.png`
            username2 = this.props.duel.username2.username
            
        } else {
            avatar1 = `${config.getRoute("avatars")}/${this.props.user._id}.png`
        }

        if(this.state.versusAvatar) avatar2 = this.state.versusAvatar

        if(this.props.versusUsername) {
            username2 = this.props.versusUsername
        }


        return (
            <Dialog
                title={title}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.handleClose}
                >
                <List>
                    <ListItem
                        disabled={true}
                        leftAvatar={avatar1 ? <Avatar src={avatar1} /> : <Avatar >N/A</Avatar> }
                        >
                        <AutoComplete
                            hintText="Username 1"
                            dataSource={this.props.dataSource1 ? this.props.dataSource1 : []}
                            searchText={this.props.duel? this.props.duel.username1.username : this.props.user.username}
                            // onUpdateInput={this.handleUpdateInput}
                            />
                    </ListItem>
                    <ListItem
                        disabled={true}
                        leftAvatar={avatar2 ? <Avatar src={avatar2} /> : <Avatar >N/A</Avatar>}
                        >
                        <AutoComplete
                            hintText="Username 2"
                            dataSource={this.props.versusDataSource ? this.props.versusDataSource.map(user => user.username) : []}
                            searchText={username2}
                            onUpdateInput={this.props.versusInputChange? this.props.versusInputChange : () => {}}
                            onNewRequest={this.props.versusNewRequest? this.versusNewRequest: () => {}}
                            />
                    </ListItem>
                    {!this.props.newDuel ? <ListItem
                        disabled={true}>
                        <TextField 
                            floatingLabelText="Your score" 
                            style={{width: "45%", margin: 6}}
                            value={scoreCurUser ? scoreCurUser : 0}/>
                        <TextField 
                            floatingLabelText="Oponent score" 
                            style={{width: "45%", margin: 6}}
                            value={scoreSecUser ? scoreSecUser : 0}/>
                    </ListItem> : <div/>}
                   
                </List>
                {buttons}
            </ Dialog>
        )
    }

}

export default DuelDialog