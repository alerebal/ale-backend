const { connect } = require('mongoose');


const uri = `mongodb+srv://testing:1234@cluster0-x2ibd.mongodb.net/test?retryWrites=true&w=majority`;

connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(console.log(`Database is connected`))
    .catch(err => console.log(err))
