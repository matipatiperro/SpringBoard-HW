// ## **Part One: Solidify Terminology**

// In your own terms, define the following terms:

// - What is HTTP?
// hypertext transfer protocol. it is a protocol (an agreed upon standard on how something behaves) for sending
// and recieving data from the web

// - What is a URL?
// uniform resource locator. the address to locate data from a server. composed of different parts
// protocol (http), domain name (google), port, path to file, parameters

// - What is DNS?
// Domain Name System. Translates urls to ip addresses

// - What is a query string?
// part of a url (parameters) that indicates to the server what the user is searching (querying) for

// - What are two HTTP verbs and how are they different?
// post and get. Get tells the server that the user is requesting information. Post tells the server that the
// user is attempting to send the server information

// - What is an HTTP request?
// a message sent from a user to a server in the form of http, requesting the server to perform an action
// there are three parts to the http request 1- a method (tells the server what will be done)
// 2- a path of the url, which identifies the resource on the server
// The HTTP version number, 1.1

// - What is an HTTP response?
// a response from the server to the client that made the request
// contains a status, header(s), and message body

// - What is an HTTP header? Give a couple examples of request and response headers you have seen.
// an HTTP header provides additional context and metadata about the request/response
// examples are language, date

// - What are the processes that happen when you type “[http://somesite.com/some/page.html](http://somesite.com/some/page.html)” into a browser?
// not much happens until that is submitted.
// the domain will be translated to a ipaddress with a request of some sort. the server will respond depending on the request sent

// ## ****Part Two: Practice Tools****

// 1. Using ***curl***, make a ***GET*** request to the *icanhazdadjoke.com* API to find all jokes involving the word “pirate”
// 2. Use ***dig*** to find what the IP address is for *icanhazdadjoke.com*
// 3. Make a simple web page and serve it using ***python3 -m http.server***. Visit the page in a browser.

// curl https://icanhazdadjoke.com/search?term=pirate
// dig https://icanhazdadjoke.com/       SERVER: 192.168.1.1#53(192.168.1.1)

// ## **Part Three: Explore Dev Tools**

// Build a very simple HTML form that uses the GET method (it can use the same page URL for the action) when the form is submitted.
// Add a field or two to the form and, after submitting it, explore in Chrome Developer tools how you can view the request and response headers.
// Edit the page to change the form type to POST, refresh in the browser and re-submit. Do you still see the field in the query string? Explore in Chrome how you can view the request and response headers, as well as the form data.

// GET
// 	http://127.0.0.1:5500/get_page.php?getSomething=sendingAget
// Status
// 404
// Not Found
// VersionHTTP/1.1
// Transferred454 B (151 B size)
// Referrer Policystrict-origin-when-cross-origin
// Request PriorityHighest

// POST
// 	http://127.0.0.1:5500/get_page.php
// Status
// 405
// Method Not Allowed
// VersionHTTP/1.1
// Transferred909 B (0 B size)
// Referrer Policystrict-origin-when-cross-origin
// Request PriorityHighest
