const express = require("express")
const clientRouter = express.Router()
const Client = require("../models/client")

clientRouter.get("/", (req, res, next) => {
    //Get Full List of Clients
    Client.find((err, clients) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(clients)
    })
})
//Add new client
clientRouter.post("/", (req, res, next) => {
    req.body.user = req.auth._id
    const newClient = new Client(req.body)
    newClient.save((err, savedClient) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedClient)
    })
})

//Get Client by user id

clientRouter.get("/user", (req, res, next) => {
    Client.find({user: req.auth._id}, (err, client) => {
        if(err){
            res.status(500)
            next(err)
        }
        return res.status(200).send(client)
    })
})

//Delete Client
clientRouter.delete("/:clientId", (req, res, next) => {
    Client.findOneAndDelete(
        { _id: req.params.clientId, user: req.auth._id},
        (err, deletedClient) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted client: ${deletedClient.firstName} ${deletedClient.lastName}`)
        }
    )
})

//Update Exercise
clientRouter.put("/:clientId", (req, res, next) => {
    Client.findOneAndUpdate(
        { _id: req.params.clientId, user: req.auth._id},
        req.body,
        {new: true},
        (err, updatedClient) => {
            if(err){
                res.status(500)
                next(err)
            }
            return res.status(201).send(updatedClient)
        }
    )
})

module.exports = clientRouter