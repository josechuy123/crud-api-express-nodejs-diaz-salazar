const controller = {};
const db = require('../database');


//agregar alumno
controller.save = (req, res) => {
  const datos = req.body;
  db.query('INSERT INTO alumnos SET ?', [datos], (req, alumnos) => {
    res.redirect('/alumnos');
  });
};

controller.agregarDias = (req, res) => {
  const datos = req.body;
  //res.send(id_alumno);
  db.query('INSERT INTO calendario SET ? ',[datos],(err, alumnos) =>{
    res.redirect('/alumnos');
  });
};

//para mostrar los alumnos
controller.show = (req, res) => {
  const token = req.cookies.jwt;
  console.log(token);
  if(!token)
  {
      return res.status(401).render('login' , {
          message: 'Debes de iniciar sesion para poder navegar'
      });
  };

  db.query(
    'select alumnos.id_alumno,alumnos.nombre,alumnos.apellidos, calendario.dias from alumnos left join calendario on alumnos.id_alumno = calendario.id_alumno',
    (err, alumnos) => {
      if (err) {
        res.json(err);
      }
      res.render('alumnos', {
        alumnos: alumnos,
      });
    }
  );
};
//para elimintar
controller.delete = (req, res) => {
  const { id } = req.params;
  db.query('DELETE  FROM calendario where id_alumno = ?', [id], (err, alumnos) => {
    db.query('DELETE  FROM alumnos where id_alumno = ?', [id], (err, alumnos) => {
      res.redirect('/alumnos');
    });
  });
};

//actualizar

controller.update = (req,res)=>{
  const id_alumno = req.body.id_alumno_editar;
  const nombre= req.body.nombre_new;
  const apellidos= req.body.apellidos_new;
  const dias= req.body.dias_new;
  db.query('update calendario set dias = ? where id_alumno = ?', [dias,id_alumno], (err, alumnos) => {
    db.query('update alumnos set nombre = ?,apellidos = ? where id_alumno = ?', [nombre,apellidos,id_alumno], (err, alumnos) => {
      res.redirect('/alumnos');
    });
  });
}


//autenticador





module.exports = controller;
