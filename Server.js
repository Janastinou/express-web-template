const express = require(`express`);
const path = require(`path`);
const fs = require(`fs`)
const cookieParser = require(`cookie-parser`);
const logger = require(`morgan`);

const app = express();

app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, `ejs`);
app.listen(require('./Config.js').server.port);

app.use(logger(`dev`));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, `public`)));

var ops = {
    modules: {express: express, path: path, fs: fs, cookieParser: cookieParser, logger: logger}
}

const Routes = (PATH) => {
    if (!ops) var ops;
    const RS = fs.readdirSync(PATH);
    for (const R of RS) {
        if (R.split('.')[1]) {
            app.get(`${R === 'index.js' ? `${PATH.replace('./Routes', '')}/` : `${PATH.replace('./Routes', '')}/${R.split('.')[0]}`}`, function (req, res, next) {
                require(PATH + '/' + R)(req, res, next, ops)
            });
        } else Routes(`${PATH}/${R}`);
    }
}

Routes('./Routes')