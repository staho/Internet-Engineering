import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
// import IconButton from 'material-ui/IconButton'
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import FlatButton from 'material-ui/FlatButton/FlatButton';


class Logged extends React.Component {
    static muiName = 'Logged'
    constructor(props){
        super(props)
    }

    handleChange = (event, value) => {
        if(value === "3") {
            this.props.onChange(false)
        }
        console.log(value)
    }

    render() {
        console.log(this.props.user)
        return(
            <IconMenu 
                iconButtonElement={
                    <FlatButton label={this.props.user.username.toUpperCase()} />
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                onChange={this.handleChange}
                >
                <MenuItem primaryText="Refresh" value="1"/>
                <MenuItem primaryText="Help" value="2" />
                <MenuItem primaryText="Sign out" value="3" />

            </IconMenu>
        )
    }
}

export default Logged

