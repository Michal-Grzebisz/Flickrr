"use strict";
exports.__esModule = true;
var auth0_react_1 = require("@auth0/auth0-react");
var react_1 = require("react");
var accountButtons_1 = require("./buttons/accountButton/accountButtons");
var AuthenticationButton = function () {
    var isAuthenticated = auth0_react_1.useAuth0().isAuthenticated;
    return isAuthenticated ? react_1["default"].createElement(accountButtons_1.LogoutButton, null) : react_1["default"].createElement(accountButtons_1.LoginButton, null);
};
exports["default"] = AuthenticationButton;
