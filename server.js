const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
	const message = twiml.message();

  if (req.body.Body === 'Hello'|| req.body.Body === 'hello') {
		message.body('So glad to hear from you! Still interested in getting to know Ruby? [Y/N]');
		message.media('http://bit.ly/helloBean');

	} else if (req.body.Body === 'Y' || req.body.Body === 'y') {
		message.body(`Email: rubymleee@gmail.com,
		Linkedin: https://www.linkedin.com/in/rubymlee
		Github: https://github.com/rubyygrapefruit
		Resume: http://bit.ly/RubyResume
		Website: http://rubymlee.com
		Please feel free to contact her for anything!
		`);
	} else if (req.body.Body === 'N'|| req.body.Body === 'n') {
		message.body(`Sorry you\'re not interested but I\'ll leave you her info in case you change your mind :) 
		Email: rubymleee@gmail.com,
		Linkedin: https://www.linkedin.com/in/rubymlee
		Github: https://github.com/rubyygrapefruit
		Resume: http://bit.ly/RubyResume
		Website: http://rubymlee.com
		Hope to hear from you next time! Goodbye`);
	} else {
    message.body('If you would like more info, please reply with \'Hello\'');
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

http.createServer(app).listen(3000, () => {
  console.log('Express server listening on port 3000');
});

