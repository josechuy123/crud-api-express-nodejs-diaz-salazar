const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const alumnoController = require('../controllers/alumnoController');
const authController = require('../controllers/authController');



router.get('/', (req, res) => {
  res.render('index');
});

router.post('/alumnos/update', alumnoController.update);

router.get('/alumnos', alumnoController.show);

router.post('/agregar-dias-alumnos', alumnoController.agregarDias);

router.post('/add', alumnoController.save);
router.get('/delete/:id', alumnoController.delete);

router.get('/register', (req,res)=>{
  res.render('register')
});

router.get('/login', (req,res)=>{
  res.render('login')
});

router.post('/register_user',authController.register);
router.post('/login',authController.login);

router.get('/logout', authController.logout);
module.exports = router;
