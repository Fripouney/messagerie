import { Request, Response } from "express";

export default class UserController {
    async add(req: Request, res: Response) {
        try {
            res.status(201).json({
                message: "201 Created",
                reqBody: req.body
            });
        } catch(error) {
            res.status(500).json({
                message: "L'utilisateur n'a pas pu être créé"
            });
        }
    }

    async getByUsername(req: Request, res: Response) {
        try {
            res.status(200).json({
                message: "200 OK",
                reqBody: req.body
            });
        } catch(error) {
            res.status(500).json({
                message: "Impossible de trouver l'utilisateur"
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            res.status(200).json({
                message: "200 OK",
                return: req.params['id']
            })
        } catch(error) {
            res.status(500).json({
                message: "L'utilisateur n'a pas pu être supprimé"
            });
        }
    }
}