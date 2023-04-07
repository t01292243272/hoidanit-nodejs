import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models';


var salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
    let hassPassword = bcrypt.hashSync(userPassword, salt);
    return hassPassword
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password)
    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPass,
        })
    } catch (error) {
        console.log(">>>Check error: ", error);
    }
}

const getListUser = async () => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'hoidanit-nodejs', Promise: bluebird });

    let user = []

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM user');
        return rows
    } catch (error) {
        console.log(">>> Check error: ", error);
    }
}

const deleteUser = async (id) => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'hoidanit-nodejs', Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?', [id]);
    } catch (error) {
        console.log(">>> Check error: ", error);
    }
}

const getUserById = async (id) => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'hoidanit-nodejs', Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id=?', [id]);
        return rows
    } catch (error) {
        console.log(">>> Check error: ", error);
    }
}

const updateUser = async (email, username, id) => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'hoidanit-nodejs', Promise: bluebird });
    try {
        const [rows, fields] =
            await connection.execute('UPDATE user SET email=?, username=? WHERE id=?',
                [email, username, id]);
    } catch (error) {
        console.log(">>>Check error: ", error);
    }
}

module.exports = {
    createNewUser, getListUser, deleteUser, getUserById, updateUser
}

