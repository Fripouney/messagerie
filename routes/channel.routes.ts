import { Router } from "express";
import ChannelController from "../controllers/channel.controller";

class ChannelRoutes {
    router = Router();
    controller = new ChannelController()

    constructor() {
        this.router.get("/:id", this.controller.getById);
        this.router.get("/", this.controller.getAll);
        this.router.post("/:name", this.controller.create);
        this.router.delete("channels/:id", this.controller.delete);
    }
}

export default new ChannelRoutes().router;