const express = require('express')
const xss = require('xss')
const path = require('path')
const FoldersService = require('./folders-service')

const foldersRouter = express.Router()
const jsonParser = express.json()

const sanitizeFolder = folder => ({
    id: folder.id,
    name: xss(folder.name)
})

foldersRouter
    .route('/')

    .get((req, res, next) => {
        FoldersService.getAllFolders(
            req.app.get('db')
        )
        .then(folders => {
            res.json(folders.map(sanitizeFolder))
        })
        .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { name } = req.body
        const newFolder = {name}

        if(!name) {
                return res.status(400).json({
                    error: { message: `Missing 'name' in request body`}
                })
        }

        FoldersService.insertFolder(req.app.get('db'), newFolder)
            .then(folder => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${folder.id}`))
                    .json(sanitizeFolder(folder))
            })
            .catch(next)
    })

foldersRouter
    .route('/:id')

    .all((req, res, next) => {
        FoldersService.getById(req.app.get('db'), req.params.id)
            .then(folder => {
                if (!folder) {
                    return res.status(404).json({
                        error: { message: 'Folder Not Found'}
                    })
                }
                res.folder = folder
                next()
            })
    })

    .get((req, res, next) => {
        res.json(sanitizeFolder(res.folder))
    })

    .delete((req, res, next) => {
        FoldersService.deleteFolder(req.app.get('db'), req.params.id)
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

    //NO CURRENT PATCH FUNCTIONALITY ON CLIENT SIDE
    .patch(jsonParser, (req, res, next) => {
        const { name} = req.body
        const folderUpdate = {name}

        if(!name) {
            return res.status(400).json({
                error: { message: 'Request must contain folder name'}
            })
        }
        FoldersService.updateFolder(req.app.get('db'), req.params.id, folderUpdate)
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = foldersRouter