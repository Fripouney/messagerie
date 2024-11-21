import { Request, Response } from "express";

export default class ChannelController {
    async getById(req: Request, res: Response) {
        try {
            res.status(200).json({
                message: "200 OK",
                reqBody: req.body
            });
        } catch(error) {
            res.status(500).json({
                message: "Le channel n'a pas pu être récupéré"
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            res.status(201).json({
                message: "201 Created",
                reqBody: req.body
            });
        } catch(error) {
            res.status(500).json({
                message: "Le channel n'a pas pu être créé"
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            res.status(200).json({
                message: "200 OK",
                id: req.params['id']
            });
        } catch(error) {
            res.status(500).json({
                message: "Le channel n'a pas pu être supprimé"
            });
        }
    }

    async addUserToChannel(req: Request, res: Response) {
        try {
            res.status(200).json({
                message: "201 created",
            });
        } catch(error) {
            res.status(500).json({
                message: "Le channel n'a pas pu être récupéré"
            });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            res.status(200).json({
                message: "200 OK",
                reqBody: req.body
            });
        } catch(error) {
            res.status(500).json({
                message: "Impossible de récupérer la liste des channels"
            });
        }
    }
}