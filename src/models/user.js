var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//const User = mongoose.model('User', userSchema);
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type:Boolean}
});

userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = {
    User:mongoose.model('User', userSchema)
};