const express = require('express');
const { urlencoded } = require('body-parser');
const methodOverride = require('method-override');
const cookies = require('cookies');
const middleware = require('./modules/middleware');

const config = require("../backend/config.json")

const rootRoute = require('./routes/root-routes');
const authRoute = require('./routes/auth-routes');
const dashboardRoute = require('./routes/dashboard-routes');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookies.express('a', 'b', 'c'));

app.use(express.static(`${__dirname}/assets`));
app.locals.basedir = `${__dirname}/assets`;

app.use('/',
    middleware.updateUser, rootRoute,
    authRoute,
    middleware.validateUser, middleware.updateGuilds, dashboardRoute
);

app.all('*', (req, res) => {
    res.render(('errors/404'))
})

const port = process.env.PORT || 3000;
const host = config.dashboardURL;
app.listen(port, () => console.log(`the server is live on host '${host}' and port '${port}' (http://${host}:${port})`));