let { User } = require("../models");
let jwt = require("../helpers/jwt");
let bcrypt = require("../helpers/bcrypt");
const { OAuth2Client } = require("google-auth-library");

class Usercontroller {
  static register(req, res, next) {
    let { username, email, password } = req.body;

    User.create({ email, username, password })
      .then((data) => {
        res
          .status(201)
          .json({ id: data.id, email: data.email, username: data.username });
      })
      .catch((err) => {
        next(err);
      });
  }

  static alls(req, res, next) {
    User.findAll()
      .then((data) => {
        console.log("masuk all");
        if (!data) {
          throw { status: 404, msg: "error not found" };
        }
        res.status(200).json({ user: data });
      })
      .catch((err) => {
        next(err);
      });
  }

  static login(req, res, next) {
    let { email, password } = req.body;

    User.findOne({
      where: { email },
    })
      .then((founduser) => {
        if (!founduser)
          throw { msg: `Error! Email & Password are Wrong`, status: 404 };
        let cekpassword = bcrypt.compare(password, founduser.password);
        console.log(cekpassword, "<-------------------------");
        if (cekpassword) {
          let access_token = jwt.generateToken({
            id: founduser.id,
            username: founduser.username,
            email: founduser.email,
          });
          console.log(access_token);
          res.status(200).json({
            id: founduser.id,
            username: founduser.username,
            email: founduser.email,
            access_token: `${access_token}`,
          });
        } else {
          throw { msg: "Error! Email & Password are Wrong", status: 404 };
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static googlelogin(req, res, next) {
    try {
      console.log("Google login attempt");
      const { id_token } = req.body;

      if (!id_token) {
        throw { status: 400, msg: "ID token is required" };
      }

      console.log("ID Token received:", id_token.substring(0, 50) + "...");

      let user = null;
      const GOOGLE_CLIENT_ID =
        process.env.GOOGLE_CLIENT_ID ||
        `245291727558-vofc4itller4qprc8d0rtsmgpc4d6vhj.apps.googleusercontent.com`;

      const client = new OAuth2Client(GOOGLE_CLIENT_ID);

      client
        .verifyIdToken({
          idToken: id_token,
          audience: GOOGLE_CLIENT_ID,
        })
        .then((ticket) => {
          console.log("Token verified successfully");
          user = ticket.getPayload();
          console.log("User payload:", { name: user.name, email: user.email });

          return User.findOne({
            where: { email: user.email },
          });
        })
        .then((foundUser) => {
          console.log(
            "User lookup result:",
            foundUser ? "User found" : "User not found, creating...",
          );

          if (foundUser) {
            return foundUser;
          } else {
            return User.create({
              email: user.email,
              password: `${user.email}${Date.now()}`,
              username: user.name || user.email.split("@")[0],
            });
          }
        })
        .then((foundUser) => {
          console.log("Final user:", {
            id: foundUser.id,
            email: foundUser.email,
          });

          const access_token = jwt.generateToken({
            id: foundUser.id,
            email: foundUser.email,
          });

          res.status(200).json({
            id: foundUser.id,
            username: foundUser.username,
            email: foundUser.email,
            access_token: access_token,
          });
        })
        .catch((err) => {
          console.error("Google login error:", err.message || err);
          next(err);
        });
    } catch (err) {
      console.error("Google login exception:", err);
      next(err);
    }
  }
}
module.exports = Usercontroller;
