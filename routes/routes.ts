import { Application } from "express";
import channelRoutes from "./channel.routes";
import messageRoutes from "./message.routes";
import userRoutes from "./user.routes";

export default class Routes {
    constructor(app: Application) {
        app.use("/", channelRoutes);
        app.use("/channels", messageRoutes);
        app.use("/users", userRoutes);
    }
}