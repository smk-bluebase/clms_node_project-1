var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/pay_roll_generation',(req, res)=>{
	var user_Id = req.session.userId, user_name = req.session.user_name;
	if(user_Id == null)
  {
	  message = 'Wrong Credentials.';
	  res.render('login.ejs',{message: message});
	  return;
  }
  else{
    dboperations.getpayrollValues().then(result =>{                
    var pay_roll_gen = result[0];
    res.render('pay_roll/pay_roll_generation',{user_Id:user_Id,user_name:user_name,pay_roll_gen});
    }) 
  }
});



module.exports = { payroll:router}