define({ "api": [  {    "type": "post",    "url": "/api/auth",    "title": "Request User authorization through the steam ticket",    "name": "GetJWT",    "version": "0.1.0",    "group": "Auth",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "ticket",            "description": "<p>Convert the ticket from GetAuthSessionTicket from binary to hex into an appropriately sized byte character array and pass the result in as this ticket parameter.</p>"          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "{ \"ticket\": \"14000000252D6B3A43B98070A3DE8716010010012659DB5B18...\" }",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Successful execution of the request</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "jwt",            "description": "<p>JSON Web Token (JWT)</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"jwt\": \"xxx.yyy.zzz\"\n}",          "type": "json"        }      ]    },    "filename": "./src/api/controllers/auth.js",    "groupTitle": "Auth",    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "TicketNotProvidedError",            "description": "<p>Ticket not provided</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "InvalidTicketError",            "description": "<p>Ticket is invalid</p>"          }        ]      },      "examples": [        {          "title": "TicketNotProvidedError:",          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"success\": false,\n  \"error\": \"Ticket not provided\"\n}",          "type": "json"        },        {          "title": "InvalidTicketError:",          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"success\": false,\n  \"error\": \"Invalid ticket\",\n  \"steamError\": {}\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/api/profile",    "title": "Request User information",    "name": "GetProfile",    "version": "0.1.0",    "group": "Profile",    "permission": [      {        "name": "Authorized users only"      }    ],    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>Server-signed authentication token</p>"          }        ]      },      "examples": [        {          "title": "Header-Example:",          "content": "{\n  \"Authorization\": \"Bearer xxx.zzz.yyy\"\n}",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Successful execution of the request</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "data",            "description": "<p>User information</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "data.id",            "description": "<p>Unique user ID</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "data.steamId",            "description": "<p>ID in the Steam system</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "data.level",            "description": "<p>Current level</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "data.money",            "description": "<p>Amount of game currency</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "data.rank",            "description": "<p>Current rank</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "data.xp",            "description": "<p>Amount of experience</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "data.availableNewLootboxes",            "description": "<p>Amount of available lootboxes</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\": {\n     \"id\": \"93df2547-e8b8-46fa-83ef-51dd799f87e5\",\n     \"steamId\": 12345678901234567,\n     \"level\": 0,\n     \"money\": 0,\n     \"rank\": 0,\n     \"xp\": 0,\n     \"availableNewLootboxes\": 0\n  }\n}",          "type": "json"        }      ]    },    "filename": "./src/api/controllers/profile.js",    "groupTitle": "Profile",    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "TokenNotProvidedError",            "description": "<p>Authorization token not provided (Missing Authorization header)</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "InvalidToken",            "description": "<p>The authorization token is not a token signed by a server</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "TokenExpiredError",            "description": "<p>Authorization token has expired</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "UserNotFoundError",            "description": "<p>User with id from token not found</p>"          }        ]      },      "examples": [        {          "title": "TokenNotProvidedError:",          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"success\": false,\n  \"error\": \"Token not provided\"\n}",          "type": "json"        },        {          "title": "Error-Response:",          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"success\": false,\n  \"error\": \"Invalid Token\"\n}",          "type": "json"        },        {          "title": "TokenExpiredError:",          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"success\": false,\n  \"error\": \"Token expired\"\n}",          "type": "json"        },        {          "title": "UserNotFoundError:",          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\": false,\n  \"error\": \"User with id 93df2547-e8b8-46fa-83ef-51dd799f87e5 not found\"\n}",          "type": "json"        }      ]    }  }] });
