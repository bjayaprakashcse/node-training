import * as express from 'express';
import * as bodyParser from 'body-parser';
// import { WordpressController } from './controllers/WordpressController';
import { Routes } from './routes/routes';
const path = require('path');
import mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
require('./model/user');
const PORT = 3000;

class App {

    public app: express.Application = express();
    // public wordPressController: WordpressController = new WordpressController();
    public routePrv: Routes = new Routes();
    public mongoUrl: String = "mongodb://localhost/CRUD_DB"

    constructor() {
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
        // this.wordPressservice();
    }

    private config(): void {
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'jade');
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(logger('dev'));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static(path.join(__dirname, 'public')));
        

    }
    private mongoSetup(): void {
        console.log("mongo setup with sync")
        mongoose.Promise = global.Promise;
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
        var db = mongoose.connection;
        db.on('error', () => {
            console.error('Error occured in db connection');
        });
        
        db.on('open', () => {
            console.log('DB Connection established succesfully');
        });
    }

    // private wordPressservice(){
    //     this.wordPressController.wordPress();
    // }
}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port  ' + PORT);
})