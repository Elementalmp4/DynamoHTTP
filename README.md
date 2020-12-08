# DynamoHTTP
A simple, lightweight, customisable web host written in Node.JS


## Example config.json

to use `DynamoHTTP` you will need to set up a `config.json` file. This short explanation should help you get started:

```js
{
    "port": 8000, //The HTTP port to use
    "requests": [
        {
            "url": "/", //The URL that your client has requested
            "readsFile": false, //Will this request load data from a file?
            "headers": { "Content-Type": "text/html" }, //The headers to return
            "return": "<html>DynamoHTTP Default Page</html>" //The path to the file if readsFile is true, if not this value can be set to any text.
        },
        {
            "url": "/index.html", //The URL that your client has requested
            "readsFile": true, //Will this request load data from a file?
            "headers": { "Content-Type": "text/html" }, //The headers to return
            "return": "./index.html" //The path to the file if readsFile is true, if not this value can be set to any text.
        }
    ]
}

```
