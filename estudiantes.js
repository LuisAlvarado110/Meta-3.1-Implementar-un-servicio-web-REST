const estudiantes = [
    {
      id: 1,
      nombre: 'aaaaaaaaaaaaaaaaaaa',
      matricula: 123456,
      semestreIngreso: '2016-2',
      creditosCursados: 200
    },
    {
      id: 2,
      nombre: 'Lupita López',
      matricula: 654321,
      semestreIngreso: '2017-2',
      creditosCursados: 100
    },
    {
      id: 3,
      nombre: 'Adolfo Toledo',
      matricula: 885112,
      semestreIngreso: '2019-2',
      creditosCursados: 130
    },
    {
      id: 4,
      nombre: 'Merlina Guzman',
      matricula: 128742,
      semestreIngreso: '2020-2',
      creditosCursados: 200
    },
    {
      id: 5,
      nombre: 'Luis Morales',
      matricula: 896236,
      semestreIngreso: '2021-1',
      creditosCursados: 190
    }
  ];

  const findById = function (id) {
      return estudiantes.find((e) => {
          return e.id == id;
      });
  };

  const findByMatricula = function (matricula) {
    return estudiantes.find((e) => {
        return e.matricula == matricula;
    });
};

const findAll = function() {
  return estudiantes;
};

const save = function (id,data) {
  let registro = estudiantes.find((e) => {
      return e.id == id;
  });
  if(registro){
      for (let [llave,valor] of Object.entries(data)) {
          registro[llave] = valor;
      }
  }
  return registro;
};


const add = function (estudiante) {

  estudiantes.push(estudiante);
  return estudiante;
};

exports.save = save;
exports.add = add;
exports.findById = findById;
exports.findByMatricula = findByMatricula;
exports.findAll = findAll;