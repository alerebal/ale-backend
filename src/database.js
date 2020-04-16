const { connect } = require('mongoose');


const uri = `mongodb+srv://${process.env.MONGO_db}:${process.env.MONGO_KEY}@cluster0-x2ibd.mongodb.net/test?retryWrites=true&w=majority`;

connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(console.log(`Database is connected`))
    .catch(err => console.log(err))
