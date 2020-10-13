const dotenv = require('dotenv').config();
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const server = express();
const port = process.env.port || 3000;
const test_number = '+12512704741';
const country_code = process.env.country_code;
server.use(cors());
server.use(morgan('combined'));
server.use(bodyParser.json());

const sendMessage = (req, res) => {
	let { number, name } = req.body;
	if (number && name) {
		client.messages
			.create({
				body : `Hallo ${name} das ist eine Testnachricht`,
				from : test_number,
				to   : country_code + number
			})
			.then((message) => res.status(200).json(message.sid))
			.catch((error) => {
				res.status(400).json(error);
			});
	} else {
		res.status(400).json('No number provided');
	}
};

server.post('/messages', sendMessage);

server.listen(port, async () => console.log(`server started on port: ${port}`));
