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
    return db('messages');
}

function findBy(filter) {
    return db('messages')
        .where(filter)
        .first();
}

async function add(message) {
    const [message_id] = await db('messages').insert({message: message.message}, 'message_id');
    await db('message_user')
        .insert([
            {
                user_id: message.user_id,
                message_id: message_id,
                sender: message.sender,
                receiver: message.receiver
            },
            {
                user_id: message.receiver_id,
                message_id: message_id,
                sender: !message.sender,
                receiver: !message.receiver
            }
        ]);
    return findById(message_id);
}

function findById(message_id) {
    return db('messages')
        .where({message_id})
        .first();
}

function remove(message_id) {
    return db('messages')
        .where({message_id})
        .del();
}

function update(message_id, message) {
    return db('messages')
        .where({message_id})
        .update(message)
        .then(count => {
            return count > 0 ? this.findById(message_id) : null;
        });
}