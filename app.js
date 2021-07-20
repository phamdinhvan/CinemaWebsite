const express = require('express');
var bodyParser = require('body-parser');
// const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const db = require('./models/db');

const authMiddleware = require('./middlewares/auth')

var cookieSession = require('cookie-session');

// const adminRouter = require('./routers/admin');
// const userRouter = require('./routers/user');
// const authRouter = require('./routers/auth');
const indexRouter = require('./routers/index');
const adminRouter = require('./routers/admin');
const authRouter = require('./routers/auth');
const categoryRouter = require('./routers/category');
const defaultRouter = require('./routers/default');
const phimRouter = require('./routers/phim');

const app = express();
app.use(express.urlencoded({ extended: true }));
// app.use(expressLayouts);
app.use(express.static('public'));

// app.use(Middlewares);

//Session
app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY || 'secret'],

    //Cookie Options
    maxAge: 24 * 60 * 60 * 1000,
}))

app.use(authMiddleware);

//EJS
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.use('/assets', express.static(__dirname + '/public'));
app.use('/assets', express.static('assets'))

//Xử lý chức năng đăng nhập của cả admin và user
// //controller
// app.use('/auth', authRouter);
// //Xử lý chức năng của admin
// app.use('/admin', adminRouter);
// //Xử lý chức năng của user
// app.use('/', userRouter);
app.use("/admin", adminRouter);
app.use("/default", defaultRouter);
app.use("/auth", authRouter);
app.use("/category", phimRouter);
app.use("/insert", categoryRouter);
//router chung cho tất cả hệ thống
app.get("/", async function(req, res) {
    res.redirect("/default");
});

db.sync().then(function() {
    const port = process.env.PORT || 3000;
    console.log(`Server is listening on port ${port}`);
    app.listen(port);
}).catch(console.error)