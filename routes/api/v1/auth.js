const express = require("express");
const router = express.Router();
const helper = require(__class_dir + "/helper.class.js");
const m$task = require(__module_dir + "/users.module.js");
const bcrypt = require("bcrypt");
const config = require(__config_dir+`/app.config.json`);
const   jwt = require('jsonwebtoken');
//const crypto = require('crypto');
//const uuid = require('uuid');

// exports.login = (req, res) => {
//     try {
//         let refreshId = req.body.userId + jwtSecret;
//         let salt = crypto.randomBytes(16).toString('base64');
//         let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
//         req.body.refreshKey = salt;

//         let token = jwt.sign(req.body, jwtSecret);
//         let b = Buffer.from(hash);
//         let refresh_token = b.toString('base64');
//         res.status(201).send({accessToken: token, refreshToken: refresh_token});
//     } catch (err) {
//         res.status(500).send({errors: err});
//     }
// };

// exports.refresh_token = (req, res) => {
//     try {
//         req.body = req.jwt;
//         let token = jwt.sign(req.body, jwtSecret);
//         res.status(201).send({id: token});
//     } catch (err) {
//         res.status(500).send({errors: err});
//     }
// };


router.post("/", async function (req, res, next) {
  console.log(req.body);
  let dataRespon = {};
  let postPassword = req.body.password;
  let postUsername = req.body.username;
  const getUser = await m$task.getUsername(postUsername);
  console.log(getUser);

  if (getUser.status) {
    let { id, nama, username, password } = getUser.data[0];
      const checkPassword = await bcrypt.compare(postPassword, password)
      if(checkPassword){
        let token = jwt.sign({
            id: id,
            nama: nama,
            username: username,
        }, config.jwt.keys);
        dataRespon.data = {
            token:token
        }
        dataRespon.status = true;
        dataRespon.message = "Berhasil Login";
        helper.sendResponse(res, dataRespon,200);
      }else{
        dataRespon.status = false;
        dataRespon.message = "Password yang anda masukan salah";
        helper.sendResponse(res, dataRespon,401);
      }
  } else {
    dataRespon.status = false;
    dataRespon.message = "Username tidak ditemukan";
    helper.sendResponse(res, dataRespon,401);
  }
});

module.exports = router;
