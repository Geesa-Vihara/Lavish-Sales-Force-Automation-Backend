exports.generateRep=(req,res)=>{
    
   if(req.body.type==="sales" && req.body.distributor==="All"){
    var d = new Date(req.body.date);
    var n = new Date(req.body.date);
    d.setUTCHours(0,0,0,0);
    n.setUTCHours(24*31,0,0,0);
    Invoice.aggregate([
        { $match: { orderDate :{
            $gte: new Date(d),
            $lte: new Date(n)
        },distUsername:{
            $ne:null
        }
     } }, {"$group" : {_id:{ distUsername:"$distUsername",repName:"$salesrepName"}}}
      ])
        .then(rep=> res.status(200).json(rep)
        )
        .catch(err => {res.status(400).json(err);
            

        }) 
   }
   else if(req.body.type==="stock" && req.body.distributor==="All" ){
    var d = new Date(req.body.date);
    var n = new Date(req.body.date);
    d.setUTCHours(0,0,0,0);
    n.setUTCHours(24,0,0,0);
    Stock.aggregate([        
        
        { $match: { dateandtime :{
            $gte: new Date(d),
            $lt: new Date(n)
        } } },{"$group" : {
            _id: { distname:"$distname"},
            currdate:{$first:{ $dateToString: { format: "%Y-%m-%d", date: "$dateandtime" } }},
            hour: {$first:{ $hour: "$dateandtime" }},
            minutes: {$first:{ $minute: "$dateandtime" }},
            repname:{$first:"$repname"},
            stockno:{$first:"$stockno"},

            }}
      ])
        .then(rep=> 
            res.status(200).json(rep)
        )
        .catch(err => {res.status(400).json(err);
            

        }) 

   }
   else if(req.body.type==="sales" ){
    var d = new Date(req.body.date);
    var n = new Date(req.body.date);
    d.setUTCHours(0,0,0,0);
    n.setUTCHours(24*31,0,0,0);
    Invoice.aggregate([
        { $match: { orderDate :{
            $gte: new Date(d),
            $lte: new Date(n)
        },
        distUsername:{
            $eq: req.body.distributor
        }
     } }, {$group : {
        _id: { distUsername:req.body.distributor,repName:"$salesrepName"},       

  }}
      ])
        .then(rep=> res.status(200).json(rep)
        )
        .catch(err => {res.status(400).json(err);
            

        }) 
}
    else if(req.body.type==="stock"){
    var d = new Date(req.body.date);
    var n = new Date(req.body.date);
    d.setUTCHours(0,0,0,0);
    n.setUTCHours(24,0,0,0);
    Stock.aggregate([        
        
        { $match: { dateandtime :{
            $gte: new Date(d),
            $lt: new Date(n)
        } } },{"$group" : {
            _id: { distname:req.body.distributor},
            currdate:{$first:{ $dateToString: { format: "%Y-%m-%d", date: "$dateandtime" } }},
            hour: {$first:{ $hour: "$dateandtime" }},
            minutes: {$first:{ $minute: "$dateandtime" }},
            repname:{$first:"$repname"},
            stockno:{$first:"$stockno"},

            }}
      ])
        .then(rep=> 
            res.status(200).json(rep)
        )
        .catch(err => {res.status(400).json(err);
            

        }) 
}
}

exports.byDist=(req,res)=>{
    if(req.body.type==="sales"){
     var d = new Date(req.body.date);
     var n = new Date(req.body.date);
     d.setUTCHours(0,0,0,0);
     n.setUTCHours(24*31,0,0,0);
     Invoice.aggregate([
         { $match: { orderDate :{
             $gte: new Date(d),
             $lte: new Date(n)
         },distUsername:{
             $eq:req.body.distributor
         }
      } },{$group : {
        _id :"$_id",
        totalValue:{$first:"$totalValue"},
        currdate:{$first:{ $dateToString: { format: "%Y-%m-%d", date: new Date() } }},
        Invoiceno :{$first:"$Invoiceno"},
        salesrepName:{$first:"$salesrepName"},
        distUsername:{$first:"$distUsername"},
        orderDate: {$first:{ $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } }},
        area:{$first:"$area"},
        route:{$first:"$route"}, 
        collection:{$first:"$collection"},
        teapouch_sum : { $sum:{ $add: ["$teapouch20.price","$teapouch50.price","$teapouch100.price","$teapouch200.price","$teapouch400.price","$teapouch1kg1.price","$teapouch1kg2.price","$teapouch1kg3.price","$teapouch1kg4.price"]}},
        teabag_sum : { $sum:{ $add: ["$teabag1.price","$teabag2.price","$teabag3.price"]}},
        teasachet_sum : { $sum:{ $add: ["$teasachet1.price","$teasachet2.price","$teasachet3.price"]}},
        teabulk_sum : { $sum:{ $add: ["$teabulk1.price","$teabulk2.price","$teabulk3.price","$teabulk4.price","$teabulk5.price","$teabulk6.price"]}},
        teabottle_sum : { $sum:{ $add: ["$teabottle.price"]}},
        teabasket_sum : { $sum:{ $add: ["$teabasket1.price","$teabasket2.price"]}},
        
    }},
       ])
         .then(
             rep=> 
             res.status(200).json(rep)
         )
         .catch(err => {res.status(400).json(err);
             
 
         }) 
        }
        else if (req.body.type==="stock"){
            var d = new Date(req.body.date);
            var n = new Date(req.body.date);
            d.setUTCHours(0,0,0,0);
            n.setUTCHours(24,0,0,0);
            Stock.aggregate([
                { $match: { dateandtime :{
                    $gte: new Date(d),
                    $lt: new Date(n)
                },distname:{
                    $eq:req.body.distributor
                }
            } },{
                $limit : 1
           },{ $addFields: 
            { 
                currdate:{ $dateToString: { format: "%Y-%m-%d", date: new Date() } },

            }
        }])
                .then(
                    rep=> 
                    res.status(200).json(rep)
                )
                .catch(err => {res.status(400).json(err);
                    
        
                }) 

        }
    }
    
 