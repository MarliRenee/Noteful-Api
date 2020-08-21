const NotesService = {
    getAllNotes(knex) {
        return knex('notes').select('*')
    },
    insertNote(knex, newNote) {
        return knex
            .insert(newNote)
            .into('notes')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, ID) {
        return knex('notes')
            .select('*')
            .where('id', ID)
            .first()
    },
    deleteNote(knex, ID) {
        return knex('notes')
            .where('id', ID)
            .delete()
    },
    updateNote(knex, ID, newData) {
        return knex('notes')
            .where('id', ID)
            .update(newData)
    }
}

module.exports = NotesService