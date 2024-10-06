const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserModel = require("../../common/models/User");

const { roles, jwtSecret, jwtExpirationInSeconds } = require("../../config");
const generateAccessToken = (email, userId) => {
    return jwt.sign(
        {
            userId,
            email,
        },
        jwtSecret,
        {
            expiresIn: jwtExpirationInSeconds,
        }
    );
};

// Encrypts the password using SHA256 Algorithm, for enhanced security of the password
const encryptPassword = (password) => {
    // We will hash the password using SHA256 Algorithm before storing in the DB
    // Creating SHA-256 hash object
    const hash = crypto.createHash("sha256");
    // Update the hash object with the string to be encrypted
    hash.update(password);
    // Get the encrypted value in hexadecimal format
    return hash.digest("hex");
};

module.exports = {
    register: (req, res) => {
        const payload = req.body;

        let encryptedPassword = encryptPassword(payload.password);
        let role = payload.role;

        if (!role) {
            role = roles.WALKER;
        }

        UserModel.createUser(
            Object.assign(payload, { password: encryptedPassword, role })
        )
            .then((user) => {

                const accessToken = generateAccessToken(payload.email, user.id);

                return res.status(200).json({
                    status: true,
                    data: {
                        user: user.toJSON(),
                        token: accessToken,
                    },
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    login: (req, res) => {
        const { email, password } = req.body;

        UserModel.findUser({ email })
            .then((user) => {
                if (!user) {
                    return res.status(400).json({
                        status: false,
                        error: {
                            message: `Could not find any user with email: \`${email}\`.`,
                        },
                    });
                }

                const encryptedPassword = encryptPassword(password);

                if (user.password !== encryptedPassword) {
                    return res.status(400).json({
                        status: false,
                        error: {
                            message: `Provided email and password did not match.`,
                        },
                    });
                }

                const accessToken = generateAccessToken(user.email, user.id);

                return res.status(200).json({
                    status: true,
                    data: {
                        user: user.toJSON(),
                        token: accessToken,
                    },
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },
};