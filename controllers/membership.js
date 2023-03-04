const express =require('express');
const app = express();
const mongoose = require('mongoose');
const Student  =require('../models/student')
const Membership  =require('../models/membership');
const { BadRequestError } = require('../errors');


const createMembership = async function(req,res){
    try{
    console.log("create membership called.");
    const {
     params:{id:userId}
    } = req;

    const verifiedStudent  = await Student.find({userId:userId}).then((result)=>{
       return result;
    })
    .catch((err)=>{
        throw err;
    })
    if (verifiedStudent.status==="Verified") {

    }
    else{
        throw new BadRequestError("Student Details not verified. Contact Admin section for verification first, then can take membership.")
    }

    
    }
    catch(err){
        console.log("Error in creating membership in createmembership = ",err.message);
        throw err;
    }
}
module.exports ={createMembership}