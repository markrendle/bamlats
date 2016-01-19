/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/async/async.d.ts" />
var fs = require('fs');
var path = require('path');
var async = require('async');
var utf8 = { encoding: 'utf8' };
var ToDoData = (function () {
    function ToDoData() {
    }
    ToDoData.prototype.list = function (listCb) {
        fs.readdir('data', function (err, entries) {
            if (err) {
                listCb(err);
                return;
            }
            async.map(entries, function (entry, cb) {
                var dataFile = path.join('data', entry, 'data.json');
                fs.readFile(dataFile, utf8, function (err, json) {
                    var toDo = JSON.parse(json);
                    toDo.id = entry;
                    cb(null, toDo);
                });
            }, function (err, toDos) {
                if (err) {
                    listCb(err);
                }
                else {
                    listCb(null, toDos.filter(function (p) { return !!p; }));
                }
            });
        });
    };
    ToDoData.prototype.get = function (id, getCb) {
        var dir = path.join('data', id);
        fs.exists(dir, function (exists) {
            if (!exists) {
                getCb(null, null);
                return;
            }
            fs.readFile(path.join(dir, 'data.json'), utf8, function (err, data) {
                if (err) {
                    getCb(err, null);
                    return;
                }
                try {
                    var toDo = JSON.parse(data);
                    getCb(null, toDo);
                }
                catch (e) {
                    getCb(e, null);
                }
            });
        });
    };
    ToDoData.prototype.add = function (toDo, addCb) {
        var dir = path.join('data', toDo.id);
        fs.mkdir(dir, function (err) {
            if (err) {
                return addCb(err);
            }
            var notesDir = path.join(dir, 'notes');
            fs.mkdir(notesDir, function (err) {
                if (err) {
                    return addCb(err);
                }
                fs.writeFile(path.join(dir, 'data.json'), JSON.stringify(toDo), function (err) {
                    addCb(err);
                });
            });
        });
    };
    ToDoData.prototype.update = function (toDo, addCb) {
        var _this = this;
        var dir = path.join('data', toDo.id);
        fs.exists(dir, function (exists) {
            if (!exists) {
                _this.add(toDo, addCb);
                return;
            }
            fs.writeFile(path.join(dir, 'data.json'), JSON.stringify(toDo), function (err) {
                addCb(err);
            });
        });
    };
    ToDoData.prototype.delete = function (id, deleteCb) {
        var dir = path.join('data', id);
        fs.rmdir(dir, function (err) {
            deleteCb(err);
        });
    };
    ToDoData.prototype.getNotes = function (toDoId, cb) {
        var dir = path.join('data', toDoId, 'notes');
        fs.readdir(dir, function (err, entries) {
            if (err) {
                cb(err);
                return;
            }
            async.map(entries, function (entry, cb) {
                var dataFile = path.join(dir, entry);
                fs.readFile(dataFile, utf8, function (err, json) {
                    var note = JSON.parse(json);
                    cb(null, note);
                });
            }, function (err, notes) {
                if (err) {
                    cb(err);
                }
                else {
                    cb(null, notes.filter(function (p) { return !!p; }));
                }
            });
        });
    };
    ToDoData.prototype.setNote = function (toDoId, note, cb) {
        var dir = path.join('data', toDoId, 'notes');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        if (!note.id) {
            note.id = Date.now().toString();
        }
        fs.writeFile(path.join(dir, note.id + '.json'), JSON.stringify(note), function (err) {
            cb(err);
        });
    };
    return ToDoData;
})();
exports.toDos = new ToDoData();
