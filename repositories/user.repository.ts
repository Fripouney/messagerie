import { ResultSetHeader } from "mysql2";
import User from "../models/user";
import { connect } from "../server";

interface IUserRepository {
    add(username: String, password: String): Promise<User>;
    getByUsername(username: String): Promise<User>;
    delete(userId: number): Promise<number>;
}

class UserRepository implements IUserRepository {
    delete(userId: number): Promise<number> {
        return new Promise((resolve, reject) => {
            const conn = connect();
            conn.query<ResultSetHeader>(`DELETE FROM users WHERE id = ${userId}`, (err, res) => {
                if(err)
                    reject(err);
                else
                    resolve(res.affectedRows);
            })
        })
    }
    add(username: String, password: String): Promise<User> {
        return new Promise((resolve, reject) => {
            const conn = connect();
            conn.query<ResultSetHeader>(`INSERT INTO users (username, password) VALUES (${username}, ${password})`, (err, res) => {
                if(err) {
                    reject(err);
                } else {
                    this.getByUsername(username).then(user => {
                        resolve(user);
                    }).catch(error => {
                        reject(error);
                    })
                }
            });
        })
    }
    getByUsername(username: String): Promise<User> {
        return new Promise((resolve, reject) => {
            const conn = connect();
            conn.query<User[]>(`SELECT * FROM users WHERE username = ${username}`, (err, res) => {
                if(err) 
                    reject(err);
                else 
                    resolve(res[0]);
            });
        })
    }
}

export default new UserRepository();