#!/usr/bin/env node

(async () => {
	const axios = require('axios');
	const dotenv = require('dotenv');
	const {yellow, red} = require('colors');
	const createJwt = require('./create-jwt');

	dotenv.config();

	const debug = [
		'-d', 
		'--debug',
		'-v',
		'--verbose'
	].includes(process.argv[2]);

	const jwt = createJwt({
		pkPath: './private-key.pem',
		githubAppId: process.env.GITHUB_APP_ID,
		debug, 
	});

	const config = {
		baseURL: 'https://api.github.com',
		headers: {
			Authorization: `Bearer ${jwt}`,
			Accept: 'application/vnd.github.machine-man-preview+json',
		}
	};

	if (debug) console.log('AXIOS config:', config);
	
	const conn = axios.create(config);

	const { data: {name, installations_count} } = await conn.get('/app').catch(err => {
		console.log(red(`REQUEST FAILED: ${err || 'Something went wrong'}`));
		process.exit(1);
	});

	console.log(yellow(`${name} has been installed ${installations_count} time${installations_count === 1 ? '' : 's'}.`));
})();
