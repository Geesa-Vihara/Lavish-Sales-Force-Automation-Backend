const Order = require("../models/invoice.model");
const SalesRep = require("../models/salesRep.model.js");

exports.yearlySales=(req,res)=>{
    var d = new Date(req.body.year);       
    Invoice.aggregate([        
        {"$project": { 
            "year": {
             "$year": "$orderDate"
          },
          "month": {
            "$month": "$orderDate"
          },
          "tot":"$totalValue"
        
        }}, {
        "$match": {
          "year": new Date(d).getFullYear(),          
        }
      }, {$group : {
          _id :"$month",
          sum:{$sum:"$tot"}        

    }}
    ]).then(rep=> {
        res.status(200).json(rep)
      })
      .catch(err => 
        {
            res.status(400).json(err);
          

      })
}

exports.progress=(req,res)=>{
    var d = new Date();
    Invoice.aggregate([        
        {"$project": { 
            "year": {
             "$year": "$orderDate"
          },
          "tot":"$totalValue"
        
        }}, {
        "$match": {
          "year": {
            $gte: new Date(d).getFullYear()-1,
            $lte: new Date(d).getFullYear()
        },          
        }
      }, {$group : {
          _id :"$year",
          sum:{$sum:"$tot"}        

    }}
    ]).then(rep=> {
        res.status(200).json(rep)
      })
      .catch(err => 
        {
            res.status(400).json(err);
          

      })
}

exports.topProduct=(req,res)=>{
    var d = new Date(req.body.dateFrom);
    var n = new Date(req.body.dateTo);
    d.setUTCHours(0,0,0,0);
    n.setUTCHours(24,0,0,0); 
    Invoice.aggregate([
        
        { $match: { orderDate :{
            $gte: new Date(d),
            $lt: new Date(n)
        } } },
        {$group : {_id : null, 
        teapouch_sum : { $sum:{ $add: ["$teapouch20.price","$teapouch50.price","$teapouch100.price","$teapouch200.price","$teapouch400.price","$teapouch1kg1.price","$teapouch1kg2.price","$teapouch1kg3.price","$teapouch1kg4.price"]}},
        teabag_sum : { $sum:{ $add: ["$teabag1.price","$teabag2.price","$teabag3.price"]}},
        teasachet_sum : { $sum:{ $add: ["$teasachet1.price","$teasachet2.price","$teasachet3.price"]}},
        teabulk_sum : { $sum:{ $add: ["$teabulk1.price","$teabulk2.price","$teabulk3.price","$teabulk4.price","$teabulk5.price","$teabulk6.price"]}},
        teabottle_sum : { $sum:{ $add: ["$teabottle.price"]}},
        teabasket_sum : { $sum:{ $add: ["$teabasket1.price","$teabasket2.price"]}}
    }}])
        .then(rep=> 
        {
            res.status(200).json(rep)
        }
        )
        .catch(err => {res.status(400).json(err);
        })
}
exports.salesByArea=(req,res)=>{
    var d = new Date(req.body.dateFrom);
    var n = new Date(req.body.dateTo);
    d.setUTCHours(0,0,0,0);
    n.setUTCHours(24,0,0,0); 
    Invoice.aggregate([
        { $match: { orderDate :{
            $gte: new Date(d),
            $lt: new Date(n)
        } } },
        {$group : {_id : "$area",sum:{$sum:"$totalValue"}        

    }}])
        .then(rep=> res.status(200).json(rep)
        )
        .catch(err => {res.status(400).json(err);
            

        })
}
exports.routeCoverage=(req,res)=>{
    var d = new Date(req.body.dateTime);
    var n = new Date(req.body.dateTime);
    d.setUTCHours(0,0,0,0);
    n.setUTCHours(24,0,0,0);     

    Invoice.aggregate([
        { $match: { orderDate :{
            $gte: new Date(d),
            $lt: new Date(n)
        } } },
        {$group : {_id : "$area",sum:{$sum:"$totalValue"}        

    }}])
        .then(rep=> res.status(200).json(rep)
        )
        .catch(err => {res.status(400).json(err);
            

        })
}

exports.topOutlet = (req,res) =>{
    var s = new Date(req.body.dateTime);  //start
    var e = new Date(req.body.dateTime);  //end
    s.setUTCHours(0,0,0,0);
    e.setUTCHours(24,0,0,0);

    Order
        .aggregate(
            [
                {
                    $match : { orderDate :{$gte: new Date(s), $lt: new Date(e)}}
                },
                {
                    $group : {
                        _id : '$customerName', 
                       // area:"$area",                 
                        totalSum:{$sum:'$totalValue'}           // total revenue from outlet
                    }
                },
                {
                    $sort:{totalSum:-1}
                },
                {
                    $limit : 10
                },
                {
                    $project:{ _id:1, area:"$area" }
                }
            ]
        )
        .then(data=>{
            return res.status(200).json(data);
        })
        .catch(err =>{
            return res.status(400).json(err);
        })
}

exports.topBestSalesrep = (req,res)=> {
    Order
        .aggregate(
            [
                // {
                //     $lookup:{
                //         from: "SalesRep",
                //         let:{name:"$salesrepName"}, //or id
                //         pipeline:[
                //             {$match:
                //                 {$expr:
                //                     {$and:
                //                         [
                //                             {$eq:["$fullName","$$name"],["$status","active"]}
                //                         ]
                //                     }
                //                 }
                //             }
                //         ],
                //         as: "status"
                //     }
                // },
                {
                    $group : {
                        _id : '$salesrepName',
                        //name:"$salesrepName"
                       // area:"$area",                  
                        totalSum:{$sum:'$totalValue'}           
                    }
                },
                {
                    $sort:{totalSum:-1}
                },
                {
                     $limit : 10
                },
                {
                    $project:{ _id:1, area:"$area" }
                }
            ]
        )
        .then(data=>{
            return res.status(200).json(data);
        })
        .catch(err =>{
            return res.status(400).json(err);
        })

}
exports.topLeastSalesrep = (req,res)=> {
    Order
        .aggregate(
            [
                // {
                //     $match:{status:"active"}
                // },
                // {
                //     $sort:{totalOrders:1}
                // },
                {
                    $group : {
                        _id : '$salesrepName',                  
                        totalSum:{$sum:'$totalValue'}           
                    }
                },
                {
                    $sort:{totalSum:1}
                },
                {
                    $project:{ _id:1, area:"$area" }
                },
                {
                     $limit : 10
                }
            ]
        )
        .then(data=>{
            return res.status(200).json(data);
        })
        .catch(err =>{
            return res.status(400).json(err);
        })

}