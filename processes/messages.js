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
            // now we will take the text recieved and send it to an food tracking API.
            if (message.text.toLowerCase() === "hi") {
                // Send a simple "hi" message in response
                sendMessage(senderID, "Hi");
            } else {
                try {
                    // Simulate an exception
                    throw new Error("This is a custom exception.");
                } catch (error) {
                    console.error("An exception occurred:", error);
                    sendMessage(senderID, "An error occurred. Please try again later.");
                }

      
             
            

        }

      







    
}}}