const controller = {};

const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../database');



dotenv.config({ path: "./.env" })

controller.register = (req,res) =>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const password_verify = req.body.password_verify;

    db.query('select email from users where email = ?' , [email] , async (error,result)=>{
        if(error){
            res.send(error);
        }
        if(result.length > 0){
            res.redirect('/register');
        } else if(password !== password_verify){
            res.redirect('/register');
        }

        let hash = await bcrypt.hash(password, 8);

        db.query('insert into users set username = ? , email = ? , password = ?' , [username,email,hash] , (error,result)=>{
            if(error){
                res.send(error);
            }
            res.redirect('/login');
        });
    });
};

controller.login = async (req,res) =>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        if(!email || !password){
            res.redirect('login');
        }

        db.query('select * from users where email = ?' , [email], async (error,result)=>{
            //res.send(!result || !(await bcrypt.compare(password , result[0].password)))
            if(!result || !(await bcrypt.compare(password , result[0].password))){
                res.redirect('login');
            }else{
                const id = result[0].id;
                const token = jwt.sign( {id:id} , process.env.JWT_SECRET , {
                  expiresIn: process.env.JWT_EXPIRES_IN  
                });
                console.log("El token que se mandara es" , token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt' , token,cookieOptions);
                res.redirect('/');

            }
        })
    } catch (error) {
        res.send(error);
    }
};


controller.logout = (req,res) =>{
   res.clearCookie('jwt');
   res.redirect('/login')
}
module.exports = controller;