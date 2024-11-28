import { RowDataPacket } from "mysql2";
import { Message } from "./message";
import User from "./user";

export interface Channel extends RowDataPacket {
    id: number;
    name: String;
    created_at: Date;
    messages: Array<number>;
    members: Array<number>;
}