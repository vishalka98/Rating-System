const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
// const _ = require("lodash");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

mongoose.connect("mongodb+srv://admin-vishal:admin123@cluster0.gcvvu.mongodb.net/ratingDB",{useNewUrlParser:true});
//mongoose.connect("mongodb://localhost:27017/ratingDB",{useNewUrlParser:true});

var AggRating;

const ratingSchema = {
    username: {
        type: String,
        required: true,
       unique: true
    },
    
    // rideID:  {
    //     type: [{
    //         type: String
    //     }],
    //     required: true,
    //     unique: true
    // },

    ratingCount:  {
        type: Number,
        required: true,
    },
    // averageRating: {
    //     type: Number,
    //     required: true,
    //     default: 0
    // },
    totalRating: {
        type: Number,
        required: true,
    }
      
}

const driverRating = mongoose.model("driverRating", ratingSchema);


const customerRating = mongoose.model("customerRating", ratingSchema);


app.get("/",function(req, res){
            res.render('rating');
});


app.get("/AggregatedRating",function(req, res){
   
        //  console.log(cumurating);
         res.render('getAggregateRating', {Aggrating: AggRating});    
});


app.post("/",function(req, res){
    console.log(req.body);
    var ratingValue = req.body.rating;
    var userName = req.body.userName;
    var rideid  = req.body.rideid;
    var ratedBy = req.body.ratedBy;
    // console.log("bjhbjbnmhm"+ratedBy);
    if(Number(ratedBy)===0){
        driverRating.findOne({username:userName},function(err,result){
            if(err){
                console.log("Error in finding")
            }
            else{
                if(result===null){
                    console.log("bjhbjbnmhm"+ratedBy);
                    const rating1 = new driverRating({
                        username:userName,
                    
                        ratingCount: 1,
                        totalRating: ratingValue
                    });
                    rating1.save();
                }
                else{
                    let var1 = Number(result.ratingCount)+1;
                    let var2 = result.totalRating + Number(ratingValue);
                    driverRating.updateOne({username:userName},{ ratingCount: var1, totalRating: var2},function(err){
                        if(!err){
                            console.log("Data updated successfully");
                        }
                        else{
                            console.log("error");
                        }
                    })
                }
            }
           
        });
        
    }
    else{
        customerRating.findOne({username:userName},function(err,result){
            // console.log(result);
            if(err){
                console.log("Error in finding")
            }
            else{
                if(result===null){
                    const rating1 = new customerRating({
                        username:userName,
                        ratingCount: 1,
                        totalRating: ratingValue
                    });
                    rating1.save();
                }
                else{
                    
                    var var1 = Number(result.ratingCount)+1;
                    var var2 =  result.totalRating + Number(ratingValue);
                    customerRating.updateOne({username:userName},{ ratingCount: var1, totalRating: var2},function(err){
                        if(!err){
                            console.log("Data updated successfully");
                        }
                        else{
                            console.log("errorbb");
                        }
                    })
                }
            }
          
        });
    }
   res.redirect("/");   
});

app.post("/AggregateRating",function(req, res){
    var userName = req.body.username;
    var ratingof = req.body.ratingOf;
    

    if(Number(ratingof)===0){
        driverRating.find({username:userName},function(err,result){
            if(err){
                console.log("Error")
            }
            else{
                if(result===null){
                    AggRating = "rating not available"
                }
                else{
                    var sum =  result[0].totalRating;
                    var count = result[0].ratingCount;
                    console.log(count);
                    console.log(sum);
                    AggRating = (sum/count).toFixed(2);
                    console.log(AggRating+sum+count);
                }
                res.redirect("/AggregatedRating");
            } 
        });
    }
    else{
        customerRating.find({username:userName},function(err,result){
            if(err){
                console.log("Error")
            }
            else{
                console.log(result);
                if(result===null){
                    AggRating = "rating not available"
                }
                else{
                    console.log("gvfdvfd"+result);
                var sum =  result[0].totalRating;
                var count = result[0].ratingCount;
                console.log(result);

              
                AggRating = (sum/count).toFixed(2);

                console.log(AggRating);
                }

                res.redirect("/AggregatedRating");
            }   
            
        });  
    }
  
});

app.listen(process.env.PORT || 3000,function(){
    console.log("server is running at port 3000")
});