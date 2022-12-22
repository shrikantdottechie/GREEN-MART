const mongoose = require("mongoose")

//mongoose.connect("mongodb://127.0.0.1:27017/grocery_delivery", {

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});
mongoose.set('strictQuery', true);

module.exports= mongoose;
