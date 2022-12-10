const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/notes-db',
    {useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true}
)
.then(() => console.log('La conexión a DB fué exitosa.'))
.catch(err => console.error(err))