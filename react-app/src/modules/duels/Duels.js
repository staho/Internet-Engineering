import React from 'react'
import Muuri from 'muuri'
import config from '../../config'
import AddDuel from './addDuel/AddDuel'
import EditDuel from './editDuel/EditDuel'
// import InfiniteScroll from './index'
import InfiniteScroll from 'react-infinite-scroller'
import MyPackage from './MyPackage'
import './Duels.css'
import PropTypes from 'prop-types'
// import DuelDialog from './duelDialog/DuelDialog';

class Duels extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            grid: null,
            items: [],
            itemsToAdd: [],
            duels: [],
            usersResolved: [],
            showDialog: false,
            choosenDuel: undefined,
            contentHeight: 0
        }
    }

    componentDidMount = () => {
        // document.registerElement('package')
        let grid = new Muuri('.grid', {
            dragEnabled: true
        })
        console.log(this.refs)
        // console.log()
        // const height = this.refs["duels-container"].clientHeight
        grid.on('add', items => items.forEach(item => item._element.onclick = event => this.onDuelClick(event.target.attributes.duelid.nodeValue)))

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
            
                return duels

            }).then(duels => {
                this.resolveDuels(duels)

            }).catch(err => {
                console.error(err)
            })
    }

    resolveUsernames = ids => {
        let bodyContext = JSON.stringify({ids: ids})

        return fetch(config.getRoute("usernames"), {
            method: "POST",
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json"
            },
            body: bodyContext
          })
    }

    resolveDuels = (duels) => {

        let usersToResolve = []
        // let duelsResolved = this.state.items


        duels.forEach(duel => {
            let found = []

            usersToResolve.forEach(elem => {
                if(elem.id === duel.user1) found.push(1)
                if(elem.id === duel.user2) found.push(2)
            })

            if(found.length < 2) {
                if(!found.includes(1)) {
                    usersToResolve.push({ id: duel.user1, username: undefined })
                }
                if(!found.includes(2))
                usersToResolve.push({ id: duel.user2, username: undefined })
            }

        })

        this.resolveUsernames(usersToResolve.map(user => user.id)
            ).then(response => {

                if(!response.ok) throw new Error(response.statusText)
                return response
                
            }).then(response => {
                return response.json()
            }).then(users => {
                users.forEach(user => {
                    usersToResolve.find(x => x.id === user._id).username = user.username
                })
                this.setState({usersResolved: usersToResolve})
            }).catch(err => {
                console.error(err)
            })
    }


    onDuelClick = (id) => {
        let duel = this.state.duels.find(element => element._id === id)
        duel.username1 = this.state.usersResolved.find(user => user.id === duel.user1) 
        duel.username2 = this.state.usersResolved.find(user => user.id === duel.user2) 
        
        this.setState({choosenDuel: duel, showDialog: true})
        console.log(duel)
    }

    handleClose = () => {
        this.setState({showDialog: false, choosenDuel: undefined})
    }

    componentWillUnmount = () => {
        this.state.grid.destroy()
    }
    
    handleAddSuccess = () => {

    }

    handleEditSuccess = () => {

    }

    refresh = () => {
        console.log("refresh")
    }

    createItems = () => {
        let duels = this.state.duels

        if(!duels) return []

        let items = duels.map((duel, index) => {

            if(this.state.usersResolved.length < 2) return undefined

            let username1 = this.state.usersResolved.find(elem => duel.user1 === elem.id).username
            let username2 = this.state.usersResolved.find(elem => duel.user2 === elem.id).username

            let itemElem = document.createElement('div')
            let itemTmp = '<div class="item" key="item-' + duel._id +'">' +
                                '<div class="item-content">' +
                                    '<div class="my-inside" duelId=' + duel._id + '>' +
                                        'Duel: <br />'+
                                        username1 + ' vs '+ username2 +
                                    '</div>' +
                                '</div>' +
                            '</div>'
            itemElem.innerHTML = itemTmp

            return itemElem.firstChild
        })

        return items

    }

    render() { 
        // console.log("render", this.state.showDialog)
        let itemCount = 0
        let items = this.createItems()
        if(this.state.grid && items[0]){
            let gridItems = this.state.grid.getItems()
            itemCount = items.length

            items.forEach(item => {
                let newKey = item.attributes.key.nodeValue
                let found = gridItems.find(gridItem => gridItem._element.attributes.key.nodeValue === newKey)
                if(!found) this.state.grid.add(item)
            })
        }

        // console.log(this.refs["duels-container"].clientHeight)
   
        return(
            <div className="duels-container" style={{height: 'inherit'}}>
                <InfiniteScroll 
                    // style={{height:"inherit"}}
                    // dataLength={itemCount} 
                    // height="inherit"
                    // element="MyPackage"
                    className="content-height"
                    loadMore={()=>{}}
                    >
                    <div className="grid">
                    </div>
                </InfiniteScroll>
                <AddDuel user={this.props.user}
                            onAddSuccess={this.handleAddSuccess}/>
                <EditDuel duel={this.state.choosenDuel} 
                            open={this.state.showDialog}
                            handleClose={this.handleClose}
                            onEditSucces={this.handleEditSuccess}/>
                
                
            </div>
        )
    }

}

export default Duels