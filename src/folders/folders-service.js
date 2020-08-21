const NotesService = {
    getAllFolders(knex) {
        return knex.select('*').from('noteful_folders')
    },

    insertNote( knex, newFolder) {
        return knex 
            .insert(newFolder)
            .into('noteful_folders')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getById(knex, id) {
        return knex.from('noteful_folders').select('*').where('id', id).first()
    },

    deleteNote(knex, id) {
        return knex('noteful_folders')
            .where({ id })
            .delete()
    },

    //NO current option to edit on client side???
    // updateNote(knex, id, newNoteFields) {
    //     return knex('noteful_notes')
    //         .where({ id })
    //         .update(newNoteFields)
    // },
}

module.exports = NotesService