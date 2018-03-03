import express from express

let app = express()
let port = process.env.port || 3000

app.listen(port)

console.log("Server started on port: ", port)