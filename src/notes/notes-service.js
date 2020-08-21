const NotesService = {
    getAllNotes(knex) {
        return knex('noteful_notes').select('*')
    },

    insertNote(knex, newNote) {
        return knex
            .insert(newNote)
            .into('noteful_notes')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getById(knex, ID) {
        return knex('noteful_notes')
            .select('*')
            .where('id', ID)
            .first()
    },

    deleteNote(knex, ID) {
        return knex('noteful_notes')
            .where('id', ID)
            .delete()
    },

    //NO CLIENT SIDE PATCH/UPDATE FUNCTIONALITY -- IN PROGRESS
    // updateNote(knex, ID, newData) {
    //     return knex('noteful_notes')
    //         .where('id', ID)
    //         .update(newData)
    // }
}

module.exports = NotesService