import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

const style = {
    marginRight: 20,
    right: 10,
    bottom: 76,
    position: "absolute",

}

class AddDuel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openDialog: false,
        }
    }


    render() {


        return (
            <div>
                
                <FloatingActionButton style={style} >
                    <ContentAdd />
                </FloatingActionButton>

            </div>

        )
    }



}

export default AddDuel