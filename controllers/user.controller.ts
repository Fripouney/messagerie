import { Request, Response } from "express";
import userRepository from "../repositories/user.repository";
import User from "../models/user";

export default class UserController {
    async add(req: Request, res: Response) {
        if(!(req.body.username && req.body.password)) {
            res.status(400).send({
                message: "Requête invalide"
            });
            return;
        }
        try {
            const newUser: User = req.body;
            const addedUser = await userRepository.add(newUser);
            res.status(201).send(addedUser);
        } catch(error) {
            res.status(500).json({
                message: "Une erreur interne est survenue"
            });
        }
    }

    async getByUsername(req: Request, res: Response) {
        const username: String = req.params['username'];
        if(!username) {
            res.status(400).send({
                message: "Paramètre <username> manquant"
            });
            return;
        }
        try {
            const fetchedUser = await userRepository.getByUsername(username);
            if(fetchedUser)
                res.status(200).send(fetchedUser);
            else
                res.status(404).send(`Pas d'utilisateur trouvé avec l'identifiant ${username}`);
        } catch(error) {
            res.status(500).json({
                message: "Impossible de trouver l'utilisateur"
            });
        }
    }

    async delete(req: Request, res: Response) {
        const id = parseInt(req.params['id']);
        if(!id) {
            res.status(400).send("Paramètre <id> manquant");
        }
        try {
            const num = await userRepository.delete(id);
            if(num == 1) {
                res.status(200).send("L'utilisateur a bien été supprimé");
            } else {
                res.status(404).send(`Pas d'utilisateur trouvé avec l'ID ${id}`);
            }

        } catch(error) {
            res.status(500).json({
                message: "L'utilisateur n'a pas pu être supprimé"
            });
        }
    }
}