const mysql = require("mysql");
const pg = require("pg")
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require('nodemailer');
const oracledb = require('oracledb');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'protocolos3cm9@gmail.com',
        pass: 'dinos@urio123'
    }
})


const CatalogoProfesores = "select p.nombre nombre, p.rol rol, a.nombre academia from profesor p, pertenece pt, academia a where p.usuario=pt.nombre and a.clave=pt.clave";

var app = express();
app.use(bodyParser.json());
app.use(cors())

var pgConnection = {
    host: "localhost",
    port: 5432,
    user: "wad",
    password: "12345",
    database: "Protocolo",
}

const client = new pg.Client(pgConnection);

client.connect((error) => {
    if (!error) {
        console.log("PostgreSQL Connected");
    }
    else {
        throw error;
    }
})

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    port: 8888,
    user: "wad",
    password: "12345",
    database: "Academia",
    multipleStatements: true
})


mysqlConnection.connect((error) => {
    if (!error) {
        console.log("MySQL Connected");
    }
    else {
        throw error;
    }
})

var oracledbConnection = {
    "user": "wad",
    "password": "12345",
    "connectString": "localhost:1521/alumnos"
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res) => {
    res.send("Ve a /profesor para ver a profesores")
});


app.get("/catalogo", (req, res) => {
    mysqlConnection.query(CatalogoProfesores, (err, results) => {
        if (err) {
            throw res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    })
})

app.post("/NombreProfe", (req, res) => {
    let profesor = req.body
    var sql = "select nombre from profesor where usuario='" + profesor.usuario + "'"

    mysqlConnection.query(sql, (err, results) => {
        if (err) {
            throw res.send(err);
        }
        else {
            profe = results[0].nombre
            return res.json({
                data: results
            })
        }
    })
})

app.post("/LoginProfes", (req, res) => {
    let profe = req.body;
    var sql = "select * from profesor where usuario='" + profe.usuario + "' and contraseña='" + profe.contraseña + "';"
    mysqlConnection.query(sql, (err, rows) => {
        if (rows.length > 0) {
            return res.json({
                data: 1
            })
        }
        else {
            return res.json({
                data: 0
            })
        }
    })
})

/* Login Alumnos*/

app.post("/LoginAlumnos", (req, res) => {
    let alumno = req.body;
    var sql = "SELECT * FROM ALUMNOS WHERE BOLETA='" + alumno.boleta + "' AND CONTRASEÑA='" + alumno.contraseña + "'"

    oracledb.getConnection(oracledbConnection, function (err, connection) {
        if (err) {
            console.log(err.message)
            return;
        }
        connection.execute(sql, function (err, result) {
            if (err) {
                console.log(err.message)
            }
            if (result.rows.length > 0) {

                return res.json({
                    data: 1
                })
            }
            else {
                console.log(result)
                return res.json({
                    data: 0
                })
            }
        })
    })
})

//Registro Profe

app.post("/RegistroProfe", (req, res) => {
    let profesor = req.body;
    var sql = "insert into profesor (nombre,usuario,contraseña,rol,correo) values ('" + profesor.nombre + "','" + profesor.usuario + "','" + profesor.contraseña + "','" + profesor.rol + "','" + profesor.correo + "')";
    mysqlConnection.query(sql, (err) => {
        if (err) {
            console.log(err.stack)
            return res.json({
                data: 0
            })
        }
        else {
            return res.json({

                data: 1
            })
        }
    })
})


/*Registro Alumno*/

app.post('/RegistroAlumno', (req, res) => {
    let alumno = req.body;
    var sql = "insert into alumnos (nombre,boleta,correo,contraseña) values ('" + alumno.nombre + "','" + alumno.boleta + "','" + alumno.correo + "','" + alumno.contraseña + "')";

    oracledb.getConnection(oracledbConnection, function (err, connection) {
        if (err) {
            console.log(err.message)
            return;
        }
        connection.execute(sql, (err, results) => {
            if (err) {
                return res.json({
                    data: 0
                })
            }
            else {
                return res.json({
                    data: 1
                })
            }
        })
    })

})

app.post('/ProtocolosProfe', (req, res) => {
    let profesor = req.body;
    var sql = "SELECT pt.numerott Numero,pt.nombrett Nombre FROM protocolo pt, evalúa e WHERE e.estatus='Pendiente' and pt.numerott=e.numerott and e.profesor='" + profesor.usuario + "'"
    client.query(sql, (err, results) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            return res.json({
                data: results.rows
            })
        }
    })
})

/*Protocolo */

app.post('/Protocolo', (req, res) => {
    let protocolo = req.body;

    var sql1 = "select * from Alumnos where boleta='" + protocolo.boleta + "' and numeroTT is not null"

    oracledb.getConnection(oracledbConnection, function (err, connection) {
        if (err) {
            console.log(err.message)
            return;
        }
        connection.execute(sql1, (err, results) => {
            if (err) {
                console.log(err.message)
            }
            else {
                if (results.rows.length > 0) {
                    return res.json({
                        data: 0
                    })
                }
                else {
                    var sql2 = "insert into protocolo(numerott,nombrett,documentopdf) values('" + protocolo.numeroTT + "','" + protocolo.nombreTT + "','" + protocolo.linktt + "')"
                    client.query(sql2, (err) => {
                        if (err) {
                            console.log(err.stack)
                        }
                        else {
                            var sql3 = "update alumnos set numeroTT = '" + protocolo.numeroTT + "' where boleta='" + protocolo.boleta + "'"
                            connection.execute(sql3, (err) => {
                                if (err) {
                                    console.log(err.message)
                                }
                                else {
                                    return res.json({
                                        data: 1
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })
    })
})

/*Dar de baja protocolo*/

app.post('/BajaProtocolo', (req, res) => {

    let protocolo = req.body;
    var sqla = "select numeroTT from alumnos where boleta='" + protocolo.usuario + "' and numeroTT is not null"
    var numeroTT

    oracledb.getConnection(oracledbConnection, function (err, connection) {
        if (err) {
            console.log(err.message)
            return;
        }
        connection.execute(sqla, (err, results) => {
            if (err) {
                console.log(err.message)
            }
            else {
                if (results.rows.length < 1) {
                    return res.json({
                        data: 0
                    })
                }
                else {
                    numeroTT = results[0].numeroTT
                    var sql = "delete from protocolo where numerott = '" + numeroTT + "' ;"
                    client.query(sql, (err) => {
                        if (err) {
                            throw res.send(err)
                        }
                        else {
                            var sql3 = "update alumnos set numeroTT=NULL where numeroTT='" + numeroTT + "'"
                            connection.execute(sql3, (err, results) => {
                                if (err) {
                                    console.log(err.message)
                                }
                                else {
                                    return res.json({
                                        data: 1
                                    })
                                }
                            })
                        }
                    })

                }
            }
        })
    })
})

/*Protocolo disponible*/

app.post('/ProtocolosDisponibles', (req, res) => {
    let profesor = req.body
    var sql = "select tabla1.numerott,tabla1.nombrett from((select numeroTT, nombreTT from protocolo where numerott not in (select numerott from evalúa)) UNION (select distinct p.numerott,p.nombrett from protocolo p, evalúa e where p.numerott=e.numerott group by(p.numerott) having (count(*) <3))) tabla1 left join (select p.numerott,p.nombrett from protocolo p, evalúa e where p.numerott=e.numerott and e.profesor='" + profesor.usuario + "') tabla2 on tabla1.numeroTT=tabla2.numerott where tabla2.numerott is null"
    client.query(sql, (err, results) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            return res.json({
                data: results.rows
            })
        }
    })
})

app.post('/AgregarProtocolo', (req, res) => {
    let conjunto = req.body

    var sql = "insert into evalúa(numerott,profesor,estatus) values('" + conjunto.protocolo + "','" + conjunto.usuario + "','Pendiente')"
    client.query(sql, (err) => {
        if (err) {
            return res.json({
                data: 0
            })
        }
        else {
            return res.json({
                data: 1
            })
        }
    })

})

app.post('/ProtocoloEvaluado', (req, res) => {
    var evaluacion = req.body
    var sql1 = "select nombre from profesor where usuario='" + evaluacion.profesor + "'"
    var nombre

    mysqlConnection.query(sql1, (err, results) => {
        if (err) {
            throw res.send(err)
        }
        else {
            nombre = results[0].nombre
        }
    })

    var sql2 = "update evalúa set estatus='" + evaluacion.calificacion + "' where numerott='" + evaluacion.protocolo + "' and profesor='" + evaluacion.profesor + "'"

    client.query(sql2, (err) => {
        if (err) {
            throw res.send(err)
        }
        else {
            var sql3 = "select correo from alumnos where numeroTT='" + evaluacion.protocolo + "'"
            oracledb.getConnection(oracledbConnection, function (err, connection) {
                if (err) {
                    console.log(err.message)
                    return;
                }
                connection.execute(sql3, (err, results) => {
                    if (err) {
                        console.log(err.message)
                    }
                    else {
                        for (var i = 0; i < results.length; i++) {
                            var opcionesMail = {
                                from: 'Protocolos 3CM9',
                                to: results[i].correo,
                                subject: 'Actualización de evaluación de Protocolo',
                                text: "La evaluación del profesor " + nombre + " sobre tu protocolo ha sido actualziada."
                            }
                            transporter.sendMail(opcionesMail, function (err) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log("Email enviado a " + results[i].correo)
                                }
                            })
                        }
                        return res.json({
                            data: 1
                        })
                    }
                })
            })
        }
    })
})

app.post("/InfoProtocolo", (req, res) => {
    let protocolo = req.body

    var sql = "select nombrett nombre,documentopdf url from protocolo where numerott='" + protocolo.protocolo + "'"

    client.query(sql, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results.rows
            })
        }
    })
})

app.post("/NombreAlumno", (req, res) => {
    let Alumno = req.body

    var sql = "select nombre from alumnos where boleta='" + Alumno.boleta + "'"

    oracledb.getConnection(oracledbConnection, function (err, connection) {
        if (err) {
            console.log(err.message)
            return;
        }
        connection.execute(sql, (err, results) => {
            if (err) {
                return res.json({
                    data: 0
                })
            }
            else {
                return res.json({
                    data: results.rows
                })
            }
        })
    })
})

app.post("/EvaluacionesAlumno", (req, res) => {
    let Alumno = req.body
    var tt = "select numerott from Alumnos where boleta='" + Alumno.boleta + "'"

    oracledb.getConnection(oracledbConnection, function (err, connection) {
        if (err) {
            console.log(err.message)
            return;
        }
        connection.execute(tt, (err, results) => {
            if (results.rows.length < 1) {
                return res.json({
                    data: 0
                })
            }
            else {
                var numerott = results.rows[0][0]
                var evaluaciones = "select profesor,estatus from evalúa where numerott='" + numerott + "'"
                client.query(evaluaciones, (err, results) => {
                    if (err) {
                        console.log(err.stack)
                    }
                    else {
                        if (results.rows.length < 1) {
                            return res.json({
                                data: 0
                            })
                        }
                        const array = results.rows.map(n => {
                            return ("'" + n.profesor + "'")
                        })
                        
                        var sql3 = "select nombre, usuario from profesor where usuario in (" + array + ") "
                        mysqlConnection.query(sql3, (err, resultProfesor) => {
                            const prueba2 = results.rows.map(n => {
                                const nombre1 = resultProfesor.filter(d => d.usuario === n.profesor)
                                return ({ nombreProf: nombre1[0].nombre, estatus: n.estatus })
                            })
                            return res.json(prueba2)
                        })
                    }
                })
            }
        })
    })
})

app.post("/UnirseProtocolo", (req, res) => {
    let Alumno = req.body

    var sql1 = "select * from alumnos where boleta='" + Alumno.boleta + "' and numeroTT is not null"
    oracledb.getConnection(oracledbConnection, function (err, connection) {
        if (err) {
            console.log(err.message)
            return;
        }
        connection.execute(sql1, (err, results) => {
            if (results.rows.length > 0) {
                return res.json({
                    data: 0  //YA TIENE PROTOCOLO
                })
            }
            else {
                var sql2 = "select numerott from protocolo where numerott='" + Alumno.protocolo + "'"
                client.query(sql2, (err, results) => {
                    if (err) {
                        console.log(err.stack)
                    }
                    else {
                        if (results.rows.length == 0) {
                            return res.json({
                                data: -1
                            })
                        }
                        var protocolo = results.rows
                        console.log(results.rows)
                        var sql3 = "update alumnos set numerott='" + protocolo[0] + "' where boleta='" + Alumno.boleta + "'"
                        connection.execute(sql3, (err, results) => {
                            if (err) {
                                console.log(err.message)
                            }
                            else {
                                return res.json({
                                    data: 1
                                })
                            }
                        })
                    }
                })
            }
        })
    })
})

app.post("/AlumnoProtocolo", (req, res) => {
    let Alumno = req.body

    var sql = "select numeroTT from alumnos where boleta='" + Alumno.boleta + "'"

    oracledb.getConnection(oracledbConnection, function (err, connection) {
        if (err) {
            console.log(err.message)
            return;
        }
        connection.execute(sql, (err, results) => {
            if (err) {
                return res.json({
                    data: 0
                })
            }
            
            else {
                return res.json({
                    data: results.rows
                })
            }
        })
    })
})

app.post("/AgregaPalabrasClave", (req, res) => {
    let conjunto = req.body

    var sql = "insert into protocolo_palabrasclave(palabrasClave,numeroTT) values('" + conjunto.palabra + "','" + conjunto.protocolo + "')"
    client.query(sql, (err) => {
        if (err) {
            return res.json({
                data: 0
            })
        }
        else {
            return res.json({
                data: 1
            })
        }
    })
})

app.post("/PalabrasClave", (req, res) => {
    let conjunto = req.body
    var sql = "select palabrasclave Palabra from protocolo_palabrasclave where numerott='" + conjunto.protocolo + "'"
    client.query(sql, (err, results) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            
            if (results.rows.length > 0) {
                return res.json(
                    results.rows
                )
            }
            else {
                return res.json({
                    data: 0
                })
            }
        }
    })
})

app.post("/ObtenLink", (req, res) => {
    let conjunto = req.body
    var sql = "select documentopdf from protocolo where numerott='" + conjunto.protocolo + "'"
    client.query(sql, (err, results) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            if (results.rows.length > 0) {
                
                return res.json(
                    results.rows
                )
            }
            else {
                return res.json({
                    data: 0
                })
            }
        }
    })
})

app.post("/ActualizaLink", (req, res) => {
    let conjunto = req.body

    var sql = "update protocolo set DocumentoPDF='" + conjunto.link + "' where numeroTT='" + conjunto.protocolo + "'"
    client.query(sql, (err) => {
        if (err) {
            return res.json({
                data: 0
            })
        }
        else {
            return res.json({
                data: 1
            })
        }
    })
})

app.post("/FinalizaEvaluacion", (req, res) => {
    let conjunto = req.body

    var sql = "update evalúa set estatus='Pendiente' where numeroTT='" + conjunto.protocolo + "' and not estatus='Aprobado'"
    client.query(sql, (err) => {
        if (err) {
            return res.json({
                data: 0
            })
        }
        else {
            return res.json({
                data: 1
            })
        }
    })
})

app.listen(4000)