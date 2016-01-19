/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/async/async.d.ts" />

import fs = require('fs');
import path = require('path');
import async = require('async');

export interface ToDo {
    id: string;
    text: string;
    tags: string[];
    due: string;
    created: string;
    done: string;
}

export interface Note {
    id: string;
    text: string;
    created: string;
}

var utf8 = {encoding: 'utf8'};

class ToDoData {
    public list(listCb: (err, toDos?: ToDo[]) => any) {
        fs.readdir('data', (err, entries) => {
            if (err) {
                listCb(err);
                return;
            }
            async.map(entries,
                (entry, cb) => {
                    var dataFile = path.join('data', entry, 'data.json');
                    fs.readFile(dataFile, utf8, (err, json) => {
                        var toDo = <ToDo>JSON.parse(json);
                        toDo.id = entry;
                        cb(null, toDo);
                    });
                },
                (err, toDos: ToDo[]) => {
                    if (err) {
                        listCb(err);
                    } else {
                        listCb(null, toDos.filter(p => !!p));
                    }
                }
            );
        });
    }

    public get(id: string, getCb: (err,toDo) => any) {
        var dir = path.join('data', id);
        fs.exists(dir, (exists) => {
            if (!exists) {
                getCb(null, null);
                return;
            }
            fs.readFile(path.join(dir, 'data.json'), utf8, (err, data) => {
                if (err) {
                    getCb(err, null);
                    return;
                }
                try {
                    var toDo = <ToDo>JSON.parse(data);
                    getCb(null, toDo);
                }
                catch (e) {
                    getCb(e, null);
                }
            });
        });
    }

    public add(toDo: ToDo, addCb: (err) => any) {
        var dir = path.join('data', toDo.id);
        fs.mkdir(dir, (err) => {
            if (err) { return addCb(err); }
            var notesDir = path.join(dir, 'notes');
            fs.mkdir(notesDir, (err) => {
                if (err) { return addCb(err); }
                fs.writeFile(path.join(dir, 'data.json'), JSON.stringify(toDo), (err) => {
                    addCb(err);
                });
            });
        });
    }

    public update(toDo: ToDo, addCb: (err) => any) {
        var dir = path.join('data', toDo.id);
        fs.exists(dir, (exists) => {
            if (!exists) {
                this.add(toDo, addCb);
                return;
            }
            fs.writeFile(path.join(dir, 'data.json'), JSON.stringify(toDo), (err) => {
                addCb(err);
            });
        });
    }

    public delete(id: string, deleteCb: (err) => any) {
        var dir = path.join('data', id);
        fs.rmdir(dir, (err) => {
            deleteCb(err);
        })
    }

    public getNotes(toDoId: string, cb: (err, notes?) => any) {
        var dir = path.join('data', toDoId, 'notes');
        fs.readdir(dir, (err, entries) => {
            if (err) {
                cb(err);
                return;
            }
            async.map(entries,
                (entry, cb) => {
                    var dataFile = path.join(dir, entry);
                    fs.readFile(dataFile, utf8, (err, json) => {
                        var note = <Note>JSON.parse(json);
                        cb(null, note);
                    });
                },
                (err, notes: Note[]) => {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, notes.filter(p => !!p));
                    }
                }
            );
        });
    }

    public setNote(toDoId: string, note: Note, cb: (err) => any) {
        var dir = path.join('data', toDoId, 'notes');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        if (!note.id) {
            note.id = Date.now().toString();
        }
        fs.writeFile(path.join(dir, note.id + '.json'), JSON.stringify(note), (err) => {
            cb(err);
        });
    }
}

export var toDos = new ToDoData();