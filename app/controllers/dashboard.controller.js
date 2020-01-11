exports.dailyOrders=(req,res)=>{
    var d = new Date();
    d.setUTCHours(0,0,0,0);
    var n = new Date();
    n.setUTCHours(24,0,0,0); 
    /* var d=new Date("2019-12-09T00:00:00.000Z");
    var n=new Date("2019-12-10T00:00:00.000Z");   */
    Invoice
        .find({ orderDate: 
            {
            $gte: new Date(d),
            $lt: new Date(n)
        }
    })
        .then(invoice => {
            res.status(200).json(invoice);
        })
        .catch(err => {
            res.status(400).json(err);
        })
}
exports.topCustomer=(req,res)=>{
    var d = new Date();
    d.setUTCHours(0,0,0,0);
    var n = new Date();
    n.setUTCHours(24,0,0,0); 
    /* var d=new Date("2019-12-09T00:00:00.000Z");
    var n=new Date("2019-12-10T00:00:00.000Z");  */
    Invoice
        .find({ orderDate: 
            {
            $gte: new Date(d),
            $lt: new Date(n)
        }
    }).sort({totalValue:-1}).limit(1)
        .then(invoice => {
            res.status(200).json({invoice});
        })
        .catch(err => {
            res.status(400).json(err);
        })
}
exports.topProduct=(req,res)=>{
    var d = new Date();
    d.setUTCHours(0,0,0,0);
    var n = new Date();
    n.setUTCHours(24,0,0,0); 
    /* var d=new Date("2019-12-09T00:00:00.000Z");
    var n=new Date("2019-12-10T00:00:00.000Z"); */
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
        .then(rep=> res.status(200).json(rep)
        )
        .catch(err => {res.status(400).json(err);
        })
}

exports.dailySales=(req,res)=>{
    var d = new Date();
    d.setUTCHours(0,0,0,0);
    var n = new Date();
    n.setUTCHours(24,0,0,0); 
   /*  var d=new Date("2019-12-09T00:00:00.000Z");
    var n=new Date("2019-12-10T00:00:00.000Z"); */ 
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
            console.log(err)

        })
}