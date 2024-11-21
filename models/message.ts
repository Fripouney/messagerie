import { RowDataPacket } from "mysql2";
import { Channel } from "./channel";
import User from "./user";

export interface Message extends RowDataPacket {
    id: number;
    author: User;
    content: String;
    created_at: Date;
    channel: Channel;
}