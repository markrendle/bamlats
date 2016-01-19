/// <reference path="typings/express/express.d.ts" />
var express = require('express');
var data = require('./data');
var config = require('./config.json');
var router = express.Router();
if (config.auth) {
    console.log('Authorization enabled.');
    router.use(function (req, res, next) {
        var auth = req.get('Authorization');
        // Authorization: Bearer 09u34pfre.qp3948ufj98whg.pw984ugw98j3g
        if (auth !== 'SecretSquirrel') {
            res.status(401).send("Unauthorized");
        }
        else {
            next();
        }
    });
}
router.get('/', function (req, res) {
    data.toDos.list(function (err, posts) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.send(posts);
        }
    });
});
router.get('/:id', function (req, res) {
    data.toDos.get(req.params.id, function (err, post) {
        if (err) {
            res.sendStatus(500);
        }
        else if (!post) {
            res.sendStatus(404);
        }
        else {
            res.send(post);
        }
    });
});
router.post('/', function (req, res) {
    data.toDos.add(req.body, function (err) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.sendStatus(201);
        }
    });
});
router.put('/:id', function (req, res) {
    data.toDos.update(req.body, function (err) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.sendStatus(201);
        }
    });
});
router.delete('/:id', function (req, res) {
    data.toDos.delete(req.params.id, function (err) {
        if (err) {
            res.sendStatus(404);
        }
        else {
            res.sendStatus(200);
        }
    });
});
router.get('/:id/notes', function (req, res) {
    data.toDos.getNotes(req.params.id, function (err, post) {
        if (err) {
            res.sendStatus(500);
        }
        else if (!post) {
            res.sendStatus(404);
        }
        else {
            res.send(post);
        }
    });
});
router.post('/:id/notes', function (req, res) {
    data.toDos.setNote(req.params.id, req.body, function (err) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.sendStatus(201);
        }
    });
});
router.put('/:id/notes/:noteId', function (req, res) {
    data.toDos.setNote(req.params.id, req.body, function (err) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.sendStatus(201);
        }
    });
});
module.exports = router;
