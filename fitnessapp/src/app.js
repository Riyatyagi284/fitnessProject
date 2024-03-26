import express from "express";
// import session from 'express-session';
// import passport from "passport";

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use((err, req, res, next) => {
   if (err instanceof ApiError) {
      res.status(err.statusCode).json({
         success: false,
         message: err.message,
         errors: err.errors,
      });
   } else {
      console.error(err);
      res.status(500).json({
         success: false,
         message: err.message,
      });
   }
});

// app.use(session({
//    secret: process.env.SECRET_KEY,
//    resave: false,
//    saveUninitialized: false,
// }))

// Integrate passportjs into myy express app
// app.use(passport.initialize());
// app.use(passport.session());


export { app };
