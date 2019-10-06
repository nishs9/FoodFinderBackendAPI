let express = require('express');
const BodyParser = require('body-parser');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb+srv://nishs9:mas2019@mas-cluster-whhsb.mongodb.net/admin?retryWrites=true&w=majority"
const DATABASE_NAME = "mas-database";

let app = express();

let apiRoutes = require("./api-routes")

app.use('/api', apiRoutes);
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var port = process.env.Port || 8080;

//Test endpoint
app.get('/', (req, res) => res.send('Homescreen'));

//POST endpoint that adds users to the database
app.post("/users", (request, response) => {
  collection.insert(request.body, (error, result) => {
    if(error) {
      return response.status(500).send(error);
    }
    response.send(result.result);
  });
});

//GET endpoint that retrieves a specfiic user given their unique user ID
app.get("/users/:id", (request, response) => {
    collection.findOne({"_id" : new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
          return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.listen(port, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
        if(error) {
          throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("users");
        console.log("Connected to " + DATABASE_NAME + "!");
    });
});
