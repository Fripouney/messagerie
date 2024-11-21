import { Router } from "express";
import MessageController from "../controllers/message.controller";

class MessageRoutes {
    router = Router();
    controller = new MessageController();

    constructor() {
        this.router.get("/:channelId", this.controller.getAllInChannel);
        this.router.post("/:channelId", this.controller.create);
    }
}

export default new MessageRoutes().router;