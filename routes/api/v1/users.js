const express = require('express');
const router = express.Router();
const helper = require(__class_dir + '/helper.class.js');
const m$task = require(__module_dir + '/users.module.js');
const ValidationMiddleware = require(__module_dir + '/authCheck.module.js');

router.post('/',[ ValidationMiddleware.validJWTNeeded,async function (req, res, next) {
    console.log(req.body)
    const addTask = await m$task.add(req.body)
    helper.sendResponse(res, addTask);
}]);
router.get('/:id?/', [ValidationMiddleware.validJWTNeeded,async function (req, res, next) {
    console.log('ini param jwt',req.jwt.id)
    const getTask = await m$task.get(req.params.id)
    helper.sendResponse(res, getTask);
}]);
router.patch('/', [ValidationMiddleware.validJWTNeeded,async function (req, res, next) {
    const updateTask = await m$task.update(req.body)
    helper.sendResponse(res, updateTask);
}]);
router.delete('/', [ValidationMiddleware.validJWTNeeded,async function (req, res, next) {
    const updateTask = await m$task.delete(req.body)
    helper.sendResponse(res, updateTask);
}]);
module.exports = router;
