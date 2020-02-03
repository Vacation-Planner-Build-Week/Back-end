const db = require('../database/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    remove,
    update
};

function find() {
    return db('comments');
}

function findBy(filter) {
    return db('comments')
        .where(filter)
        .first();
}

async function add(comment) {
    const [comment_id] = await db('comments').insert(comment, 'comment_id');
    return findById(comment_id)
}

function findById(comment_id) {
    return db('comments')
        .where({comment_id})
        .first();
}

function remove(comment_id) {
    return db('comments')
        .where({comment_id})
        .del();
}

function update(comment_id, comment) {
    return db('comments')
        .where({comment_id})
        .update(comment)
        .then(count => {
            return count > 0 ? this.findById(comment_id) : null
        })
}