const request = require('supertest');
const express = require('express');

describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('./app');
  });
  afterEach(function () {
    setTimeout(function(){
    	server.close();
    },1000);
  });

  it('responds to /', function testSlash(done) {
		request(server).get('/').expect(200, done);
  });

  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });


  it('responds to /api/user (without Auth)', function testSlash(done) {
		request(server).get('/api/user').expect(401, done);
  });

  it('responds to /api/user  (Unauthorized User)', function testSlash(done) {
		request(server).get('/api/user').set('Authorization', 'Basic WYWRtaW46YWRtaW4=').expect(403, done);
  });

  it('responds to /api/user', function testSlash(done) {
		request(server).get('/api/user')
		.set('Authorization', 'Basic YWRtaW46YWRtaW4=')
		.set('token', 'qeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pY29sIiwiaWF0IjoxNTEyNjQyNTIwLCJleHAiOjE1MTI2NDc1MjB9.UI54dectpzwGrbGAHJwlJrtnZn0ftiLMu4hURx9ZbV4')
		.expect(403, done);
  });

  it('responds to /api/user', function testSlash(done) {
		request(server).get('/api/user')
		.set('Authorization', 'Basic YWRtaW46YWRtaW4=')
		.set('token', 'qeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pY29sIiwiaWF0IjoxNTEyNjQyNTIwLCJleHAiOjE1MTI2NDc1MjB9.UI54dectpzwGrbGAHJwlJrtnZn0ftiLMu4hURx9ZbV4')
		.expect(403, done);
  });



  it('responds to /api/user', function testSlash(done) {
		request(server).get('/api/user')
		.set('Authorization', 'Basic YWRtaW46YWRtaW4=')
		.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pY29sIiwiaWF0IjoxNTEyNjQ4ODkzLCJleHAiOjE1MTI2NTM4OTN9.8arKd4WOHgmtwlsXW1bGvN19DuxRD5BfEkN23yDIpcM')
		.expect(200, done);
  });

});
