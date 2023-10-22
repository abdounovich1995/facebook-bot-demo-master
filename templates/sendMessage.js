const request = require('request');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');
const sendGenericTemplate = require('../templates/sendGenericTemplate');

module.exports = function processMessage(event) {
    if (!event.message || !event.message.text) {
        // If the message or text property is missing, don't process it further.
        return;
    }

    const userMessage = event.message.text.toLowerCase(); // Convert the message to lowercase for case-insensitive matching.
    const senderID = event.sender.id;
    console.log("Received message from senderId: " + senderID);
    console.log("Message is: " + JSON.stringify(event.message));

    if (userMessage === "hello") {
        // Send a "Hi" message in response to "Hello"
        sendMessage(senderID, "Hi");
    } else {
        // Send an error message for other input
        sendMessage(senderID, "I'm sorry, I don't under   stand that. Please try again.");
    }
}
