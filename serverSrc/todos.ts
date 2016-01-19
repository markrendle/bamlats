/// <reference path="typings/express/express.d.ts" />

import express = require('express');
import data = require('./data');
var config = require('./config.json');


var router = express.Router();

if (config.auth) {
    console.log('Authorization enabled.')
    router.use((req,res,next) => {
        var auth = req.get('Authorization');
        // Authorization: Bearer 09u34pfre.qp3948ufj98whg.pw984ugw98j3g
        if (auth !== 'SecretSquirrel') {
            res.status(401).send("Unauthorized");
        } else {
            next();
        }
    });
}

router.get('/', (req,res) => {
    data.toDos.list((err,posts) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.send(posts);
        }
    });
});

router.get('/:id', (req,res) => {
    data.toDos.get(req.params.id, (err,post) => {
        if (err) {
            res.sendStatus(500);
        } else if (!post) {
            res.sendStatus(404);
        } else {
            res.send(post);
        }
    })
});

router.post('/', (req,res) => {
    data.toDos.add(req.body, (err) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

router.put('/:id', (req,res) => {
    data.toDos.update(req.body, (err) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

router.delete('/:id', (req,res) => {
    data.toDos.delete(req.params.id, (err) => {
        if (err) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    })
});

router.get('/:id/notes', (req,res) => {
    data.toDos.getNotes(req.params.id, (err,post) => {
        if (err) {
            res.sendStatus(500);
        } else if (!post) {
            res.sendStatus(404);
        } else {
            res.send(post);
        }
    })
});

router.post('/:id/notes', (req,res) => {
    data.toDos.setNote(req.params.id, req.body, (err) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

router.put('/:id/notes/:noteId', (req,res) => {
    data.toDos.setNote(req.params.id, req.body, (err) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

module.exports = router;