const bcrypt = require("bcryptjs");
const Customer = require("../models/customer.model");
const validateCustomer = require("../validation/customer.validation");

exports.add = (req,res) => {
    const { errors,isValid } = validateCustomer(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    Customer
        .findOne({shop : req.body.shop})
        .then(customer => {
            if(customer){
                return res.status(400).json({shop:'Already exists'});
            }
            else{
                const customer = new Customer({
                    shop : req.body.shop,
                    name : req.body.name,
                    type: req.body.type,
                    area : req.body.area,
                    address: req.body.address,
                    phoneNo: req.body.phoneNo,
                    email  : req.body.email,
                });
                customer
                .save()                   
                .then(customer => {
                    res.status(200).json(customer);
                })
                .catch(err => {
                    console.log(err);
                });
                /*bcrypt.genSalt(10,(err,salt) => {
                    bcrypt.hash(customer.password,salt,(err,hash) => {
                        if(err)
                            throw err;
                        customer.password = hash; 
                        customer
                            .save()                   
                            .then(customer => {
                                res.status(200).json(customer);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                   })
                 }) */  
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json(err);
        })
}


exports.update = (req,res) => {
    const { errors,isValid } = validateCustomer(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    Customer
        .findByIdAndUpdate(req.params.id,{
            shop : req.body.shop,
            name : req.body.name,
            type: req.body.type,
            area     : req.body.area,
            address  : req.body.address,
            phoneNo  : req.body.phoneNo,
            email    : req.body.email,
        },{new:true})
        .then(customer => {
            if(customer){
                res.status(200).send("successfuly updated");
            }
            else{
                res.status(400).send("cannot find customer with given id");
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

exports.delete = (req,res) => {
    Customer
        .findById(req.params.id)
        .then(customer => {
            if(customer){
                customer.remove();
                res.status(200).json({customer : ' Deleted successfuly !'});
            }
            else{
                res.status(400).send('cannot find customer with given id');
            }
        })
        .catch(err =>{
            res.status(400).json(err);
        })

}

exports.getAll = (req,res) => {
    Customer
        .find()
        .then(customers => {
            res.status(200).json(customers);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

exports.getbyId = (req,res) => {
    Customer
        .findById(req.params.id)
        .then(customer => {
            if(customer){
                res.status(200).json(customer);
            }
            else{
                res.status(400).send("cannot find customer with given id");
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });
}