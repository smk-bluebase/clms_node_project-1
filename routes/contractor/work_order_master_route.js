const { request } = require('express');
const express = require('express');
const router = express.Router();
const { reset } = require('nodemon');
var db_operations = require('../../database/contractor/work_order_table');

var sql = require("mssql");
var config = require('../../database/dbconfig');

//Initial route
router.get('/workordernew',(req,res,next)=>{
	 var user_Id = req.session.userId, user_name = req.session.user_name;
	  if(user_Id == null)
    {
		message = 'Wrong Credentials.';
        res.render('login.ejs',{message: message});
		return;
    }
    else{
		db_operations.get_workOrder().then(result=>{
            var data = result[0]; 
            res.render('contractor_master/workordernew',{user_Id:user_Id,user_name:user_name,data})
        })
    }  
});

var obj = {};
router.get('/workordernew/add', function (req, res) {
    var user_Id = req.session.userId, user_name = req.session.user_name;
	  if(user_Id == null)
    {
		message = 'Wrong Credentials.';
        res.render('login.ejs',{message: message});
		return;
    }
    else{
        db_operations.get_contractor_code().then(result=>{
            var name = "please select ccode";
            var code = result[0];
            obj.codename =  result[0];
            obj.user_Id = user_Id;
            obj.user_name = user_name;
            db_operations.get_engineer_incharge_code().then(result=>{
                obj.engcode =  result[0];
                //res.send(obj.engcode);
                res.render('contractor_master/workordernew_form',obj);
            });
        });
    } 
});


//Work_Order Insert
router.post('/workordernew/add',(req,res,next)=>{

       // console.log(req.body);

        async function getWorkOrderValues(){
            try{
                let pool = await sql.connect(config);
                
                await pool.request().query(`insert into cpcl_work_order_master_table_format (Contractor_Code,Vendor_No,subContractor_one,subContractor_two,subContractor_three,EIC_PRNO,Engineer_In_Charge,Department,Work_order_no,Work_order_date,Contract_Duration,CLRA,ISMW,Wo_to_date,Contractor_Value,extra_workman,clra_rcno,scope,clra_rc_str,clra_lic_no,clra_period_from,clra_period_to,clra_workmen,ismw_rcno,ismw_rc_str,ismw_lic_no,ismw_period_from,ismw_period_to,ismw_workmen,Total_Workmen,STATUS,CREATED_BY)VALUES('${req.body.Contractor_Code}','${req.body.Vendor_No}','${req.body.subContractor_one}','${req.body.subContractor_two}','${req.body.subContractor_three}','${req.body.EIC_PRNO}','${req.body.Engineer_In_Charge}','${req.body.Department}','${req.body.Work_order_no}','${req.body.Work_order_date}','${req.body.Contract_Duration}','${req.body.CLRA}','${req.body.ISMW}','${req.body.Wo_to_date}','${req.body.Contractor_Value}','${req.body.extra_workman}','${req.body.clra_rcno}','${req.body.scope}','${req.body.clra_rc_str}','${req.body.clra_lic_no}','${req.body.clra_period_from}','${req.body.clra_period_to}','${req.body.clra_workmen}','${req.body.ismw_rcno}','${req.body.ismw_rc_str}','${req.body.ismw_lic_no}','${req.body.ismw_period_from}','${req.body.ismw_period_to}','${req.body.ismw_workmen}','${req.body.Total_Workmen}','1','1')`,(err,result)=>{


                        if(err) throw err;

                   
                });  
                
                console.log(sql);
            }
            catch(error){
                console.log(error);
            }
        }
       getWorkOrderValues();
       res.redirect("/workordernew")

});


//workorder edit

router.get('/work_edit/:shiftid',(req,res) => {

    const shiftId = req.params.shiftid;

    async function workOrderUpdate(){
        try{
                let pool = await sql.connect(config);
                let products = await pool.request().query(`select * from cpcl_work_order_master_table_format where id = ${shiftId}`); 
                return products.recordsets;
            }
        catch(error){
            console.log(error);
        }
    }

    console.log(workOrderUpdate());

    /*
     async function getClraDetails(){
        try{
                let pool = await sql.connect(config);
                let products = await pool.request().query(`select * from clra where workorder_no = '${worder}'`); 
                return products.recordsets;
            }
        catch(error){
            console.log(error); 
        }
    } 
    async function getIsmwDetails(){
        try{
                let pool = await sql.connect(config);
                let products = await pool.request().query(`select * from ismw where workorder_no = '${worder}'`); 
                return products.recordsets;
            }
        catch(error){
            console.log(error);
        }
    } 
     async function getExtraContractor(){
        try{
                let pool = await sql.connect(config);
                let products = await pool.request().query(`select * from work_order_extra_contractor where workorder_no = '${worder}'`); 
                return products.recordsets;
            }
        catch(error){
            console.log(error);
        }
    }  

    */

    var workOrder = {};
    var user_Id = req.session.userId, user_name = req.session.user_name;
    workOrder.user_Id = user_Id;
	workOrder.user_name = user_name;


    workOrderUpdate().then(result=>{
        var work_edit_data = result[0];


        workOrder.work_edit_data = work_edit_data;

        res.render('contractor_master/workorderedit',workOrder);

        /*
            getClraDetails().then(result=>{
            var clraDetails = result[0];

            var clra_count = clraDetails.length;
            console.log(clra_count);

            getIsmwDetails().then(result=>{
                var ismwDeatils = result[0];
                var ismw_count = ismwDeatils.length;

                console.log(ismw_count);

                getExtraContractor().then(result=>{
                    var eContractorDetails = result[0];
                    var eC_count = eContractorDetails.length;
                    console.log(eC_count);

                    workOrder.work_edit_data = work_edit_data;
                    workOrder.clraDetails = clraDetails;
                    workOrder.clra_count = clra_count;
                    workOrder.ismwDeatils = ismwDeatils;
                    workOrder.ismw_count = ismw_count;
                    workOrder.eContractorDetails = eContractorDetails;
                    workOrder.eC_count = eC_count;
                    res.render('contractor_master/workorderedit',workOrder);
                })
            })
        })

        */
    })
});




//WorkOrder update process
 router.post('/workordernew/update',(req, res) => {
    var data = req.body;
      async function workordernewupdate(){


        try{

            let pool = await sql.connect(config);
            await pool.request().query(`update cpcl_work_order_master SET 

            CCODE               =   '${req.body.Contractor_Code}',
            VENDOR_NO           =   '${req.body.Vendor_No}',
            WORK_ORDER          =   '${req.body.Work_order_no}',
            WO_FROM_DATE        =   '${req.body.Work_order_date}',
            WO_TO_DATE          =   '${req.body.Wo_to_date}',
            SAP_WO_NO           =   '${req.body.sap_wo_no}',
            CVALUE              =   '${req.body.Contractor_Value}',
            DURATION            =   '${req.body.Duration_Date}',
            CDURATION           =   '${req.body.Contract_Duration}',
            EIC_PRNO            =   '${req.body.EIC_PRNO}',
            EIC                 =   '${req.body.Engineer_In_Charge}',
            JOB_DESC            =   '${req.body.Job_Desc}',
            DEPARTMENT          =   '${req.body.Department}',
            CLRA                =   '${req.body.CLRA}',
			ISMW                =   '${req.body.ISMW}',
			WORKMEN_TOT         =   '${req.body.Total_Workmen}' where id ='${req.body.id}'`); 


            var workorder_no = req.body.Work_order_no;

            console.log(workorder_no);

            //Extra CLRA Check update and insert
 
            async function getClraDetails(){
                try{
                        let pool = await sql.connect(config);
                        let products = await pool.request().query(`select * from clra where workorder_no = '${workorder_no}'`); 
                        return products.recordsets;
                    }
                catch(error){
                    console.log(error); 
                }
            }
            getClraDetails().then(result=>{
                var clraDetails = result[0];    
                var clra_count = clraDetails.length;
                console.log(clra_count);
                if(clra_count>0)
                {
                     pool.request().query(`update clra SET 
                    clra_rcno           =   '${req.body.clra_rcno}',
                    clra_rc_str         =   '${req.body.clra_rc_str}',
                    licence_no          =   '${req.body.clra_lic_no}',
                    period_from         =   '${req.body.clra_period_from}',
                    period_to           =   '${req.body.clra_period_to}',
                    workmen             =   '${req.body.clra_workmen}' where workorder_no ='${req.body.Work_order_no}'`);
                }
                else{
                    var clra_rcno = req.body.clra_rcno;
                    var clra_rc_str = req.body.clra_rc_str;
                    var clra_lic_no = req.body.clra_lic_no;
                    var clra_period_from = req.body.clra_period_from;
                    var clra_period_to = req.body.clra_period_to;
                    var clra_workmen = req.body.clra_workmen;
                    //Date
                    var date = new Date();
                    var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];

                      pool.request().query(`insert into clra (clra_rcno,clra_rc_str,licence_no,period_from,period_to,workmen,ccode,
                        workorder_no,CREATED_ON)
                    values('${clra_rcno}','${clra_rc_str}','${clra_lic_no}','${clra_period_from}','${clra_period_to}','${clra_workmen}',
                    '${req.body.Contractor_Code}','${req.body.Work_order_no}','${dateString}')`);                     
                }
            });
            //Extra CLRA Closed

            //Extra ISMW Start here

            async function getIsmwDetails(){
                try{
                        let pool = await sql.connect(config);
                        let products = await pool.request().query(`select * from ismw where workorder_no = '${workorder_no}'`); 
                        return products.recordsets;
                    }
                catch(error){
                    console.log(error);
                }
            } 
            getIsmwDetails().then(result=>{
                var ismwDeatils = result[0];
                var ismw_count = ismwDeatils.length;
                console.log(ismw_count);

                if(ismw_count>0)
                {
                    pool.request().query(`update ismw SET 
                    ismw_rcno           =   '${req.body.ismw_rcno}',
                    ismw_rc_str         =   '${req.body.ismw_rc_str}',
                    licence_no          =   '${req.body.ismw_lic_no}',
                    period_from         =   '${req.body.ismw_period_from}',
                    period_to           =   '${req.body.ismw_period_to}',
                    workmen             =   '${req.body.ismw_workmen}'  where workorder_no ='${req.body.Work_order_no}'`);
                }
                else
                {
                    //ISMW
                    var ismw_rcno = req.body.clra_rcno;
                    var ismw_rc_str = req.body.clra_rc_str;
                    var ismw_lic_no = req.body.clra_lic_no;
                    var ismw_period_from = req.body.clra_period_from;
                    var ismw_period_to = req.body.clra_period_to;
                    var ismw_workmen = req.body.clra_workmen;
                    //Date
                    var date = new Date();
                    var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];

                    pool.request().query(`insert into ismw (ismw_rcno,ismw_rc_str,licence_no,period_from,period_to,workmen,ccode,
                        workorder_no,CREATED_ON)
                    values('${ismw_rcno}','${ismw_rc_str}','${ismw_lic_no}','${ismw_period_from}','${ismw_period_to}','${ismw_workmen}',
                    '${req.body.Contractor_Code}','${req.body.Work_order_no}','${dateString}')`,(req,res)=>{
                        console.log("ismw successfully inserted");                    
                        });
                    }
                });
           
            //Extra ISMW closed here

            //Extra Contractor start here 
            async function getExtraContractor(){
                try{
                        let pool = await sql.connect(config);
                        let products = await pool.request().query(`select * from work_order_extra_contractor where workorder_no = '${workorder_no}'`); 
                        return products.recordsets;
                    }
                catch(error){
                    console.log(error);
                }
            }

            getExtraContractor().then(result=>{
                var eContractorDetails = result[0];
                var eC_count = eContractorDetails.length;
                console.log(eC_count);

                    if(eC_count>0)
                    {
                         pool.request().query(`update work_order_extra_contractor SET 
                        cname               =   '${req.body.e_contractor_name}',
                        licence_no          =   '${req.body.e_c_lic_no}',
                        period_from	        =   '${req.body.e_c_period_from}',
                        period_to           =   '${req.body.e_c_period_to}',
                        workmen             =   '${req.body.e_c_workmen}' where workorder_no ='${req.body.Work_order_no}'`);
                    }
                    else
                    {

                    //EXTRA CONTRACTOR
                    var e_contractor_name = req.body.e_contractor_name;
                    var e_c_lic_no = req.body.e_c_lic_no;
                    var e_c_period_from = req.body.e_c_period_from;
                    var e_c_period_to = req.body.e_c_period_to;
                    var e_c_workmen = req.body.e_c_workmen;
                    var e_c_total_workmen = req.body.e_c_total_workmen;
                    //Date
                    var date = new Date();
                    var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];

                    pool.request().query(`insert into work_order_extra_contractor (cname,licence_no,period_from,period_to,workmen,
                    total_workmen,ccode,workorder_no,CREATED_ON)
                    values('${e_contractor_name}','${e_c_lic_no}','${e_c_period_from}','${e_c_period_to}','${e_c_workmen}','${e_c_total_workmen}',
                    '${req.body.Contractor_Code}','${req.body.Work_order_no}','${dateString}')`,(req,res)=>{
                    console.log("Extra Contractor successfully inserted");
                    });


                    }
            });

        }
        catch(error){
            console.log(error);
        }
        console.log("WorkOrder Updated Successfully");
    } 

    workordernewupdate();

     res.redirect('/workordernew'); 
});

//Work_order_no Save
router.post('/workorder_no/save',(req,res)=>{
    var wor_order_no = req.body.wo_number;
    async function check_workorder_no(){
        try
        {
           let pool = await sql.connect(config);  
           let eicnumber = await pool.request().query(`
           select WORK_ORDER from cpcl_work_order_master where WORK_ORDER = '${wor_order_no}'`); 
            return eicnumber.recordsets;   
        }
        catch(error){
            console.log(error);
        }
    }

    check_workorder_no().then(result=>{
        var check_workorder_count = result[0];
       console.log(check_workorder_count)
        res.send(check_workorder_count);
    });


})

//get eic pro number
router.post('/get/eic_name',(req,res)=>{
    async function getEicProNumber(){
        try{
                let pool = await sql.connect(config);
                let eicnumber = await pool.request().query(`select name,department from cpcl_engineer_master where EIC_PRNO = '${req.body.eicnumber}'`); 
                return eicnumber.recordsets;
            }
        catch(error){
            console.log(error);
        }
    }  
    getEicProNumber().then(result=>{
        var eicProNumber = result[0];
        //console.log(eicProNumber)
        res.send(eicProNumber);
    });
})

module.exports = { routes:router}