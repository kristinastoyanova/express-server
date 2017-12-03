# simple express-server

## Description

A small NodeJs API web service that handles POST requests with list of properties.
From the list of property data in the request payload, it returns a property record array for items having workflow completed (workflow: completed) for the type 'htv'.

The returned JSON has a response key with an array of properties. Each element has the following fields from the request:

* Attribute 1: concataddress – a concatenation of the address object fields into a single string
* Attribute 2: type
* Attribute 3: workflow

## Error Handling

If invalid JSON is sent, a JSON response with HTTP status 400 Bad Request (with an `error` key) is returned

```javascript
{
    "error": "Could not decode request: JSON parsing failed"
}
```

## Link to app

https://shrouded-thicket-50305.herokuapp.com/
