import { Request, Response } from "express";

export default class MessageController {
    async create(req: Request, res: Response) {
        try {
            res.status(201).json({
                message: "201 Created",
                reqBody: req.body
            });
        } catch(error) {
            res.status(500).json({
                message: "Le message n'a pas pu être créé"
            });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            res.status(200).json({
                message: "200 OK",
                reqBody: req.body
            });
        } catch(error) {
            res.status(500).json({
                message: "Le message n'a pas pu être récupéré"
            });
        }
    }

    async getAllInChannel(req: Request, res: Response) {
        try {
            res.status(200).json({
                message: "200 OK",
                reqBody: req.body
            });
        } catch(error) {
            res.status(500).json({
                message: "Le contenu du channel n'a pas pu être récupéré"
            });
        }
    }
}