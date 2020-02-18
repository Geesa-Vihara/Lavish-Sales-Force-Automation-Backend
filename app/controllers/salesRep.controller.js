const bcrypt = require("bcryptjs");
const SalesRep = require("../models/salesRep.model.js");
//const Customer = require("../models/customer.model");
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
            email    : req.body.email,
            distributor:req.body.distributor
               
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
            console.log(err);
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
exports.getbyId = (req,res)=>{

    SalesRep
        .findById(req.params.id)
        .then(salesrep => {
            if(salesrep){
                return res.status(200).json(salesrep);
            }
            else{
                return res.status(404).send("cannot find salesRep with given id");
            }
        })
        .catch(err => {
            return res.status(400).json(err);
        });
}


exports.rating = (req,res) => {
 //   var date = new Date();
     SalesRep
         .findById(req.params.id)
         .then(salesrep =>{
             if(salesrep){
                Order
                    .aggregate([
                       // { $project : { monthRate : { $month : "$date" } } } ,
                       {
                            $match :{
                                salesrepName:salesrep.userName,
                                // salesYear:date.getFullYear()
                            }
                        },
                        {
                            $group:{
                             //   _id: {monthRate:"$monthRate"}, totalSum:{$sum:"$totalValue"},
                                _id : "$salesrepName",
                                totalSum:{$sum:"$totalValue"},
                                totalOrders:{$sum:1}
                                
                            }
                        },
                        // {
                        //     $project:{ _id:1,totalSum:1,totalOrders:1}
                        // }

                    ])
                    .then(data=> {
                       // console.log("rating data");
                      //  console.log(data);
                        return res.status(200).json(data);
                    })
                    .catch(err => {
                            console.log(err);
                            return res.status(400).json(err);
                          
                    })
            }
            else{
                return res.status(404).json({msg:"salesrep cannot find"});
            }
        })
        .catch(err=>{
            return res.status(400).json(err);
        });
}
    

exports.monthlySales = (req,res) => {
 //   var date = new Date();
    SalesRep
        .findById(req.params.id)
        .then(salesrep => {
            if(salesrep){
                Order
                    .aggregate(
                        [   
                            {
                                $match :{
                                    salesrepName:salesrep.userName,
                                }
                            },
                            {
                                "$project" : { 
                                    "salesMonth" :{"$month" :"$orderDate"},
                                    "salesYear":{"$year":"$orderDate"},
                                    "total":"$totalValue"
                                }
                            },
                            {
                                $group : {
                                    _id:"$salesMonth",
                                    totalSum:{$sum:"$total"}
                                }
                            },
                            {$sort : {salesMonth:1}}
                        ]
                    )        
                        
                    .then(data=> {
                       // console.log("monthly data");
                       // console.log(data);
                        return res.status(200).json(data);
                    })
                    .catch(err => {
                        return res.status(400).json(err);
                    });
            }
            else{
                return res.status(404).json({msg:"salesrep cannot find"});
            }
        })
        .catch(err=>{
            return res.status(400).json(err);
        });


}
