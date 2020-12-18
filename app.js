const express =require("express");
const bodyParser = require("body-parser");
const request =require("request");
const https = require("https");

const app =express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  //console.log(req);
  res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req,res){

// variable del HTML
  var firstname=req.body.fname;
  var lastname=req.body.lname;
  var email=req.body.email;

  console.log(firstname,lastname,email);

  // configurando API con campos que usaremos
  var data = {
    members:[
      {
          email_address: email,
          status:"subscribed",
          merge_fields:{
            FNAME: firstname,
            LNAME: lastname
          },
      }
    ]
  };

  var jsonData = JSON.stringify(data);
  var url = "https://us4.api.mailchimp.com/3.0/lists/dd257e1ddc";
  var options={
      method: "POST",
      auth: "DSC:3d6806a837b6fac49cc1a765c9e69c6f-us4",
      body: jsonData
  }

  var request = https.request(url, options,function(response){

    if (response.statusCode === 200){
      console.log(response.statusCode);
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

//redireccciona a home page
app.post("/failure",function(req,res){
  res.redirect("/");
});

app.post("/home",function(req,res){
  res.redirect("/");
});


//llamado del server
app.listen(process.env.PORT || 3001, function(){
  console.log("Server started on port 3000");
});
