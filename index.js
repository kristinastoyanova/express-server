const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var request = require('request');

let newJson;

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    if (err) {
    console.log('Invalid Request data');
    res.status(400).send({
        "error": "Could not decode request: JSON parsing failed"
    })

    } else {
        next()
    }
});

app.post('/', (req, res) => {

    let properties = JSON.parse(JSON.stringify(req.body)).payload;

    let filteredObj = {
        response: []
    };

    for (let property of properties ) {
        if(property.workflow === 'completed' && property.type === 'htv') {
            let address = property.address.buildingNumber + ' '
                          + property.address.street + ' '
                          + property.address.suburb + ' '
                          + property.address.state + ' '
                          + property.address.postcode;

            filteredObj.response.push({
               contactaddress : address,
               type: property.type,
               workflow: property.workflow
            });
        }
    }

    newJson = JSON.stringify(filteredObj);
    res.send(JSON.stringify(newJson));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

//https://shrouded-thicket-50305.herokuapp.com/ | https://git.heroku.com/shrouded-thicket-50305.git

