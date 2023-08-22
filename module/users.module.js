const config = require(`${__config_dir}/app.config.json`);
const {debug} = config;
const mysql = new(require(`${__class_dir}/mariadb.class.js`))(config.db);
const Joi =  require('joi');
const bcrypt = require('bcrypt');
const { has } = require('lodash');
const saltRounds = 10;

class _task{
    add(data){
        // Validate data
        const schema = Joi.object({
            nama: Joi.string(),
            username: Joi.string(),
            password: Joi.string(),
        }).options({
            abortEarly: false
        })
        const validation = schema.validate(data)
        if(validation.error){
            const errorDetails = validation.error.details.map((detail)=>{
                return detail.message
            })
            return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
            }
        }
        // Insert data to database
        const password = bcrypt.hash(data.password, saltRounds, function(err, hash) {
            console.log('ini passowrd',hash);
            const sql = {
                query: `INSERT INTO users (nama,username,password) VALUES (?,?,?)`,
                params: [data.nama,data.username,hash]
            }
            return mysql.query(sql.query, sql.params)
                .then(data=>{
                    return {
                        status: true,
                        message:'Data berhasil disimpan'
                    }
                })
                .catch(error =>{
                    if (debug){
                        console.error('add task Error: ', error)
                    }
    
                    return{
                        status: false,
                        error
                    }
                })
        });

    }
    get(id){
        let sql = {};
        // get  data to database
        if(id){
            sql.query = `SELECT * FROM users WHERE id =  (?)`;
            sql.params = id;
        }else{
            sql.query = `SELECT * FROM users`;
        }

        return mysql.query(sql.query, sql.params)
            .then(data=>{
                return {
                    status: true,
                    data
                }
            })
            .catch(error =>{
                if (debug){
                    console.error('add task Error: ', error)
                }

                return{
                    status: false,
                    error
                }
            })
    }
    
    getUsername(username){
        let sql = {};
        // get  data to database
        if(username){
            sql.query = `SELECT * FROM users WHERE username =  (?)`;
            sql.params = username;
        }else{
            return {
                status: false,
                message:'Username tidak boleh kosong'
            }
        }

        return mysql.query(sql.query, sql.params)
            .then(data=>{
                return {
                    status: true,
                    data
                }
            })
            .catch(error =>{
                if (debug){
                    console.error('add task Error: ', error)
                }
                return {
                    status: false,
                    error
                }
            })
    }
    update(data){
        // Validate data
        console.log(data);
        const schema = Joi.object({
            id: Joi.string(),
            nama: Joi.string(),
            username: Joi.string(),
        }).options({
            abortEarly: false
        })
        const validation = schema.validate(data)
        if(validation.error){
            const errorDetails = validation.error.details.map((detail)=>{
              return  detail.message
            })

            return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
            }
        }

        // Insert data to database
        const sql = {
            query: `UPDATE users SET nama = (?),username = ? WHERE id = ?`,
            params: [data.nama,data.username,data.id]
        }

        return mysql.query(sql.query, sql.params)
            .then(data=>{
                return {
                    status: true,
                    message:'Data berhasil di update'
                }
            })
            .catch(error =>{
                if (debug){
                    console.error('add task Error: ', error)
                }

                return{
                    status: false,
                    error
                }
            })
    }
    delete(data){
        const schema = Joi.object({
            id: Joi.string()
        }).options({
            abortEarly: false
        })
        const validation = schema.validate(data)
        if(validation.error){
            const errorDetails = validation.error.details.map((detail)=>{
                return detail.message
            })

            return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
            }
        }

        let sql = {
            query: `DELETE FROM users WHERE id =  (?)`,
            params: [data.id]
        };

        return mysql.query(sql.query, sql.params)
            .then(data=>{
                return {
                    status: true,
                    message:'Data berhasil dihapus'
                }
            })
            .catch(error =>{
                if (debug){
                    console.error('add task Error: ', error)
                }

                return{
                    status: false,
                    error
                }
            })
    }
}

module.exports = new _task();
