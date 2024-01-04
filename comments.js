// create web server that can listen to request from client
// and send response back to the client
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import the model
const Comments = require('./models/comments');

// create router object
const commentRouter = express.Router();

// use body-parser to parse data sent by client
commentRouter.use(bodyParser.json());

// configure router to handle different endpoints
commentRouter.route('/')
    // get all comments
    .get((req, res, next) => {
        // get all comments from database
        Comments.find({})
            .populate('author')
            .then((comments) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comments);
            }, (err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            });
    })
    // add new comment
    .post((req, res, next) => {
        // create new comment document
        Comments.create(req.body)
            .then((comment) => {
                console.log('Comment created ', comment);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            });
    })
    // update all comments
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation is not supported on /comments');
    })
    // delete all comments
    .delete((req, res, next) => {
        // delete all comments from database
        Comments.deleteMany({})
            .then((response) => {
                console.log('Comments deleted ', response);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            }, (err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            });
    });

// configure router to handle different endpoints
commentRouter.route('/:commentId')
    // get a comment by id
    .get((req, res, next) => {
        // get all comments from database
        Comments.findById(req.params.commentId)
            .populate('author')
            .then((comment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            });
            // finish the web server route
    }
);
