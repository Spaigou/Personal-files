var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    usersController = require("./controllers/users_controller.js"),
    app = express();

app.use('/', express.static(__dirname + "/client"));
app.use('/:username', express.static(__dirname + "/client"));

app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/personalFiles', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    console.log("DB Connected!")
}).catch(err => {
    console.log(Error, err.message);
});;

http.createServer(app).listen(3000);

app.get("/:username/users.json", usersController.index);
app.get("/user/:username", usersController.search);
app.get("/userID/:id", usersController.searchById);
app.post("/:username/users", usersController.create);
app.delete("/:username/users/:id", usersController.destroy);
app.put("/:username/users/:id", usersController.update);
