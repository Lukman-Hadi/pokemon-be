const User = require('./model');
const bcrypt = require('bcrypt');

const register = (req,res)=>{
    if(!req.body){
        return res.status(400).send({
            error:1,
            message: 'No data Provided'
        });
    }
    const payload = req.body;
    const user = new User({
        username: payload.username,
        password: bcrypt.hashSync(payload.password, 10),
    })
    User.create(user,(err,data)=>{
        if(err){
            return res.status(500).send({
                error:1,
                message: err.message|| 'Some error occured'
            })
        }
        return res.send(data);
    })
}
const login = (req,res)=>{
    if(!req.body){
        return res.status(400).send({
            error:1,
            message: 'No data Provided'
        });
    }
    const payload = {
        username:req.body.username,
        password:req.body.password
    }
    User.login(payload,(err,data)=>{
        if(err){
            if(err.kind === 'not_found'){
                return res.status(404).send({
                    error:1,
                    message: err.message|| 'not Found'
                })
            }else{
                return res.status(500).send({
                    error:1,
                    message: err.message|| 'Some error occured'
                })
            }
        }
        return res.send(data);
    })
}

module.exports ={
    login,
    register
}