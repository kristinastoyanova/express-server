const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var request = require('request');

let json = {
    "payload": [
        {
            "address": {
                "buildingNumber": "28",
                "lat": -33.912542000000002,
                "lon": 151.00293199999999,
                "postcode": "2198",
                "state": "NSW",
                "street": "Donington Ave",
                "suburb": "Georges Hall"
            },
            "propertyTypeId": 3,
            "readyState": "init",
            "reference": "aqsdasd",
            "shortId": "6Laj49N3PiwZ",
            "status": 0,
            "type": "htv",
            "workflow": "pending"
        },
        {
            "address": {
                "buildingNumber": "Level 6",
                "postcode": "2060",
                "state": "NSW",
                "street": "146 Arthur Street",
                "suburb": "North Sydney"
            },
            "propertyTypeId": 3,
            "readyState": "init",
            "reference": "asdasd",
            "shortId": "E9eQVYEMkub2",
            "status": 4,
            "type": "htv",
            "valfirm": null,
            "workflow": "completed"
        },
        {
            "address": {
                "buildingNumber": "25",
                "postcode": "4000",
                "state": "QLD",
                "street": "Mary St",
                "suburb": "Brisbane"
            },
            "propertyTypeId": 3,
            "readyState": "init",
            "reference": "asdas",
            "shortId": "nQMyWWLBvu4A",
            "status": 1,
            "type": "avm",
            "workflow": "pending"
        },
        {
            "address": {
                "buildingNumber": "92",
                "postcode": "2000",
                "state": "NSW",
                "street": "Pitt Street",
                "suburb": "Sydney",
                "unitNumber": "Suite 1 Level 8"
            },
            "propertyTypeId": 3,
            "readyState": "complete",
            "reference": "asdasd",
            "shortId": "ZM73nE4nKH56",
            "status": 4,
            "type": "avm",
            "workflow": "cancelled"
        },
        {
            "address": {
                "buildingNumber": "28",
                "lat": -33.912542000000002,
                "lon": 151.00293199999999,
                "postcode": "2198",
                "state": "NSW",
                "street": "Donington Ave",
                "suburb": "Georges Hall"
            },
            "propertyTypeId": 3,
            "readyState": "complete",
            "reference": "asdasdas",
            "shortId": "AQzAB5xMXFNx",
            "status": 3,
            "type": "avm",
            "workflow": "completed"
        },
        {
            "address": {
                "buildingNumber": "360",
                "postcode": "3000",
                "state": "VIC",
                "street": "Elizabeth St",
                "suburb": "Melbourne",
                "unitNumber": "Level 28"
            },
            "propertyTypeId": 3,
            "readyState": "complete",
            "reference": "asdas",
            "shortId": "yebZvgdA7FRk",
            "status": 1,
            "type": "htv",
            "workflow": "completed"
        },
        {
            "address": {
                "buildingNumber": "153",
                "postcode": "2229",
                "state": "NSW",
                "street": "Denman Avenue",
                "suburb": "CARINGBAH",
                "unitNumber": "Suite 7"
            },
            "propertyTypeId": 3,
            "readyState": "complete",
            "reference": "asdas",
            "shortId": "YP7NJVNpVCdr",
            "status": 4,
            "type": "htv",
            "workflow": "cancelled"
        }
    ]
};
let json1 = {"vsacds": "asaad"};
let newJson;

var options = {
    url: 'http://localhost:5000',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    json: json
};

request(options, (err, res, body) => {
    if (res && (res.statusCode === 200 || res.statusCode === 201)) {
        console.log('request ' + body);
    }
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(newJson)
});

app.post('/', (req, res) => {
    try {
        JSON.parse(JSON.stringify(req.body));
    } catch (err) {
        //console.log(err);
        return res.sendStatus(400).json({
            "error": "Could not decode request: JSON parsing failed"
        });
    }

    let properties = JSON.parse(JSON.stringify(req.body)).payload;

    if (!properties)  {
        return res.sendStatus(400).json({
            "error": "Could not decode request: JSON parsing failed"
        });
    }

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
    //res.send(newJson)
    res.send(JSON.stringify(newJson));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

//https://shrouded-thicket-50305.herokuapp.com/ | https://git.heroku.com/shrouded-thicket-50305.git

