require('dotenv').config();

const app = require('./app');
const port = app.get('port');

require('./database');

app.listen(port, () => {
    console.log(`Server is connected on port ${port}`)
})