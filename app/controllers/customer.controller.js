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
                return res.status(404).json({shop:'Customer Already exists'});
            }
            else{
                const customer = new Customer({
                    shop : req.body.shop,
                    name : req.body.name,
                    type: req.body.type,
                    area : req.body.area,
                    route : req.body.route,
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
            area : req.body.area,
            route : req.body.route,
            address  : req.body.address,
            phoneNo  : req.body.phoneNo,
            email    : req.body.email,
        },{new:true})
        .then(customer => {
            if(customer){
                return res.status(200).send("successfuly updated");
            }
            else{
                return res.status(400).send("cannot find customer with given id");
            }
        })
        .catch(err => {
            return res.status(400).json(err);
        });
}

exports.delete = (req,res) => {
    Customer
        .findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true})
        .then(customer => {
            if(customer){
                return res.status(200).json(customer);
            }
            else{
                return res.status(404).send('cannot find customer with given id');
            }
        })
        .catch(err =>{
            return res.status(400).json(err);
        })

}

exports.getAll = (req,res) => {
    Customer
        .find({status:"active"})
        .then(customers => {
             return res.status(200).json(customers);
        })
        .catch(err => {
            return res.status(400).json(err);
        });
}

exports.getbyId = (req,res) => {
    Customer
        .findById(req.params.id)
        .then(customer => {
            if(customer){
                 return res.status(200).json(customer);
            }
            else{
                return res.status(404).send("cannot find customer with given id");
            }
        })
        .catch(err => {
            return res.status(400).json(err);
        });
}