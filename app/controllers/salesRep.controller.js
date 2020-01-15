const bcrypt = require("bcryptjs");
const SalesRep = require("../models/salesRep.model.js");
const Customer = require("../models/customer.model");
const Order = require("../models/invoice.model");
const validateAddSalesrep=require("../validation/salesrepAdd.validation.js");
const validateUpdateSalesrep=require("../validation/salesrepUpdate.validation.js");

exports.add = (req,res) => {

    const { errors,isValid } = validateAddSalesrep(req.body);
    if(!isValid){
        //console.log(errors);
        return res.status(400).json(errors);
    }
    SalesRep
        .findOne({userName : req.body.userName})
        .then(salesrep => {
            if(salesrep){
                return res.status(404).json({SalesRepname:'Already exists' });
            }
            else{
                const salesRep = new SalesRep({           //const salesRep = new salesRep(req.body)
                    userName : req.body.userName,
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
    SalesRep
        .findByIdAndUpdate(req.params.id ,{
            userName : req.body.userName,
            fullName : req.body.fullName,
            nic      : req.body.nic,
            area     : req.body.area,
            address  : req.body.address,
            phoneNo  : req.body.phoneNo,
            email    : req.body.email
               
    } ,{new :true})
        .then(salesRep => {
            if(salesRep){
                return res.status(200).send("successfuly updated");  
            }
            else{
                return res.status(400).send("cannot find salesRep with given id");
            }
        })
        .catch(err => {
            return res.status(400).json(err);
        });
  

}

// Remove salesREp from system
exports.delete = (req,res) => {

    SalesRep
        .findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true})
        .then(salesRep => {
            if(salesRep){
                return res.status(200).json(salesRep);
               // salesRep.remove()
            //    salesRep
            //         .save()
            //         .then(res.status(200).json(salesRep)) 
            //         .catch(err=>{return res.status(400).json(err)});                
                //return res.status(200).json({'salesRep' : 'salesRep deleted successfuly !'});   
            }
            else{
                return res.status(404).send("cannot find salesRep with given id");
            }
        })
        .catch(err => {
            return res.status(400).json(err);
        });


}

//geting all salesrep data to table
exports.getAll = (req,res)=>{  

    SalesRep
        .find({status:"active"})
        .then(salesReps => {
            return res.status(200).json(salesReps);
        })
        .catch(err => {
            return res.status(400).json(err);
        });
       
}

//get one salesRep data by id
// exports.getbyId = (req,res)=>{

//     SalesRep
//         .findById(req.params.id)
//         .then(salesrep => {
//             if(salesrep){
//                 //res.status(200).json(salesRep);
//             }
//             else{
//                 return res.status(404).send("cannot find salesRep with given id");
//             }
//         })
//         .catch(err => {
//             return res.status(400).json(err);
//         });
// }

//get one salesrep data for view
exports.getbyId = (req,res) => {

    SalesRep
        .findById(req.params.id)
        .then(salesrep => {
            if(salesrep){
                    Customer.countDocuments({area : salesrep.area },function(err,count){       //get matching customer count
                        salesrep.totalCustomers = count;
                        if(err)
                            console.error(err);  
                    });

                     Order.countDocuments({salesrepName:salesrep.userName},function(err,count){      //get matching order count
                        salesrep.totalOrders = count;
                        if(err)
                            console.error(err); 
                    });

                    salesrep
                        .save()
                        .then(salesrep => { return res.status(200).json(salesrep)})
                        .catch(err => {res.status(400).json(err)});
            }
            else{
                return res.status(404).json({msg:"salesrep cannot find"});
            }
            
        })
        .catch(err=>{
            return res.status(400).json(err);
        });
    
}


