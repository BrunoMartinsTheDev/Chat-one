/* eslint-disable no-path-concat */
const functions = require('firebase-functions');
const config = require(__dirname + '/config')
const client = require('twilio')(config.twilio.accountSid, config.twilio.authToken);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.sendToWhatsApp = functions.https.onCall((data, context) => {
    return client.messages.create({
        from: data.from,
        body: data.body,
        to: data.to,
    })
    .then(message => {
        return { messageId: message.sid };
    })
    .catch(err => {
        functions.logger.error(err);
        throw new functions.https.HttpsError('twilio-error', 'The message was not able to be sent.');
    })
});