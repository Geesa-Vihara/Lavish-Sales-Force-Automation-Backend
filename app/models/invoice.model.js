const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const invoiceSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Invoiceno: {
    type: String,
    required: true
  },
  salesrepName: {
    type: String
  },
  customerName: {
    type: String,
    required: true
  },

  teapouch20: {
    name: { type: String, default: "tea pouch" },
    weight: { type: String, default: "20g" },
    qut: { type: Number, default: "" },
    price: { type: Number, default: "" }
  },
  teapouch50: {
    name: { type: String, default: "tea pouch" },
    weight: { type: String, default: "50g" },
    qut: { type: Number, default: "" },
    price: { type: Number, default: "" }
  },
  teapouch100: {
    name: { type: String, default: "Tea pouch" },
    weight: { type: String, default: "100g" },
    qut: { type: Number, default: 0 },
    price: { type: Number, default: 0 }
  },
  teapouch200: {
    name: { type: String, required: true, default: "Tea pouch" },
    weight: { type: String, default: "200g" },
    qut: { type: Number, default: 0 },
    price: { type: Number, default: 0 }
  },
  teapouch400: {
    name: { type: String, default: "Tea pouch" },
    weight: { type: String, default: "400g" },
    qut: { type: Number, default: 0 },
    price: { type: Number, default: 0 }
  },
  teapouch1kg1: {
    name: {
      type: String,

      default: " Tea pouch Premium Quality"
    },
    weight: { type: String, default: "1kg" },
    qut: { type: Number, default: 0 },
    price: { type: Number, default: 0 }
  },
  teapouch1kg2: {
    name: {
      type: String,

      default: "Tea pouch Export Quality"
    },
    weight: { type: String, required: true, default: "1kg" },
    qut: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 }
  },
  teapouch1kg3: {
    name: { type: String, required: true, default: "Tea pouch BOPF Quality" },
    weight: { type: String, required: true, default: "1kg" },
    qut: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 }
  },
  teapouch1kg4: {
    name: {
      type: String,
      required: true,
      default: "Tea pouch Catering Pack"
    },
    weight: { type: String, required: true, default: "1kg" },
    qut: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 }
  },
  teabag1: {
    name: { type: String, required: true, default: "Teabag Packet Type" },
    weight: { type: String, required: true, default: "25pack" },
    qut: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 }
  },
  teabag2: {
    name: { type: String, required: true, default: "Tea bag Packet Type" },
    weight: { type: String, required: true, default: "50pack" },
    qut: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 }
  },
  teabag3: {
    name: { type: String, required: true, default: "Tea bag Packet Type" },
    weight: { type: String, required: true, default: "100pack" },
    qut: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 }
  },
  teasachet1: {
    name: {
      type: String,
      required: true,
      default: "Tea sachet Catering Type"
    },
    weight: { type: String, required: true, default: "250Bag" },
    qut: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 }
  },
  teasachet2: {
    name: {
      type: String,
      required: true,
      default: "Tea sachet Catering Type"
    },
    weight: { type: String, required: true, default: "500Bag" },
    qut: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 }
  },
  teasachet3: {
    name: {
      type: String,
      required: true,
      default: "Tea sachet Catering Type"
    },
    weight: { type: String, required: true, default: "1000Bag" },
    qut: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 }
  },
  teabulk1: {
    name: {
      type: String,
      required: true,
      default: "Tea bulk Premium Quality"
    },
    weight: { type: String, required: true, default: "5kg" },
    qut: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 }
  },
  teabulk2: {
    name: {
      type: String,
      required: true,
      default: " Tea bulk Export Quality"
    },
    weight: { type: String, required: true, default: "5kg" },
    qut: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 }
  },
  teabulk3: {
    name: {
      type: String,
      required: true,
      default: " Tea bulk Catering Quality"
    },
    weight: { type: String, required: true, default: "5kg" },
    qut: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 }
  },
  teabulk4: {
    name: {
      type: String,
      required: true,
      default: "Tea bulk Export Quality"
    },
    weight: { type: String, required: true, default: "25kg" },
    qut: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 }
  },
  teabulk5: {
    name: { type: String, required: true, default: "Tea bulk Tea Box" },
    weight: { type: String, required: true, default: "25kg" },
    qut: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 }
  },
  teabulk6: {
    name: { type: String, required: true, default: " Tea bulk Bag Type" },
    weight: { type: String, required: true, default: "50kg" },
    qut: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 }
  },
  teabottle: {
    name: { type: String, required: true, default: "Tea bottle" },
    weight: { type: String, required: true, default: "250g" },
    qut: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 }
  },
  teabasket1: {
    name: { type: String, required: true, default: "Tea Basket PF-l" },
    weight: { type: String, required: true, default: "4.5kg" },
    qut: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 }
  },
  teabasket2: {
    name: { type: String, required: true, default: "Tea Basket BP-l" },
    weight: { type: String, required: true, default: "4kg" },
    qut: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 }
  },

  totalValue: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
},
{collection:'orders'});
const Invoice = mongoose.model('invoices',invoiceSchema);
module.exports=Invoice;