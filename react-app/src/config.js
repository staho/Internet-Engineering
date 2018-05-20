let config = {
    apiUrl: "http://localhost:3000",
    routes: {
        profile: "/profile",
        login: "/login",
        register: "/register",
        duels: "/duels",
        username: "/username",
        usernames: "/usernames",
        users: "/users",
        userProfile: "/userProfile",
        newDuel: "/newDuel",

        avatars: "/avatars"
        
    },

    getRoute: property => {
        if(config.routes.hasOwnProperty(property))
            return config.apiUrl + config.routes[property]
        return "Unrecognised route"
    }
}


export default config