const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
//const SchemaValidationMiddleware = require("common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");


const UserController = require("./controllers/UserController");

const updateUserPayload = require("./schemas/updateUserPayload");
// const changeRolePayload = require("./schemas/changeRolePayload");

const {roles} = require("../config");
const {verify} = require("../common/middlewares/SchemaValidationMiddleware");

router.get("/", [isAuthenticatedMiddleware.check], UserController.getUser);

router.patch(
    "/",
    [
        isAuthenticatedMiddleware.check,
        verify(updateUserPayload),
    ],
    UserController.updateUser
);

router.get(
    "/all",
    [isAuthenticatedMiddleware.check],
    UserController.findAllUsersExceptCurrent
);

// router.patch(
//     "/change-role/:userId",
//     [
//         isAuthenticatedMiddleware.check,
//         CheckPermissionMiddleware.has(roles.ADMIN),
//         SchemaValidationMiddleware.verify(changeRolePayload),
//     ],
//     UserController.changeRole
// );


router.get(
    "/:userId",
    [isAuthenticatedMiddleware.check],
    UserController.getUserById
);
router.delete(
    "/:userId",
    [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
    UserController.deleteUser
);

module.exports = router;