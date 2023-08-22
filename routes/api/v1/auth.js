const express = require("express");
const router = express.Router();
const helper = require(__class_dir + "/helper.class.js");
const m$task = require(__module_dir + "/users.module.js");
const bcrypt = require("bcrypt");

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
