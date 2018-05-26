import React from 'react'

class MyPackage extends React.Component {
    render() {
        return (
            <div style={{height: "inherit"}}>
                {this.props.children}
            </div>
        )
    }
}

export default MyPackage