const config = require(`${__config_dir}/app.config.json`);
const {debug} = config;
const mysql = new(require(`${__class_dir}/mariadb.class.js`))(config.db);
const Joi =  require('joi');

class _task{
    add(data){
        // Validate data
        const schema = Joi.object({
            item: Joi.string()
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
        const sql = {
            query: `INSERT INTO task (items) VALUES (?)`,
            params: [data.item]
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
    }
    get(id){
        let sql = {};
        // get  data to database
        if(id){
            sql.query = `SELECT * FROM task WHERE id =  (?)`;
            sql.params = id;
        }else{
            sql.query = `SELECT * FROM task`;
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
    update(data){
        // Validate data
        console.log(data);
        const schema = Joi.object({
            item: Joi.string(),
            id: Joi.string(),
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
            query: `UPDATE task SET items = (?) WHERE id = ?`,
            params: [data.item,data.id]
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
            query: `DELETE FROM task WHERE id =  (?)`,
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
