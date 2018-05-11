import React from 'react'
import Muuri from 'muuri'
import config from '../../config'
import ReactDOM from 'react-dom'

import './Duels.css'

class Duels extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            grid: null,
            items: [],
            duels: [],
            usersResolved: []
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
        let duelsResolved = this.state.items


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

        console.log(usersToResolve)

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

        console.log(this.state.usersResolved)
    }


    onDuelClick = (id) => {
        let duel = this.state.duels.find(element => element._id === id)
        console.log(duel)
    }

    componentWillUnmount = () => {
        this.state.grid.destroy()
    }

    createItems = () => {
        console.log(this.state.duels)
        let duels = this.state.duels

        // console.log(this.state.grid)

        if(!duels) return
        let items = duels.map((duel, index) => {

            // if()
            // console.log(this.state.usersResolved)
            if(this.state.usersResolved.length < 2) return
            let username1 = this.state.usersResolved.find(elem => duel.user1 === elem.id).username
            let username2 = this.state.usersResolved.find(elem => duel.user2 === elem.id).username
            // console.log(username1, username2)

            let itemElem = document.createElement('div')
            let itemTmp = '<div class="item" key={"item-"' + index +'}>' +
                                '<div class="item-content">' +
                                    '<div class="my-inside" value=' + duel._id + '>' +
                                        'Duel: <br />'+
                                        username1 + ' vs '+ username2 +
                                    '</div>'
                                '</div>'
                            '</div>'
            itemElem.innerHTML = itemTmp

            console.log(itemElem.firstChild)
            return [itemElem.firstChild, duel._id]
        })

        console.log(items)
        return items

    }

    render() { 
        let items = this.createItems()
        if(this.state.grid && items[0]){
            this.state.grid.add(items.map(item => item[0]))

            let gridItems = this.state.grid.getItems() 
            gridItems.forEach(item => item._element.onclick=(event)=>console.log(event.target.value))
            console.log(gridItems)

        }

        // console.log(this.state.grid.)

        return(
            <div className="grid">
                {/* {items} */}
            </div>
        )
    }

}

export default Duels