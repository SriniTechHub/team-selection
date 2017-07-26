const express = require('express')
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/dist'));
app.get('/', function (req, res) {
   res.sendFile('dist/index.html', {root: __dirname })
})
console.log(`server is listening on ${port}`)
app.listen(port)