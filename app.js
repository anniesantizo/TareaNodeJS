import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const students = [];

function mostrarMenu() {
    console.log('***********************************************************************************');
    console.log('\n1. Ingresar estudiante');
    console.log('2. Ingresar notas');
    console.log('3. Buscar por número de carnet');
    console.log('4. Generar resumen de notas por nombre de estudiante');
    console.log('5. Salir');
    rl.question('Seleccione una opción: ', (opcion) => {
      switch (opcion) {
        case '1':
          registrarEstudiante();
          break;
        case '2':
          ingresarNotas();
          break;
        case '3':
          buscarPorCarnet();
          break;
        case '4':
          generarResumenNotas();
          break;
        case '5':
          rl.close();
          break;
        default:
          console.log(chalk.red('Opción inválida. Por favor, seleccione una opción válida.'));
          mostrarMenu();
          break;
      }
    });
  }

function registrarEstudiante() {
  rl.question('Ingrese el nombre del estudiante: ', (nombre) => {
    rl.question('Ingrese el número de carnet del estudiante: ', (carnet) => {
      students.push({ nombre, carnet, notas: [] });
      console.log(chalk.green('Estudiante ingresado correctamente.'));
      mostrarMenu();
    });
  });
}

function ingresarNotas() {
  rl.question('Ingrese el número de carnet del estudiante: ', (carnet) => {
    const student = students.find(s => s.carnet === carnet);
    if (!student) {
      console.log(chalk.red('Estudiante no encontrado.'));
      mostrarMenu();
      return;
    }

    rl.question('Ingrese el nombre de la tarea: ', (tarea) => {
      rl.question('Ingrese la nota de la tarea: ', (nota) => {
        student.notas.push({ tarea, nota: parseFloat(nota) });
        console.log(chalk.green('Nota ingresada correctamente.'));
        mostrarMenu();
      });
    });
  });

}

function buscarPorCarnet() {
  rl.question('Ingrese el número de carnet del estudiante: ', (carnet) => {
    const student = students.find(s => s.carnet === carnet);
    if (!student) {
      console.log(chalk.red('Estudiante no encontrado.'));
    } else {
      console.log(chalk.green('Nombre del estudiante:', student.nombre));
      console.log(chalk.green('Número de carnet:', student.carnet));
    }
    mostrarMenu();
  });
}

function generarResumenNotas() {
  rl.question('Ingrese el nombre del estudiante: ', (nombre) => {
    const student = students.find(s => s.nombre === nombre);
    if (!student) {
      console.log(chalk.red('Estudiante no encontrado.'));
    } else {
      console.log(chalk.green('Resumen de notas para', student.nombre));
      student.notas.forEach(nota => {
        console.log(chalk.blue('Tarea:', nota.tarea, '- Nota:', nota.nota));
      });
    }
    mostrarMenu();
  });
}

mostrarMenu();
