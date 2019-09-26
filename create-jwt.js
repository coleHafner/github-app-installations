#!/usr/bin/env node

module.exports = ({
	githubAppId,
	pkPath,
	alg = 'RS256',
	debug = false,
}) => {
	const jwt = require('njwt');
	const fs = require('fs');

	const claims = {iss: githubAppId};
	const pkPayload = fs.readFileSync(pkPath, 'utf8');
	const token = jwt.create(claims, pkPayload, alg);

	if (debug) console.log('TOKEN config', token);

	// set expiration for 5 minutes
	token.setExpiration(new Date().getTime() + 300*1000);
	return token.compact();
}

