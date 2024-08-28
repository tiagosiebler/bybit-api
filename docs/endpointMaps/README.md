# Endpoint maps

In this folder you can find table of all endpoints and its corresponding functions from the official exchange API documentation. All functions are mapped based on the 
client they are associated with. You can easily search which function uses which URL and what client to use for it. 

You can find all clients in the [source folder](/src).

If anything is missing or wrong, please open an issue or let us know in our [Node.js Traders](https://t.me/nodetraders) telegram group!


## How to use table

  Table consists of 4 parts:

  - Function name
  - AUTH
  - HTTP Method
  - Endpoint

  **Function name** is the name of the function that can be called through the SDK. Check examples folder in the repo for more help on how to use them!

  **AUTH** is a boolean value that indicates if the function requires authentication - which means you need to pass your API key and secret to the SDK.

  **HTTP Method** shows HTTP method that the function uses to call the endpoint. Sometimes endpoints can have same URL, but different HTTP method so you can use this column to differentiate between them.

  **Endpoint** is the URL that the function uses to call the endpoint. Best way to find exact function you need for the endpoint is to search for URL in this table and find corresponding function name. 


