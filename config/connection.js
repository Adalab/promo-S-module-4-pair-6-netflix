const mongoose = require('mongoose');

const dbConnect = () => {
    const user = 'alexandracampo';
    const password = 'FwJCLOpN4DhdhG6a';
    const dbName = 'Netflix';
    //const uri = `mongodb+srv://${user}:${password}@cluster1.mydrv2l.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    const uri = `mongodb+srv://${user}:${password}@clusternetflix.iirhl9q.mongodb.net/${dbName}?retryWrites=true&w=majority`;


    mongoose
        .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('conectado a mongodb'))
        .catch((e) => console.log('error de conexión', e));
};
module.exports = dbConnect;