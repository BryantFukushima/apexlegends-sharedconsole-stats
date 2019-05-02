const express = require("express");
const bodyParser = require("body-parser");
const mongojs = require("mongojs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//allow api to be accessed by other apps (CORS)
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "POST, GET, OPTIONS, PUT, DELETE"
    );
    next();
});

// database configuration
const MONGODB_URI = process.env.MONGODB_URI || "apexstats_db";
const collections = ["games"];

// mongojs hook database to the db variable
const db = mongojs(MONGODB_URI, collections);
//mongodb error check
db.on("error", error => {
    console.log("Database Error:", error);
});

app.get("/games", function(req, res) {
    db.games.find({}, (err, games) => {
        if (err) {
            console.log(err);
        } else {
            res.send(games);
        }
    });
});

app.post("/add-game", (req, res) => {
    db.games.insert(req.body, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});

app.post("/delete-game/:id", (req, res) => {
    db.games.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});

// //Static file declaration
app.use(express.static(path.join(__dirname, "client/build")));

//production mode
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
    //
    app.get("*", (req, res) => {
        res.sendfile(path.join(__dirname = "client/build/index.html"));
    });
}
//build mode
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname = "client/build/index.html"));
});

// Listen on port 3001
app.listen(PORT, () => {
    console.log("Listening on PORT:", PORT);
});
