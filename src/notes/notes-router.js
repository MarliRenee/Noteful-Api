const express = require('express')
const xss = require('xss')
const path = require('path')
const NotesService = require('./notes-service')

const notesRouter = express.Router()
const jsonParser = express.json()

const sanitizeNote = note => ({
    id: note.id,
    name: xss(note.name),
    modified: note.modified,
    folder_id: note.folder_id,
    content: xss(note.content)
})

notesRouter
    .route('api/notes')
    .get((req, res, next) => {
        NotesService.getAllNotes(
            req.app.get('db')
        )
        .then(notes => {
            res.json(notes.map(sanitizeNote))
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { name, folder_id, content } = req.body
        const newNote = { name, folder_id, content}

        for (const [key, value] of Object.entries(newNote)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing ${key} in request`}
                })
            }
        }

        NotesService.insertNote(req.app.get('db'), newNote)
            .then(note => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${note.id}`))
                    .json(sanitizeNote(note))
            })
            .catch(next)
    })

notesRouter
    .route('api/notes/:id')
    .all((req, res, next) => {
        NotesService.getById(req.app.get('db'), req.params.id)
            .then(note => {
                if (!note) {
                    return res.status(404).json({
                        error: { message: 'Note does not exist'}
                    })
                }
                res.note = note
                next()
            })
    })
    .get((req, res, next) => {
        res.json(sanitizeNote(res.note))
    })
    .delete((req, res, next) => {
        NotesService.deleteNote(req.app.get('db'), req.params.id)
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

    //NO UPDATE FUNCTIONALITY ON CLIENT SIDE YET
    // .patch(jsonParser, (req, res, next) => {
    //     const { name, folder_id, content } = req.body
    //     const noteUpdate = {name, folder_id, content}

    //     const numValues = Object.values(articleToUpdate).filter(Boolean).length
    //     if (numValues === 0) {
    //         return res.status(400).json({
    //             error: { message: 'Request must contain either name, folder_id, or content'}
    //         })
    //     }
    //     NotesService.updateNote(req.app.get('db'), req.params.id, noteUpdate)
    //         .then(() => {
    //             res.status(204).end()
    //         })
    //         .catch(next)
    // })

module.exports = notesRouter