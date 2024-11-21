import { ResultSetHeader } from "mysql2";
import { Channel } from "../models/channel";
import { connect } from "../server";

interface IChannelRepository {
    getById(channelId: number): Promise<Channel>;
    create(name: String): Promise<Channel>;
    delete(channelId: number): Promise<number>;
    addUserToChannel(userId: number, channelId: number): Promise<number>;
    getAll(userId: number): Promise<Channel[]>
}

class ChannelRepository implements IChannelRepository {
    getById(channelId: number): Promise<Channel> {
        return new Promise((resolve, reject) => {
            const conn = connect();
            conn.query<Channel[]>(`SELECT * FROM channels`, (err, res) => {
                if(err)
                    reject(err)
                else
                    resolve(res[0]);
            })
        })
    }
    addUserToChannel(userId: number, channelId: number): Promise<number> {
        return new Promise((resolve, reject) => {
            const conn = connect();
            conn.query<ResultSetHeader>(`INSERT INTO channel_members (member_id, channel_id) VALUES (${userId}, ${channelId})`, (err, res) => {
                if(err)
                    reject(err);
                else
                    resolve(res.affectedRows);
            });
        })
    }

    create(name: String): Promise<Channel> {
        return new Promise((resolve, reject) => {
            const conn = connect();
            conn.query<ResultSetHeader>(`INSERT INTO channels (name, created_at) VALUES (${name})`, (err, res) => {
                if(err)
                    reject(err);
                else
                    this.getById(res.insertId).then(channel => {
                        resolve(channel);
                    }).catch(reject);
            });
        })
    }

    delete(channelId: number): Promise<number> {
        return new Promise((resolve, reject) => {
            const conn = connect();
            conn.query<ResultSetHeader>(`DELETE FROM channels WHERE id = ${channelId}`, (err, res) => {
                if(err)
                    reject(err)
                else
                    conn.query<ResultSetHeader>(`DELETE FROM channel_members WHERE channel_id = ${channelId}`, (error, result) => {
                        if(error)
                            reject(error);
                        else
                            resolve(result.affectedRows);
                    })
            });
        })
    }

    getAll(userId: number): Promise<Channel[]> {
        return new Promise((resolve, reject) => {
            const conn = connect();
            conn.query<Channel[]>(`SELECT * FROM channels INNER JOIN channel_members ON member_id = ${userId}`, (err, res) => {
                if(err)
                    reject(err)
                else
                    resolve(res)
            })

        })
    }   
}

export default new ChannelRepository();