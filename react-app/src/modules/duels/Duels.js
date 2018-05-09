import React from 'react'
import Muuri from 'muuri'
import config from '../../config'

import './Duels.css'

class Duels extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            grid: null,
            items: [],
            duels: []
        }
    }

    componentDidMount = () => {
        let grid = new Muuri('.grid', {
            dragEnabled: true
        })

        this.setState({grid: grid})
        this.getDuels()
    }

    getDuels = () => {
        fetch(config.getRoute("duels"), {
            method: "GET",
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("token")
            },
      
          }).then(response => {
            if (response.status === 401) {
              throw new Error(response.statusText)
            } else if(!response.ok) {
              throw new Error(response.statusText)
            }
            return response
          }).then(response => {
              return response.json()
          }).then(duels => {
            this.setState({duels: duels})
            console.log(duels)
          }).catch(err => {
            console.error(err)
          })
    }

    componentWillUnmount = () => {
        this.state.grid.destroy()
    }

    render() { 

        return(
            <div className="grid">
                <div className="item">
                    <div className="item-content">
                    {/* <!-- Safe zone, enter your custom markup --> */}
                    This can be anything.
                    {/* <!-- Safe zone ends --> */}
                    </div>
                </div>

                <div className="item">
                    <div className="item-content">
                    {/* <!-- Safe zone, enter your custom markup --> */}
                    <div className="my-custom-content">
                        Yippee!
                    </div>
                    {/* <!-- Safe zone ends --> */}
                    </div>
                </div>
            </div>
        )
    }

}

export default Duels