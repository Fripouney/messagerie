import { RowDataPacket } from "mysql2";
import { Message } from "./message";
import User from "./user";

export interface Channel extends RowDataPacket {
    id: number;
    created_at: Date;
    messages: Array<Message>;
    members: Array<User>;
}