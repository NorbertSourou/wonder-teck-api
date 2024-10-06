const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const Sequelize = require("sequelize");


const app = express();
const PORT = process.env.PORT || 3000;
// Express Routes Import
const AuthorizationRoutes = require("./authorization/routes");
const UserRoutes = require("./users/routes");

// Sequelize model imports
const UserModel = require("./common/models/User");

app.use(morgan("tiny"));
app.use(cors());

app.use(express.json());

const sequelize = new Sequelize(
    'db_wonder_teck',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

UserModel.initialise(sequelize);


sequelize
    .sync()
    .then(() => {
        console.log("Sequelize Initialised!!");

        // Attaching the Authentication and User Routes to the app.
        app.use("/", AuthorizationRoutes);
        app.use("/user", UserRoutes);

        app.listen(PORT, () => {
            console.log("Server Listening on PORT:", PORT);
        });
    })
    .catch((err) => {
        console.error("Sequelize Initialisation threw an error:", err);
    });




