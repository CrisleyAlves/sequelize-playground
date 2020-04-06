const app = require("./app");
const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('server is running on port 3000');
})