const bcrypt = require("bcryptjs");
//const config = require('../../config/database.config');
const salesRep = require("../models/salesRep.model.js");
const validateAddSalesrep=require("../validation/salesrepAdd.validation.js");
const validateUpdateSalesrep=require("../validation/salesrepUpdate.validation.js");

exports.add = (req,res) => {

    const { errors,isValid } = validateAddSalesrep(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    salesRep
        .findOne({SalesRepName : req.body.SalesRepName})
        .then(salesRep => {
            if(salesRep){
                return res.status(400).json({SalesRepname:'Already exists' });
            }
            else{
                const salesRep = new salesRep({           //const salesRep = new salesRep(req.body)
                    SalesRepName : req.body.SalesRepName,
                    fullName : req.body.fullName,
                    nic      : req.body.nic,
                    area     : req.body.area,
                    address  : req.body.address,
                    phoneNo  : req.body.phoneNo,
                    email    : req.body.email,
                    password : req.body.password
                });
                bcrypt.genSalt(10,(err,salt) => {
                    bcrypt.hash(salesRep.password,salt,(err,hash) => {
                        if(err)
                            throw err;
                        salesRep.password = hash;
                        salesRep
                            .save()                   
                            .then(salesRep => {
                                res.status(200).json(salesRep);
                            })
                            .catch(err => {
                                //res.status(400).json(err);
                                console.log(err);
                            });
                   })
                 })   
            }
        })
        .catch(err =>{
            console.error(err);
            return res.status(400).json(err);
        });   
}


exports.update = (req,res)=>{

    const { errors,isValid } = validateUpdateSalesrep(req.body);
    if(!isValid){
        console.log(errors);
        return res.status(400).json(errors);
    }
    salesRep
        .findByIdAndUpdate(req.params.id ,{
            SalesRepName : req.body.SalesRepName,
            fullName : req.body.fullName,
            nic      : req.body.nic,
            area     : req.body.area,
            address  : req.body.address,
            phoneNo  : req.body.phoneNo,
            email    : req.body.email
               
    } ,{new :true})
        .then(salesRep => {
            if(salesRep){
                res.status(200).send("successfuly updated");  
            }
            else{
                res.status(400).send("cannot find salesRep with given id");
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });
  

}

// Remove salesREp from system
exports.delete = (req,res) => {

    salesRep
        .findByIdAndRemove(req.params.id)
        .then(salesRep => {
            if(salesRep){
                salesRep.save()                   
                .then(salesRep => {
                    res.status(200).json({'salesRep' : 'salesRep deleted successfuly !'});
                })
                .catch(err => {
                    res.status(400).send('Failed to delete salesRep');
                });       
            }
            else{
                res.status(400).send("cannot find salesRep with given id");
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });


}

//geting all salesrep data to table
exports.getAll = (req,res)=>{  

    salesRep
        .find()
        .then(salesReps => {
            res.status(200).json(salesReps);
        })
        .catch(err => {
            res.status(400).json(err);
        });
       
}

//get one salesRep data by id
exports.getbyId = (req,res)=>{

    salesRep
        .findById(req.params.id)
        .then(salesRep => {
            if(salesRep){
                res.status(200).json(salesRep);
            }
            else{
                res.status(400).send("cannot find salesRep with given id");
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });
}