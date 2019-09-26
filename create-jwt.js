#!/usr/bin/env node
const dotenv = require('dotenv');
const jwt = require('njwt');
const fs = require('fs');

dotenv.config();

const claims = {iss: process.env.GITHUB_APP_ID};
const pkFile = './private-key.pem';
const pkPayload = fs.readFileSync(pkFile, 'utf8');
const token = jwt.create(claims, pkPayload);

// set expiration an hour from now
token.setExpiration(new Date().getTime() + 60*1000);

console.log(token.compact());
