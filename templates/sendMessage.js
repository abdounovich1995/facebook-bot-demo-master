const request = require('request-promise');

module.exports = function sendMessage(recipientId, message) {
    return new Promise(function (resolve, reject) {
        console.log("Sending message to recipient: " + recipientId);
        request({
            uri: "https://graph.facebook.com/v2.6/me/messages",
            qs: {
                access_token: process.env.PAGE_ACCESS_TOKEN,
            },
            method: "POST",
            json: {
                recipient: { id: recipientId },
                message: message,
            },
        })
            .then((body) => {
                console.log("Message sent successfully.");
                resolve(body);
            })
            .catch((error) => {
                console.log("Error sending message: " + error);
                reject(error);
            });
    });
};
