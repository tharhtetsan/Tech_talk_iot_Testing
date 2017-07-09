//This is still work in progress
/*
Please report any bugs to nicomwaks@gmail.com
i have added console.log on line 48
 */
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const mysql = require('mysql');
const app = express();
var con = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12184383",
  password: "Pqay5FrA7Z",
	database:"sql12184383"
});
var test=0;
/*
const options = {
    key: fs.readFileSync(__dirname + '/server.key'),
    cert:  fs.readFileSync(__dirname + '/server.crt')
}
*/
app.set('port', (process.env.PORT || 5000))

// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))


// index


// to post data

app.get('/addmenu/', function (req, res) {
   menuButton(main_action);
   res.send("configured");
res.sendStatus(200);
})

app.post('/webhook/', function (req, res) {
 var data = req.body;
 if (data.object == 'page')
 {



var messaging_events=req.body.entry[0].messaging;

if(typeof messaging_events !== "undefined")
{

  if(typeof messaging_events.length !== "undefined")
  {

	for(var i=0;i<messaging_events.length;i++)
  {
      var event =messaging_events[i]
		var sender = event.sender.id
	   if (event.message && event.message.text) {
			var text = event.message.text

      con.query("SELECT conv_staus.stauts FROM conv_staus where id='"+sender+"';", function (err, rows) {

      if (err) {	console.log('Error sending messages: ', err);throw err;}
      if (rows.length)
      {
          var st=rows[0].stauts;
          if(st==='1')
          {
              var sql = "Update lot_light set stauts='"+text+"' where id='"+sender+"';";
              con.query(sql, function (err, rows) {
                if (err) {	console.log('Error sending messages: ', err);throw err;}
                sendTextMessage(sender,"Now, Ligth is "+text,token);
              });

          }
        }
        });


    }




	//	}
		if (event.postback) {
			//let text = JSON.stringify(event.postback)
			var text=event.postback.payload;
      //insert into conv values(now(),'22',"abcde")
      //select message from conv where conversationtim in (select MAX(conversationtim) from conv where id='22') and id='22';
					console.log(text);
					 if(text==='payload_lighton')
					{
            con.query("SELECT lot_light.stauts FROM lot_light where id='"+sender+"';", function (err, rows) {

            if (err) {	console.log('Error sending messages: ', err);throw err;}
            if (rows.length)
            {
              var sql = "Update lot_light set stauts='1' where id='"+sender+"';";

              con.query(sql, function (err, rows) {
                if (err) {	console.log('Error sending messages: ', err);throw err;}
                  sendTextMessage(sender,  'Light is On', token);

              });

            }
            else {
                var txt= "Your id "+sender+" is not registered.";
              sendTextMessage(sender,  txt, token)
            }
          });



					}
					else if(text==='payload_lightoff')
					{
            con.query("SELECT lot_light.stauts FROM lot_light where id='"+sender+"';", function (err, rows) {

            if (err) {	console.log('Error sending messages: ', err);throw err;}
            if (rows.length)
            {
              var sql = "Update lot_light set stauts='0' where id='"+sender+"';";

              con.query(sql, function (err, rows) {
                if (err) {	console.log('Error sending messages: ', err);throw err;}
                  sendTextMessage(sender,  'Light is Off', token);

              });

            }
            else {
                var txt= "Your id "+sender+" is not registered.";
              sendTextMessage(sender,  txt, token)
            }
          });


					}
          else if(text==='payload_variable_value')
          {
            con.query("SELECT conv_staus.stauts FROM conv_staus where id='"+sender+"';", function (err, rows) {

            if (err) {	console.log('Error sending messages: ', err);throw err;}
            if (rows.length)
            {

              var sql = "Update conv_staus set stauts='1' where id='"+sender+"';";

              con.query(sql, function (err, rows) {
                if (err) {	console.log('Error sending messages: ', err);throw err;}
                  sendTextMessage(sender,  'Now, Your can send varaible input text.', token);

              });

            }
            else {
                var txt= "Your id "+sender+" is not registered.";
              sendTextMessage(sender,  txt, token)
            }
          });
          }
          else if(text==='payload_variable_value_diable')
          {
            con.query("SELECT conv_staus.stauts FROM conv_staus where id='"+sender+"';", function (err, rows) {

            if (err) {	console.log('Error sending messages: ', err);throw err;}
            if (rows.length)
            {

              var sql = "Update conv_staus set stauts='0' where id='"+sender+"';";

              con.query(sql, function (err, rows) {
                if (err) {	console.log('Error sending messages: ', err);throw err;}
                  sendTextMessage(sender,  'Now, The system closes sending varaible input text.', token);

              });

            }
            else {
                var txt= "Your id "+sender+" is not registered.";
              sendTextMessage(sender,  txt, token)
            }
          });
          }

					else if(text==='payload_lightstatus')
					{

							con.query("SELECT lot_light.stauts FROM lot_light where id='"+sender+"';", function (err, rows) {
							let mes="Now, Light is";
							if (err) {	console.log('Error sending messages: ', err);throw err;}
							if(rows[0].stauts==='1')
							{
								mes=mes+" On";
							}
              else if(rows[0].stauts==='0')
             {
								mes=mes+" Off";
							}
              else {
                mes=mes+" "+rows[0].stauts;
              }
							sendTextMessage(sender,  mes, token)
						});
					}
          else if(text==='payload_Register')
          {
            con.query("SELECT lot_light.stauts FROM lot_light where id='"+sender+"';", function (err, rows) {

            if (err) {	console.log('Error sending messages: ', err);throw err;}
            if (!rows.length)
            {
              var sql = "Insert into lot_light(id,stauts) values ('"+sender+"','0');";

              con.query(sql, function (err, rows) {
                if (err) {	console.log('Error sending messages: ', err);throw err;}

                var sql = "Insert into conv_staus(id) values ('"+sender+"');";
                con.query(sql, function (err, rows) {
                  if (err) {	console.log('Error sending messages: ', err);throw err;}
                    var txt= "Your id "+sender+" is registered.";
                      sendTextMessage(sender, txt,token);
                  });
                });

            }
            else {
                var txt= "Your id "+sender+" is already registered.";
              sendTextMessage(sender,  txt, token)
            }
          });
          }
          else if(text==='payload_iotlink')
          {

            var txt="The download link is -> goldenhussargroup.herokuapp.com/lot/"+sender+"\n";
              txt+="The Upload link is -> goldenhussargroup.herokuapp.com/send/"+sender+"/{send_value}\n";
              console.log(txt);
              sendTextMessage(sender,txt , token);
          }
          else if(text==='payload_Register_receive')
          {

          }


		}
	}}}}
	res.sendStatus(200)
})


// recommended to inject access tokens as environmental variables, e.g.
// const token = process.env.FB_PAGE_ACCESS_TOKEN
const token = "EAAbY0jKdIgEBAIk8Qlcluw0MHZA5q4cske2imq5fnUXz6lza2IBR2sj5HMGhDbZAQtRvmA3hvLRfDNzIwk3IhZCQNOgQu2igcAMCYy24aisxBdvqJXbwdRpYT1XaiaUajJbtjuxfPqjyhV08YyBopupUDF5lAd7pNZA0t0b9VQZDZD"

function sendTextMessage(sender, text) {
	var messageData = { text:text }

	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', err)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}
app.get('/lot/:id', function (req, res)
{
  var pram=req.params.id;
	con.query("SELECT stauts FROM lot_light where id='"+pram+"';", function (err, rows) {
		if (err) {	console.log('Error sending messages: ', err);throw err;}
		res.setHeader('Content-Type', 'application/json');
    if(rows.length>0)
	     {res.send(JSON.stringify({ status: rows[0].stauts }));}
     else {
         res.send(JSON.stringify({ status: "ID not Found"}));
     }
	});



})

	var bank_account_action=[

          {
				"type":"postback",
				"title":"Light On",
				"payload":"payload_lighton"
			},
			{
				"type":"postback",
				"title":"Light Off",
				"payload":"payload_lightoff"
			},
			{
				"type":"postback",
				"title":"Light Status",
				"payload":"payload_lightstatus"
			},

			{
				"type":"postback",
				"title":"Register",
				"payload":"payload_Register"
			},

			{
				"type":"postback",
				"title":"Show IOT Link",
				"payload":"payload_iotlink"
			}
		]
var main_action=[
    {
      "locale":"default",
      "composer_input_disabled":false,
      "call_to_actions":[
        {
              "type":"postback",
              "title":"Enable Send Variable Value",
              "payload":"payload_variable_value"
            },
            {
                  "type":"postback",
                  "title":"Disable Send Variable Value",
                  "payload":"payload_variable_value_diable"
            },
        {
          "title":"Room Control",
          "type":"nested",
          "call_to_actions":bank_account_action
        }

      ]
    },
    {
      "locale":"zh_CN",
      "composer_input_disabled":false
    }
    ]

function delete_action()
{

	var   call_to_actions ={
  "fields":[
    "persistent_menu"
  ]
}
request({
	url: 'https://graph.facebook.com/v2.6/me/messenger_profile',
	qs: {access_token:token},
	method: 'DELETE',
	json: call_to_actions,
}, function(error, response, body) {
	if (!error && response.statusCode == 200) {
	var recipientId = body.recipient_id;
	var messageId = body.message_id;

}
	else if (error) {
		console.log('Error sending messages: ', error)
	} else if (response.body.error) {
		console.log('Error: ', response.body.error)
	}
})

}


function menuButton(action)  {
	var   call_to_actions ={"persistent_menu":action}

	request({
		url: 'https://graph.facebook.com/v2.6/me/messenger_profile',
		qs: {access_token:token},
		method: 'POST',
		json: call_to_actions,
	}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
    var recipientId = body.recipient_id;
    var messageId = body.message_id;


  }
		else if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})

}

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
app.get('/', function (req, res) {
	res.send('hello world i am a secret bot')
})

// for facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'flamelion') {
		{
      res.send(req.query['hub.challenge'])
  }
	} else {
		res.send('Error, wrong token')
	}

})





app.get('/send/:id/:vl', function (req, res)
{
  var pram=req.params.id;
  var vl=req.params.vl;
  con.query("SELECT stauts FROM lot_light where id='"+pram+"';", function (err, rows) {
    if (err) {	console.log('Error sending messages: ', err);throw err;}
    res.setHeader('Content-Type', 'application/json');
    if(rows.length>0)
       {
               sendTextMessage(pram, vl,token);
         res.send(JSON.stringify({ status:"Success"}));
       }
     else {
         res.send(JSON.stringify({ status: "ID not Found"}));
     }
  });
})
app.get('/deletemenu/', function (req, res)
{
	delete_action();
res.send('success');
	res.sendStatus(200);
})
/*

spdy
  .createServer(options, app)
  .listen(app.get('port'), (error) => {
    if (error) {
      console.error(error)
      return process.exit(1)
    } else {
      console.log('Listening on port: ' + port + '.')
    }
  })*/
