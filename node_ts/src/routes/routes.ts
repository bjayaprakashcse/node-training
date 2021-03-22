import { Request, Response, NextFunction } from "express";
import { CrudController } from '../controllers/crudController';

export class Routes {

    public crud: CrudController = new CrudController();

    public routes(app): void {

        app.route('/').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        app.route('/save').post(this.crud.create);
        app.route('/user/:username').get(this.crud.find);
        app.route('/update').put(this.crud.update);
        app.route('/delete').delete(this.crud.delete);

    }
}