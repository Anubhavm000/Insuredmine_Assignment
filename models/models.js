const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    agentName : String
});

const userSchema = new mongoose.Schema({
    firstName : String,
    dob : Date,
    address : String,
    phoneNumber : String,
    state : String,
    zipCode : String,
    email : String,
    gender : String,
    userType : String

});

const accountSchema = new mongoose.Schema({
    accountName : String
});

const pCategorySchema = new mongoose.Schema({
    categoryName : String
});

const pCarrierSchema = new mongoose.Schema({
    companyName : String
});

const pInfoSchema = new mongoose.Schema({
    policyNumber : String,
    policyStartdate : Date,
    policyEndDate : Date,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    carrier: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrier' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Agent = mongoose.model('Agent', agentSchema);
const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);
const Category = mongoose.model('Category', pCategorySchema);
const Carrier = mongoose.model('Carrier', pCarrierSchema);
const Policy = mongoose.model('Policy', pInfoSchema);


module.exports = {
  Agent,
  User,
  Account,
  Category,
  Carrier,
  Policy,
};