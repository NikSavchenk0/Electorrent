'use strict';

angular.module('torrentApp').factory('Server', ['$btclients', function($btclients) {

    /**
     * Constructor, with class name
     */
    function Server(ip, port, user, password, client) {
        if (arguments.length === 1) {
            this.fromJson(arguments[0])
        } else {
            this.id = generateGUID()
            this.ip = ip
            this.port = port
            this.user = user
            this.password = password
            this.client = client
            this.lastused = -1
        }
    }

    Server.prototype.fromJson = function (data) {
        this.id = data.id
        this.ip = data.ip
        this.port = data.port
        this.user = data.user
        this.password = data.password
        this.client = data.client
        this.default = data.default
        this.lastused = data.lastused
    };

    Server.prototype.json = function () {
        return {
            id: this.id,
            ip: this.ip,
            port: this.port,
            user: this.user,
            password: this.password,
            client: this.client,
            default: this.default,
            lastused: this.lastused || -1
        }
    };

    Server.prototype.getName = function () {
        return $btclients[this.client].name
    };

    Server.prototype.getIcon = function () {
        return $btclients[this.client].icon
    };

    Server.prototype.getNameAtAddress = function () {
        return this.getName() + " @ " + this.ip
    };

    Server.prototype.updateLastUsed = function () {
        this.lastused = new Date().getTime()
    };

    function generateGUID() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    /**
     * Return the constructor function
     */
    return Server;
}]);