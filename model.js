
const fs = require("fs");

//Nombre de la base de datos con las preguntas
const DB_FILENAME = "quizzes.json";
/*
 *Modelo de datos
*/
let quizzes = [
  {
    question: "Capital de Italia",
    answer: "Roma"
  },
  {
    question: "Capital de Francia",
    answer: "París"
  },
  {
    question: "Capital de España",
    answer: "Madrid"
  },
  {
    question: "Capital de Portugal",
    answer: "Lisboa"
  },
]
/*
 * Funcion que cara el contenido del fichero DB_FILENAME en la variable quizzes
*/
const load = () =>{
  fs.readFile(DB_FILENAME, (err,data) => {
    if (err) {
      if (err.code === "ENOENT"){
        save();
        return;
      }
      throw err;
    }

    let json = JSON.parse(data);

    if (json){
      quizzes = json;
    }
  })
}
 /*
 *Guarda las preguntas en el fichero
 */
 const save = () => {
   fs.writeFile(DB_FILENAME, JSON.stringify(quizzes), err => {
     if (err) throw err;
   })
 }
/*
 *Devuelve el numero total de preguntas
 *@returns {number} numero total de preguntas
*/
exports.count = () => quizzes.length;

/*
 *Añade un nuevo quiz
 *
 *@param question String con la pregunta
 *@param answer String con la respuesta
*/
exports.add = (question, answer) => {
  quizzes.push({
    question: (question || "").trim(),
    answer: (answer|| "").trim()
  });
  save();
}
/*
 *Actualiza el quiz situado en la posicion index
 *
 *@param id Clave que identifica el quiz a actualizar
 *@param question String con la pregunta
 *@param answer String con la respuesta
*/
exports.update = (id,question, answer) => {

  const quiz = quizzes[id];
  if(typeof quiz == "undefined"){
    throw new Error(' El valor del parámetro id no es válido.')
  }
  quizzes.splice(id,1,{
    question: (question || "").trim(),
    answer: (answer || "").trim()
  });
  save();
}

/*
 *Devuelve todos los quizzes existentes
 *
 *@returns {any}
*/
exports.getAll = () => JSON.parse(JSON.stringify(quizzes));

/*
 *Devuelve un clon del quiz almacenado en la posicion id
 *
 *@param id Clave que identifica el quiz
 *@returns {question, answer} Devuelve el objeto pedido
*/
exports.getByIndex = id => {
  const quiz = quizzes[id];
  if (typeof quiz === "undefined"){
    throw new Error('El valor del parámetro id no es válido.');
  }
  return JSON.parse(JSON.stringify(quiz));
};

/*
 *Elimina el quiz situado en la posicion dado
 *
 *@param id Clave que identifica el quiz
*/
exports.deleteByIndex = id => {
  const quiz = quizzes[id];
  if (typeof quiz === "undefined"){
    throw new Error('El valor del parámetro id no es válido.');
  }
  quizzes.splice(id,1);
  save();
};

//Carga los quizzes almacenados
load();
