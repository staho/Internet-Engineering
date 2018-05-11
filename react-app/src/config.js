let config = {
    apiUrl: "http://localhost:3000",
    routes: {
        profile: "/profile",
        login: "/login",
        register: "/register",
        duels: "/duels",
        username: "/username",
        usernames: "/usernames"
        
    },

    getRoute: property => {
        if(config.routes.hasOwnProperty(property))
            return config.apiUrl + config.routes[property]
        return "Unrecognised route"
    }
}


export default config