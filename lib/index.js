'use strict';

var path = require('path');
var Router = require('express').Router;


function init(options) {
  options = options || {};
  options.pathname = options.pathname || path.join(process.cwd(), 'package.json');

  var router = Router();

  // parent handler
  router['get']('/', function(req, res, next) {

    try {
      var pkg = require(options.pathname);
      return res.json(pkg);

    } catch (e) {

      next(e);
    }

  });

  return router;
}


module.exports = init;
