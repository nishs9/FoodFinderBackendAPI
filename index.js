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

//GET endpoint that retrieves all users and their information (exclusing password)
app.get("/users", (request, response) => {
    collection.find({}).toArray((error, result) => {
      if(error) {
        return response.status.send(error);
      }
      response.send(result);
    });
});

app.listen(port, () => {
    MongoClient.connect(CONNECTION_URL, { userNewUrlParser: true}, (error, client) => {
        if(error) {
          throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("users");
        console.log("Connected to " + DATABASE_NAME + "!");
    });
});
