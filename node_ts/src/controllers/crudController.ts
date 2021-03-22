import { CrudService } from "../services/crudService";
import { Request, Response } from 'express';

let crudService: CrudService = new CrudService();

export class CrudController {
    
    public create(req: Request, res: Response) {
        // if (!body.username) {
        //     res.status(400).send('User name is missing');
        //     return;
        // }
        crudService.createUser(req.body, (error, response) => {
            if (error) {
                res.status(500);
                res.json(error);
            } else {
                res.status(201);
                res.json(response);
            }
        });
    }

    public find(req: Request, res: Response) {
        var params = req.params || {};
        var query = {
            username: params.username
        };
        console.log(query);
        if (!query) {
            res.status(400).send('Bad Request');
            return;
        }
        crudService.findUser(query, (error, response) => {
            if (error) {
                res.status(404).send(error);
                return;
            }
            if (response) {
                res.status(200).send(response);
                return;
            }
            if (!response) {
                res.status(204).send('No Data Found');
            }
        });
    }

    public update(req: Request, res: Response) {
        var body = req.body;
        var query = body.query;
        var data = body.data;
        var options = body.options
        if (!query) {
            res.status(400).send('Bad request');
            return;
        }
    
        crudService.updateUser(query, data, options, (err, response) => {
            if (response) {
                res.status(200).send(response);
            } else if (err) {
                res.status(400).send(err);
            }
        });
    }
    public delete(req: Request, res: Response) {
        console.log(req);
        var body = req.body || {};
        var query = body.query;
        console.log("query", query);
        if (!query) {
            res.status(400).send('Bad Request');
            return;
        }
        crudService.deleteUser(query, (error, response) => {
            if (error) {
                res.status(400).send(error);
                return;
            }
            if (response) {
                if (response.n === 1 && response.ok === 1) {
                    res.status(202).send(body);
                }
                if (response.n === 0 && response.ok === 1) {
                    res.status(204).send({
                        message: 'No data found'
                    });
                }
            }
        });
    }
    
}
