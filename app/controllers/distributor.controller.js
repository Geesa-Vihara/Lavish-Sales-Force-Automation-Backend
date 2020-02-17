const bcrypt = require("bcryptjs");
const Distributor = require("../models/distributor.model");
const validateDistributor = require("../validation/distributor.validation");
const validateUpdateDistributor = require("../validation/distributorUpdate.validation");

exports.add = (req,res) => {
    const { errors,isValid } = validateDistributor(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    Distributor
        .findOne({userName : req.body.userName})
        .then(distributor => {
            if(distributor){
                return res.status(400).json({userName:'Already exists'});
            }
            else{
                const distributor = new Distributor({
                    userName : req.body.userName,
                    fullName : req.body.fullName,
                    warehouse: req.body.warehouse,
                    area     : req.body.area,
                    address  : req.body.address,
                    phoneNo  : req.body.phoneNo,
                    email    : req.body.email,
                    password : req.body.password
                });
                bcrypt.genSalt(10,(err,salt) => {
                    bcrypt.hash(distributor.password,salt,(err,hash) => {
                        if(err)
                            throw err;
                        distributor.password = hash;
                        distributor
                            .save()                   
                            .then(distributor => {
                                res.status(200).json(distributor);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                   })
                 })   
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json(err);
        })
}


exports.update = (req,res) => {
    const { errors,isValid } = validateUpdateDistributor(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    Distributor
        .findByIdAndUpdate(req.params.id,{
            userName : req.body.userName,
            fullName : req.body.fullName,
            warehouse: req.body.warehouse,
            area     : req.body.area,
            address  : req.body.address,
            phoneNo  : req.body.phoneNo,
            email    : req.body.email,
            salesrep : req.body.salesrep
        },{new:true})
        .then(distributor => {
            if(distributor){
                res.status(200).send("successfuly updated");
            }
            else{
                res.status(400).send("cannot find distributor with given id");
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

exports.delete = (req,res) => {
    Distributor
        .findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true})
        .then(distributor => {
            if(distributor){
                //distributor.remove();
                res.status(200).json({distributor : ' Deleted successfuly !'});
            }
            else{
                res.status(400).send('cannot find distributor with given id');
            }
        })
        .catch(err =>{
            res.status(400).json(err);
        })

}

exports.getAll = (req,res) => {
    Distributor
        .find({status:"active"})
        .then(distributors => {
            res.status(200).json(distributors);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

exports.getbyId = (req,res) => {
    Distributor
        .findById(req.params.id)
        .then(distributor => {
            if(distributor){
                res.status(200).json(distributor);
            }
            else{
                res.status(400).send("cannot find distributor with given id");
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });
}