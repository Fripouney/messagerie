import { Router } from "express";
import UserController from "../controllers/user.controller";

class UserRoutes {
    router = Router();
    controller = new UserController();

    constructor() {
        this.router.post("/", this.controller.add);
        this.router.delete("/:id", this.controller.delete);
        this.router.get("/:username", this.controller.getByUsername)
    }
}

export default new UserRoutes().router;