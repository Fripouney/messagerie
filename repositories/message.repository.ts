import { Channel } from "../models/channel";
import { Message } from "../models/message";
import User from "../models/user";
import { connect } from "../server";
import { ResultSetHeader } from "mysql2";

interface IMessageRepository {
    create(author: User, content: String, channelId: number): Promise<Message>;
    getById(messageId: number): Promise<Message>;
    getAllInChannel(channelId: number): Promise<Message[]>

}

class MessageRepository implements IMessageRepository {
    getById(messageId: number): Promise<Message> {
        return new Promise((resolve, reject) => {
            const conn = connect();
            conn.query<Message[]>(`SELECT * FROM messages WHERE id = ${messageId}`, (err, res) => {
                if(err)
                    reject(err);
                else
                    resolve(res[0]);
            })
        })
    }
    create(author: User, content: String, channelId: number): Promise<Message> {
        return new Promise((resolve, reject) => {
            const conn = connect();
            conn.query<ResultSetHeader>(`INSERT INTO messages (content, author_id, channel_id) VALUES (${content}, ${author.id}, ${channelId}`, (err, res) => {
                if(err)
                    reject(err);
                else {
                    this.getById(res.insertId).then((message) => {
                        resolve(message);
                    }).catch(reject);
                }
            })
        })
    }
    getAllInChannel(channelId: number): Promise<Message[]> {
        return new Promise((resolve, reject) => {
            const conn = connect();
            conn.query<Message[]>(`SELECT * FROM messages WHERE channel_id = ${channelId}`, (err, res) => {
                if(err)
                    reject(err);
                else
                    resolve(res);
            })
        })
    }
}

export default new MessageRepository();