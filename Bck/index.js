const express = require('express');

const path = require('path');
let port = 1000;
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var moment = require('moment');
app.locals.moment = moment; 
//const expressLayouts = require('express-ejs-layouts');
//parse application/x-www-form-urlencoded
//parse application/json
//app.use(expressLayouts);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

//Session
const { Cookie } = require('express-session');
const session = require('express-session');
app.use(session({
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:true,
  Cookie:{maxAge: 10000000}
}))

app.get('/', (req,res)=>{

  if(req.session.userId){
    res.render('/home');    
  }
  else
  {
    var message = '';
    res.render('login',{message:message});
  }  
})

const user = require('./routes/login_check');
app.post('/login_val',user.login_check);
app.get('/home',user.main_page);


//excel template download code start here by JAI

app.get('/gate_master_excell_download', function(req, res){
  const file = `${__dirname}/excel_templates/cpcl_gate_master.csv`;
  res.download(file); 
});

app.get('/engineer_master_excell_download', function(req, res){
  const file = `${__dirname}/excel_templates/cpcl_engineer_master.csv`;
  res.download(file); 
});

app.get('/shift_master_excell_download', function(req, res){
  const file = `${__dirname}/excel_templates/cpcl_shift_master.csv`;
  res.download(file); 
});

app.get('/contractor_master_excell_download', function(req, res){
  const file = `${__dirname}/excel_templates/cpcl_contractor_master.csv`;
  res.download(file); 
});

app.get('/contractor_mail_excell_download', function(req, res){
  const file = `${__dirname}/excel_templates/cpcl_contractor_email.csv`;
  res.download(file); 
});

app.get('/workorder_excell_download', function(req, res){
  const file = `${__dirname}/excel_templates/cpcl_work_order_master.csv`;
  res.download(file); 
});

app.get('/employee_excell_download', function(req, res){
  const file = `${__dirname}/excel_templates/cpcl_employee_master.csv`;
  res.download(file); 
});

app.get('/Employee_Daily_Attendance', function(req, res){
  const file = `${__dirname}/excel_templates/Employee_Daily_Attendance.csv`;
  res.download(file); 
});

//Import Routes
//const homeRoutes = require('./routes/home-routes');
//MASTERS
const engRoutes = require('./routes/cpcl_masters/eng_routes');
const shiftRoutes = require('./routes/cpcl_masters/shift_routes');
const gateRoutes = require('./routes/cpcl_masters/gate_routes');


//CONTRACTOR MASTERS
const contracorRoutes = require('./routes/contractor/contractor_routes');
const contracorMailRoutes = require('./routes/contractor/contractor_mail_master');
const workorderRoutes = require('./routes/contractor/work_order_master_route');
const employeeRoutes = require('./routes/contractor/employee_master_route');
const transferRoutes = require('./routes/contractor/transfer_route');
const changereqRoutes = require('./routes/contractor/change_request_route');

//ADMIN
const adminRoutes = require('./routes/admin/register_routes');
//PAYROLL

//const payrollgeneration = require('./routes/payroll/pay_roll_gen_routes');

const payrollgenerationnew = require('./routes/payroll/pay_roll_gen_new_routes');
const wageslip = require('./routes/payroll/wage_slip_routes');
const formbwageregister = require('./routes/payroll/form_b_wage_routes');
const workorderbilling = require('./routes/payroll/work_order_bill_routes');
const formdattendance = require('./routes/payroll/form_d_attendance_routes');
const attendancereport = require('./routes/payroll/attendance_report_routes');
const mailreport = require('./routes/payroll/mail_report_routes');
const deductionroutes = require('./routes/payroll/deduction_routes');
const payrollcloseroutes = require('./routes/payroll/payroll_close_routes');
//ATTENDANCE
const attendanceroutes = require('./routes/attendance/attendance_routes');
const attendanceinoutroutes = require('./routes/attendance/attendanceInOut_routes');
const attendanceeditroutes = require('./routes/attendance/attendanceEdit_routes');
const attendanceinoutmailroutes = require('./routes/attendance/attendance_in_out_mail_routes');
//PASS REQUEST
const passrequestoneRoutes = require('./routes/passrequest/pass1_routes');
const passrequesttwoRoutes = require('./routes/passrequest/pass2_routes');
const passrequestthreeRoutes = require('./routes/passrequest/pass3_routes');
const printpassRoutes = require('./routes/passrequest/print_pass_routes');
//REPORTS
const contmasterreportroutes = require('./routes/reports/contractor_master_reports_routes');
const empreportsroutes = require('./routes/reports/employee_reports_routes');
const inoutroutes = require('./routes/reports/in_out_report_routes');
const workorderreportsroutes = require('./routes/reports/work_order_reports_routes');
const eicreportsroutes = require('./routes/reports/eic_reports_routes');

//ROLE

const roleroutes = require('./routes/role/role_routes');

//Use Routes
//app.use(homeRoutes.routes);
//MASTERS
app.use(engRoutes.engineer);
app.use(shiftRoutes.shift);
app.use(gateRoutes.gate);
//CONTRACTOR MASTERS
app.use(contracorRoutes.contractor);
app.use(contracorMailRoutes.contractorMail);
app.use(workorderRoutes.routes);
app.use(employeeRoutes.employee);
app.use(transferRoutes.transfer);
app.use(changereqRoutes.changereq);
//ADMIN
app.use(adminRoutes.routes);
//PAY ROLL GENERATION
//app.use(payrollgeneration.payroll);
app.use(payrollgenerationnew.payrollnew);
app.use(wageslip.wageslip);
app.use(formbwageregister.formbwage);
app.use(workorderbilling.workOrderBill);
app.use(formdattendance.formDAttendance);
app.use(attendancereport.attendanceReport);
app.use(mailreport.mailReport);
app.use(deductionroutes.deduction);
app.use(payrollcloseroutes.payRollClose);
//ATTENDANCE
app.use(attendanceroutes.attendance);
app.use(attendanceinoutroutes.attendanceinout);
app.use(attendanceeditroutes.attendanceedit);
app.use(attendanceinoutmailroutes.attendanceinoutmail);
//PASS REQUEST
app.use(passrequestoneRoutes.passrequestone);
app.use(passrequesttwoRoutes.passrequesttwo);
app.use(passrequestthreeRoutes.passrequestthree);
app.use(printpassRoutes.printpass);
//REPORTS
app.use(contmasterreportroutes.contMasterReports);
app.use(empreportsroutes.empReports);
app.use(inoutroutes.inOutReports);
app.use(workorderreportsroutes.workOrderReports);
app.use(eicreportsroutes.eicReports);

app.use(roleroutes.role);

var config  = require('./database/dbconfig');
var sql  = require('mssql');
//For csv Uploads
 const fs = require('fs');
const csv = require('fast-csv');
const multer = require('multer');

global.__basedir = __dirname;
// -> Multer Upload Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, __basedir + '/uploads/')
    },
    filename: (req, file, cb) => {
       cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
  });


const upload = multer({storage: storage});

//Gate
// -> Express Upload RestAPIs
app.post('/excel_upload/gate_data', upload.single("csvdata"), (req, res) =>{
    importCsvData2MySQL(__basedir + '/uploads/' + req.file.filename);
    res.json({
          'msg': 'File uploaded/import successfully!', 'file': req.file
        });
 

    function importCsvData2MySQL(filePath){
    let stream = fs.createReadStream(filePath);
    let csvData = [];
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", function () {
            // Remove Header ROW
            csvData.shift();
    // connect to your database
         
    var pool = sql.connect(config, function (err) {
      if (err) throw err;
        console.log("Connected!");

        //console.log(csvData);
        for(i=0;i<csvData.length;i++){
        for(j=0;j<csvData.length;j++){
        //console.log(csvData[j][i]);
        var data = csvData[i][0];
        var data2 = csvData[i][1];
        //var data2 = csvData[1][j];
        //var data2 = csvData[i][1];
        //console.log(data);
        //console.log(data2);     
        }
        var sql = "INSERT INTO cpcl_gate_master (name, status) VALUES ('"+data+"','"+data2+"')";
       
        pool.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);   }); 
        }       
    });
           
      fs.unlinkSync(filePath)
    });

stream.pipe(csvStream);
}
});

//Attendance In-Out
app.post('/excel_upload/attendance_in_out', upload.single("csvdata"), (req, res) =>{
  importCsvData2MySQL(__basedir + '/uploads/' + req.file.filename);
  res.json({
        'msg': 'File uploaded/import successfully!', 'file': req.file
      });


  function importCsvData2MySQL(filePath){
  let stream = fs.createReadStream(filePath);
  let csvData = [];
  let csvStream = csv
      .parse()
      .on("data", function (data) {
          csvData.push(data);
      })
      .on("end", function () {
          // Remove Header ROW
          csvData.shift();
  // connect to your database
       
  var pool = sql.connect(config, function (err) {
    if (err) throw err;
      //.log("Connected!");

      //console.log(csvData);
      for(i=0;i<csvData.length;i++){
      for(j=0;j<csvData.length;j++){
      //console.log(csvData[i][j]);
      var ccode       = csvData[i][0];
      var cname       = csvData[i][1];
      var empcode     = csvData[i][2];
      var idcardno    = csvData[i][3];
      var empname       = csvData[i][4];
      var shiftdate       = csvData[i][5];
      var shift       = csvData[i][6];
      var indata       = csvData[i][7];
      var outdata       = csvData[i][8];
      var gate      = csvData[i][9];
      var ponum       = csvData[i][10];
      var status       = csvData[i][11];  
      }
      var sql = `INSERT INTO Employee_Daily_Attendance (CCODE,CNAME,EMPCODE,IDCARDNO,Employee_Name,Shift_date,Shift,[IN],Out,Gate,PO_NUM,Status) 
      VALUES ('${ccode}','${cname}','${empcode}','${idcardno}','${empname}','${shiftdate}','${shift}','${indata}','${outdata}','${gate}',
      '${ponum}','${status}')`;
     
      pool.query(sql, function (err, result) {
        if (err) throw err;
        //console.log("Number of records inserted: " + result.affectedRows);   
      });   
      }       
  });
         
    fs.unlinkSync(filePath)
  });

stream.pipe(csvStream);
}
});

//Contractor
app.post('/excel_upload/Contractor_csv', upload.single("csvdata"), (req, res) =>{
  importCsvData2MySQL(__basedir + '/uploads/' + req.file.filename);
  res.json({
        'msg': 'File uploaded/import successfully!', 'file': req.file
      });


  function importCsvData2MySQL(filePath){
  let stream = fs.createReadStream(filePath);
  let csvData = [];
  let csvStream = csv
      .parse()
      .on("data", function (data) {
          csvData.push(data);
      })
      .on("end", function () {
          // Remove Header ROW
          csvData.shift();
  // connect to your database
       
  var pool = sql.connect(config, function (err) {
    if (err) throw err;
      console.log("Connected!");

    //console.log(csvData);
     for(i=0;i<csvData.length;i++){
      for(j=0;j<csvData.length;j++){
      //console.log(csvData[i][j]);

      var contractor_code       = csvData[i][0];
      var contractor_name       = csvData[i][1];
      var address               = csvData[i][2];
      var prefix_code           = csvData[i][3];
      var proprietor            = csvData[i][4];
      var owner                 = csvData[i][5];
      var md                    = csvData[i][6];
      var partner               = csvData[i][7];
      var contractor_mail       = csvData[i][8];
      var ESI_Code_No           = csvData[i][9];
      var PF_Code_No            = csvData[i][10];
      var Contractor_PAN_No     = csvData[i][11];
      var Contractor_LIN        = csvData[i][12];  
      var Mobile_No             = csvData[i][13];  
      var Name_of_person        = csvData[i][14];  
      var compliance_Mail_id    = csvData[i][15];
      var hr_department         = csvData[i][16];    
      var status                = csvData[i][17];
      //var created_by            = csvData[i][18];
      //var created_on            = csvData[i][19];
      //var modified_by           = csvData[i][20];
      //var modified_on           = csvData[i][21];
      var user_name             = csvData[i][18];
      var password              = csvData[i][19];
      }
      var sql = `INSERT INTO cpcl_contractor_master (contractor_code,contractor_name,address,prefix_code,proprietor,owner,md,partner,
      contractor_mail,ESI_Code_No,PF_Code_No,Contractor_PAN_No,Contractor_LIN,Mobile_No,Name_of_person,compliance_Mail_id,hr_department,
      status,created_by,created_on,user_name,password) 
      VALUES ('${contractor_code}','${contractor_name}','${address}','${prefix_code}','${proprietor}','${owner}','${md}','${partner}',
      '${contractor_mail}','${ESI_Code_No}','${PF_Code_No}','${Contractor_PAN_No}','${Contractor_LIN}','${Mobile_No}','${Name_of_person}',
      '${compliance_Mail_id}','${hr_department}','${status}','1',GETDATE(),'${user_name}',
      '${password}')`;
     
      pool.query(sql, function (err, result) {
        if (err) throw err;
        //console.log("Number of records inserted: " + result.affectedRows);   
      });   
      }        
  });
         
    fs.unlinkSync(filePath)
  });

stream.pipe(csvStream);
}
});

//Work Order
app.post('/uploads/work_order_csv', upload.single("csvdata"), (req, res) =>{
  importCsvData2MySQL(__basedir + '/uploads/' + req.file.filename);
  res.json({
        'msg': 'File uploaded/import successfully!', 'file': req.file
      });


  function importCsvData2MySQL(filePath){
  let stream = fs.createReadStream(filePath);
  let csvData = [];
  let csvStream = csv
      .parse()
      .on("data", function (data) {
          csvData.push(data);
      })
      .on("end", function () {
          // Remove Header ROW
          csvData.shift();
  // connect to your database
       
  var pool = sql.connect(config, function (err) {
    if (err) throw err;
      console.log("Connected!");

    //console.log(csvData);
    for(i=0;i<csvData.length;i++){
      for(j=0;j<csvData.length;j++){
      //console.log(csvData[i][j]);

      var CCODE                  = csvData[i][0];
      var CNAME                  = csvData[i][1];
      var VENDOR_NO              = csvData[i][2];
      var WORK_ORDER             = csvData[i][3];
      var WORK_FROM_DATE         = csvData[i][4];
      var WORK_TO_DATE           = csvData[i][5];
      //var SAP_WO_NO              = csvData[i][6];
      var CVALUE                 = csvData[i][6];
      var DURATION               = csvData[i][7];
      var CDURATION              = csvData[i][8];
      var EIC_PRNO               = csvData[i][9];
      var EIC                    = csvData[i][10];
      var JOB_DESC               = csvData[i][11];
      var DEPARTMENT             = csvData[i][12];
      var EMPLOYEE_COUNT         = csvData[i][13];  
      var CLRA                   = csvData[i][14];  
      var ISMW                   = csvData[i][15];  
      var WORKMEN_TOT            = csvData[i][16];
      var EXCESS_CLRA_COUNT      = csvData[i][17];    
      var EXCESS_CLRA_CONT_COUNT = csvData[i][18];
      var STATUS                 = csvData[i][19];
      //var CREATED_BY      = csvData[i][19];
     // var CREATED_ON      = csvData[i][20];
      }

      var date = new Date();
      var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
    .toISOString()
    .split("T")[0];
      /*var sql = `INSERT INTO cpcl_work_order_master (CCODE,CNAME,VENDOR_NO,WORK_ORDER,WO_TO_DATE,CVALUE,DURATION,CDURATION,
        EIC_PRNO,EIC,JOB_DESC,DEPARTMENT,EMPLOYEE_COUNT,CLRA,ISMW,WORKMEN_TOT,EXCESS_CLRA_COUNT,
        EXCESS_CLRA_CONT_COUNT,STATUS,CREATED_BY,CREATED_ON) 
      VALUES ('${CCODE}','${CNAME}','${VENDOR_NO}','${WORK_ORDER}','${WORK_OR_DATE}','${CVALUE}','${DURATION}','${CDURATION}',
      '${EIC_PRNO}','${EIC}','${JOB_DESC}','${DEPARTMENT}','${EMPLOYEE_COUNT}','${CLRA}','${ISMW}',
      '${WORKMEN_TOT}','${EXCESS_CLRA_COUNT}','${EXCESS_CLRA_CONT_COUNT}','${STATUS}','1',GETDATE())`;
       */
    
      var sql = `exec workorder_excel_dup '${CCODE}','${CNAME}','${VENDOR_NO}','${WORK_ORDER}','${WORK_FROM_DATE}','${WORK_TO_DATE}','${CVALUE}','${DURATION}','${CDURATION}',
      '${EIC_PRNO}','${EIC}','${JOB_DESC}','${DEPARTMENT}','${EMPLOYEE_COUNT}','${CLRA}','${ISMW}',
      '${WORKMEN_TOT}','${EXCESS_CLRA_COUNT}','${EXCESS_CLRA_CONT_COUNT}','${STATUS}','1','${dateString}'`;

      pool.query(sql, function (err, result) {
        if (err) throw err;
        //console.log("Number of records inserted: " + result.affectedRows);   
      });   
      }     
  });
         
    fs.unlinkSync(filePath)
  });

stream.pipe(csvStream);
}
});

//Employee
app.post('/uploads/employee_csv', upload.single("csvdata"), (req, res) => {
  var dupArr = []
  importCsvData2MySQL(__basedir + '/uploads/' + req.file.filename);
  /* res.json({
    'msg': 'File uploaded/import successfully!', 'file': req.file
  });  */


  function importCsvData2MySQL(filePath) {
    let stream = fs.createReadStream(filePath);
    let csvData = [];
    let csvStream = csv
      .parse()
      .on("data", function (data) {
        csvData.push(data);
      })
      .on("end", function () {
        // Remove Header ROW
        csvData.shift();
        // connect to your database

        var pool = sql.connect(config, function (err) {
          if (err) throw err;
          console.log("Connected!");
          //console.log(csvData);
          var global = [];
          for (i = 0; i < csvData.length; i++) 
          {
            ///console.log(csvData[i].length);
            for (j = 0; j <= csvData[i].length; j++) 
            {
              //console.log(csvData[i][j]);

              var CCODE      = csvData[i][0];
              var ENAME      = csvData[i][1];
              var WORK_ORDER_No   = csvData[i][2];
              var WORK_OR_DATE      = csvData[i][3];
              var NEW_CODE      = csvData[i][4];
              var PRE_CODE      = csvData[i][5];
              var ECODE      = csvData[i][6];
              var WO_FROM      = csvData[i][7];
              var WO_TO      = csvData[i][8];
              var CI_NAME      = csvData[i][9];
              var FATHER      = csvData[i][10];
              var HUSBAND      = csvData[i][11];
              var DESIGNATION      = csvData[i][12];  
              var DOB      = csvData[i][13];  
              var ENGAGED_DATE      = csvData[i][14];  
              var GENDER      = csvData[i][15];
              //console.log(GENDER);
              if(GENDER=='MALE'){
                var GENDER_VAL    = 'MALE';
              }else if(GENDER=='FEMALE') {
                var GENDER_VAL     = 'FEMALE';
              }
              var MARITAL_STATUS      = csvData[i][16];
              if(MARITAL_STATUS=='MARRIED'){
                var MARITAL_STATUS_VAL      ='MARRIED';

              }else if(MARITAL_STATUS=='UNMARRIED'){
                var MARITAL_STATUS_VAL      ='UNMARRIED';
              }    
              var PRE_ADDRESS      = csvData[i][17];
              var PERMANENT_ADDRESS      = csvData[i][18];
              var PHONE_NO      = csvData[i][19];
              var EMAIL_ID      = csvData[i][20];
              var EMERGENCY_PERSON      = csvData[i][21];
              var MOBILE_NO      = csvData[i][22];
              var NOMINEE_NAME      = csvData[i][23];
              var NOMINEE_RELATION      = csvData[i][24];
              var NOMINEE_DOB      = csvData[i][25];
              var Catogery      = csvData[i][26];
              var WAGE      = csvData[i][27];
              var INCENTIVE      = csvData[i][28];
              var ALLOWANCE      = csvData[i][29];
              var OTHERS      = csvData[i][30];
              var UAN      = csvData[i][31];
              var ESI      = csvData[i][32];
              var AADHAR      = csvData[i][33];
              var IDENTY_MARK      = csvData[i][34];
              var BANK_NAME      = csvData[i][35];
              var ACCOUNT_NO      = csvData[i][36];
              var ifsc_code      = csvData[i][37];
              var BLOOD_GROUP      = csvData[i][38];
              var ENTRY_GATE      = csvData[i][39];
              var WROK_SPOT      = csvData[i][40];
              var AREA_OF_WORK      = csvData[i][41];
              var area_of_place      = csvData[i][42];
              
              if(area_of_place=='PLANT'){
                var area_of_place_val      ='PLANT';

              }else if(area_of_place=='NON PLANT'){
                var area_of_place_val      ='NON PLANT';
              }else if(area_of_place=='PLANT & NON PLANT'){
                var area_of_place_val      ='NON&PLANT';
              } 

              var PASS_VALID_FROM      = csvData[i][43];
              var PASS_VALID_TO      = csvData[i][44];
              var SAFETY_TRAINING_FROM      = csvData[i][45];
              var SAFETY_TRAINING_TO      = csvData[i][46];
              var payroll      = csvData[i][47];

              if(payroll=='YES'){
                var payroll_val      ='YES';

              }else if(payroll=='NO'){
                var payroll_val      ='NO';
              } 

              var esi_eligible      = csvData[i][48];
              if(esi_eligible=='YES'){
                var esi_eligible_val      ='YES';

              }else if(esi_eligible=='NO'){
                var esi_eligible_val      ='NO';
              }  
              var pf_eligible      = csvData[i][49];
              if(pf_eligible=='YES'){
                var pf_eligible_val      ='YES';

              }else if(pf_eligible=='NO'){
                var pf_eligible_val      ='NO';
              }
              var photo_upload      = csvData[i][50];
             // var sign      = csvData[i][51];
              var STATE      = csvData[i][51];
              var STATUS      = csvData[i][52];

              console.log(CCODE);
              console.log(ENAME);
              console.log(WORK_ORDER_No);
              console.log(WORK_OR_DATE);
            


              console.log(NEW_CODE);
              console.log(PRE_CODE);
              console.log(ECODE);
              console.log(WO_FROM);
              console.log(WO_TO);
              console.log(CI_NAME);
              console.log(FATHER);
              console.log(HUSBAND);
              console.log(DESIGNATION);
              console.log(DOB);
              console.log(ENGAGED_DATE);
              console.log(GENDER);


              console.log(GENDER_VAL);
              console.log(MARITAL_STATUS);
              console.log(MARITAL_STATUS_VAL);
              console.log(PRE_ADDRESS);
              console.log(PERMANENT_ADDRESS);
              console.log(PHONE_NO);
              console.log(EMAIL_ID);
              console.log(EMERGENCY_PERSON);
              console.log(MOBILE_NO);
              console.log(NOMINEE_NAME);
              console.log(NOMINEE_RELATION);
              console.log(NOMINEE_DOB);


             

              console.log(Catogery);
              console.log(WAGE);
              console.log(INCENTIVE);
              console.log(ALLOWANCE);
              console.log(OTHERS);
              console.log(UAN);
              console.log(ESI);
              console.log(AADHAR);
              console.log(IDENTY_MARK);
              console.log(BANK_NAME);
              console.log(ACCOUNT_NO);
              console.log(ifsc_code);
              console.log(BLOOD_GROUP);
              console.log(ENTRY_GATE);
              console.log(WROK_SPOT);
              console.log(AREA_OF_WORK);
              console.log(area_of_place);
              
              console.log(area_of_place_val);
              console.log(PASS_VALID_FROM);
              console.log(PASS_VALID_TO);
              console.log(SAFETY_TRAINING_FROM);

              console.log(SAFETY_TRAINING_TO);
              console.log(payroll);

            


              console.log(payroll_val);
              console.log(pf_eligible);
              console.log(pf_eligible_val);
              console.log(photo_upload);
              console.log(STATE);
              console.log(STATUS);
              







            }
             var date = new Date();
    var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
    .toISOString()
    .split("T")[0];
    //console.log(dateString);
            var check_sql = `exec emp_excel_dup '${ECODE}','${CCODE}','${ENAME}','${WORK_ORDER_No}','${WORK_OR_DATE}','${NEW_CODE}',
           '${PRE_CODE}','${WO_FROM}','${WO_TO}','${CI_NAME}','${FATHER}','${HUSBAND}','${DESIGNATION}',
           '${DOB}','${ENGAGED_DATE}','${GENDER_VAL}','${MARITAL_STATUS_VAL}','${PRE_ADDRESS}','${PERMANENT_ADDRESS}','${PHONE_NO}','${EMAIL_ID}',
           '${EMERGENCY_PERSON}','${MOBILE_NO}','${NOMINEE_NAME}','${NOMINEE_RELATION}','${NOMINEE_DOB}','${Catogery}','${WAGE}',
           '${INCENTIVE}','${ALLOWANCE}','${OTHERS}','${UAN}','${ESI}','${AADHAR}','${IDENTY_MARK}','${BANK_NAME}',
            '${ACCOUNT_NO}','${ifsc_code}','${BLOOD_GROUP}','${ENTRY_GATE}','${WROK_SPOT}','${AREA_OF_WORK}','${area_of_place_val}',
            '${PASS_VALID_FROM}','${PASS_VALID_TO}','${SAFETY_TRAINING_FROM}','${SAFETY_TRAINING_TO}','${payroll_val}','${esi_eligible_val}',
           '${pf_eligible_val}','${photo_upload}','${STATE}','${STATUS}'`;
            //console.log(check_sql)
            
            pool.query(check_sql, function (err,result) {
             //var exData = recordsets;
              //console.log(result.recordsets[0]);
              //var dupData = result.recordsets[0];
            })
          }
        
        });
        res.json({
          'msg': 'File uploaded/import successfully!'
        }); 
        fs.unlinkSync(filePath)
      });

    stream.pipe(csvStream);
    //location.reload();
  }
});

//Contractor Mail
app.post('/uploads/contractor_mail_csv', upload.single("csvdata"), (req, res) =>{
  importCsvData2MySQL(__basedir + '/uploads/' + req.file.filename);
  res.json({
        'msg': 'File uploaded/import successfully!', 'file': req.file
      });


  function importCsvData2MySQL(filePath){
  let stream = fs.createReadStream(filePath);
  let csvData = [];
  let csvStream = csv
      .parse()
      .on("data", function (data) {
          csvData.push(data);
      })
      .on("end", function () {
          // Remove Header ROW
          csvData.shift();
  // connect to your database
       
  var pool = sql.connect(config, function (err) {
    if (err) throw err;
      console.log("Connected!");

    //console.log(csvData);
     for(i=0;i<csvData.length;i++){
      for(j=0;j<csvData.length;j++){
            var CCODE             = csvData[i][0];
            var CNAME             = csvData[i][1];
            var primary_mail      = csvData[i][2];
            var secondary_mail_one = csvData[i][3];
            var secondary_mail_two = csvData[i][4];
            var secondary_mail_three = csvData[i][5];
            var secondary_mail_four = csvData[i][6];
            var secondary_mail_five = csvData[i][7];
            var secondary_mail_six   = csvData[i][8];
      }
      var sql = `INSERT INTO [contractor_email] ([CCODE],[CNAME],[primary_mail],[secondary_mail_one],[secondary_mail_two],
        [secondary_mail_three],[secondary_mail_four],[secondary_mail_five],[secondary_mail_six])
      VALUES (  '${CCODE}','${CNAME}','${primary_mail}','${secondary_mail_one}','${secondary_mail_two}','${secondary_mail_three}',
          '${secondary_mail_four}','${secondary_mail_five}','${secondary_mail_six}')`;     
     
          pool.query(sql, function (err, result) {
        if (err) throw err;
        
      });   
      }        
  });
         
    fs.unlinkSync(filePath)
  });

stream.pipe(csvStream);
}
});

//Engineer
app.post('/uploads/enginerr_csv', upload.single("csvdata"), (req, res) =>{
  importCsvData2MySQL(__basedir + '/uploads/' + req.file.filename);
  res.json({
        'msg': 'File uploaded/import successfully!', 'file': req.file
      });


  function importCsvData2MySQL(filePath){
  let stream = fs.createReadStream(filePath);
  let csvData = [];
  let csvStream = csv
      .parse()
      .on("data", function (data) {
          csvData.push(data);
      })
      .on("end", function () {
          // Remove Header ROW
          csvData.shift();
  // connect to your database
       
  var pool = sql.connect(config, function (err) {
    if (err) throw err;
      console.log("Connected!");

    //console.log(csvData);
     for(i=0;i<csvData.length;i++){
      for(j=0;j<csvData.length;j++){
            var EIC_PRNO        = csvData[i][0];
            var name            = csvData[i][1];
            var department      = csvData[i][2];
            var designation     = csvData[i][3];
            var email           = csvData[i][4];
            var mobile          = csvData[i][5];
            var status          = csvData[i][6];
            var created_by      = csvData[i][7];
            var created_on      = csvData[i][8];
      }
      var sql = `INSERT INTO [cpcl_engineer_master] ([EIC_PRNO],[name],[department],[designation],[email],[mobile],[user_name],[password],[status],[created_by],
        [created_on])
      VALUES ('${EIC_PRNO}','${name}','${department}','${designation}','${email}','${mobile}','${EIC_PRNO}','${EIC_PRNO}',
          '${status}','${created_by}',GETDATE())`;     
     
          pool.query(sql, function (err, result) {
        if (err) throw err;
        
      });   
      }        
  });
         
    fs.unlinkSync(filePath)
  });

stream.pipe(csvStream);
}
});

//Shift
app.post('/uploads/shift_csv', upload.single("csvdata"), (req, res) =>{
  importCsvData2MySQL(__basedir + '/uploads/' + req.file.filename);
  res.json({
        'msg': 'File uploaded/import successfully!', 'file': req.file
      });


  function importCsvData2MySQL(filePath){
  let stream = fs.createReadStream(filePath);
  let csvData = [];
  let csvStream = csv
      .parse()
      .on("data", function (data) {
          csvData.push(data);
      })
      .on("end", function () {
          // Remove Header ROW
          csvData.shift();
  // connect to your database
       
  var pool = sql.connect(config, function (err) {
    if (err) throw err;
      console.log("Connected!");

    console.log(csvData);
    for(i=0;i<csvData.length;i++){
      for(j=0;j<csvData.length;j++){

            var shift_name       = csvData[i][0];
            var from_time        = csvData[i][1];
            var to_time          = csvData[i][2];
            var status           = csvData[i][3];
      }
      var sql = `INSERT INTO [cpcl_shift_master]
      ([shift_name],[from_time],[to_time],[status],[created_by],[created_on]) 
      VALUES ( '${shift_name}','${from_time}','${to_time}','${status}',1,GETDATE())`;     
     
          pool.query(sql, function (err, result) {
        if (err) throw err;

      });   
      }    
  });
         
    fs.unlinkSync(filePath)
  });

stream.pipe(csvStream);
}
});




app.get('/logout',(req,res)=>{ 
  console.log(req.session.userId);
  req.session.destroy(function(err) {
    var message = 'logged out';
    //res.render('login',{message:message});
    res.redirect('/');
  });
});

app.listen(port, () => console.log("app is listen-"+port));