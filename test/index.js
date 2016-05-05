/* globals describe, before, beforeEach, after, afterEach, it */

'use strict';

var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
chai.should();
//chai.use(require('chai-things')); //http://chaijs.com/plugins/chai-things

var path = require('path');
var request = require('supertest');
var express = require('express');
var bodyParser = require('body-parser');

var MiniRestMonitoringPackage;


describe('mini-rest-monitoring-package', function () {

  describe('exports', function () {
    before(function() {
      MiniRestMonitoringPackage = require('../lib/');
    });

    it('expect to export function', function () {
      expect(typeof MiniRestMonitoringPackage === 'function');
    });

    it('expect init() to return function', function () {
      expect(typeof MiniRestMonitoringPackage() === 'function');
    });
  });


  describe('expect to return package.json', function () {
    var app, next;

    beforeEach(function() {
      app = express();
      app.use(bodyParser.json());
      MiniRestMonitoringPackage = require('../lib/');
      next = function() { throw new Error('next() must never be called'); };
    });

    it('return package.json from process.cwd() by default', function (done) {
      var pathname = '../package.json';
      app.use('/', MiniRestMonitoringPackage());
      request(app).get('/')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          //console.log('res.body:' + JSON.stringify(res.body,null,2));
          var pkg = require(pathname);
          expect(res.body).eql(pkg);
        })
        .end(done)
      ;
    });

    it('return package.json from options.pathname', function (done) {
      var pathname = path.join( __dirname, './package.test.json' );
      app.use('/', MiniRestMonitoringPackage({ pathname: pathname }));
      request(app).get('/')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          //console.log('res.body:' + JSON.stringify(res.body,null,2));
          var pkg = require(pathname);
          expect(res.body).eql(pkg);
        })
        .end(done)
      ;
    });

  });

});
