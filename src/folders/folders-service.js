const FoldersService = {
    getAllFolders(knex) {
        return knex('noteful_folders').select('*')
    },

    insertFolder(knex, newFolder) {
        return knex
            .insert(newFolder)
            .into('noteful_folders')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getById(knex, ID) {
        return knex('noteful_folders')
            .select('*')
            .where('id', ID)
            .first()
    },
    
    deleteFolder(knex, ID) {
        return knex('noteful_folders')
            .where('id', ID)
            .delete()
    },

   // NO CURRENT PATCH FUNCTIONALITY ON CLIENT SIDE
    // updateFolder(knex, ID, newData) {
    //     return knex('noteful_folderss')
    //         .where('id', ID)
    //         .update(newData)
    // }
}

module.exports = FoldersService