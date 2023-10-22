const request = require('request');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');
const sendGenericTemplate = require('../templates/sendGenericTemplate');

module.exports = function processMessage(event) {
    if (!event.message.is_echo) {
        const message = event.message;
        const senderID = event.sender.id;
        console.log("Received message from senderId: " + senderID);
        console.log("Message is: " + JSON.stringify(message));
        if (message.text) {
            // Check if the received message is "hi"
            if (message.text.toLowerCase() === "hi") {
                // Send a simple "hi" message in response
                sendMessage(senderID, "Hi");
            } else {
                // Send a message indicating that the bot doesn't understand
                sendMessage(senderID, "I'm sorry, I don't understand your message.");
            }
        }
    }
}
