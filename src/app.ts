import cors from "cors";
import express from 'express';
import path from 'path';
// import router from './router';
// import routerAdmin from './router-Admin'
import morgan from 'morgan'
// import { MORGAN_FORMAT } from './libs/config';
import cookieParser from 'cookie-parser';
import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import routerAdmin from "./routerAdmin";
import { T } from "./libs/types/common";
import { MORGAN_FORMAT } from "./config";
import router from "./router";

// 2.TCP, Core level connection, works solely with sessions, increases and updates
const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
    uri: String(process.env.MONGO_URL),
    collection: "sessions"
});

// 1: ENTRANCE
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static("./uploads"));
app.use(express.urlencoded({extended: true})); //TRAD API
app.use(express.json());  //REST API
app.use(morgan(MORGAN_FORMAT));
app.use(cors({ credentials: true, origin: true }))
app.use(cookieParser());

// 2: SESSIONS
app.use(  // 1. Building badge, 2. Reading badges
    session({
  secret: String(process.env.SESSION_SECRET),
  cookie: {
  maxAge: 1000 * 3600 * 6, // 6h
  },
  store: store,
  resave: true,   //when true: if authenticated at 10:30 it runs till 16:30
  saveUninitialized: true,
    })
); //req+session+member

app.use(function(req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member;
  next();
});

// 3: VIEWS
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs'); 

// 4: ROUTERS
app.use('/admin', routerAdmin); //SSR: EJS
app.use('/', router);           //CSR: REACT

export default app;

