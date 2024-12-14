"use strict";

// Aseguro que el codigo se ejecute después de que se haya terminado de cargar el DOM
window.addEventListener("load", cargar);

// Variablas para almacenar los operandos y la operacion
var op1;
var op2;
var operacion;

// Hago un array de operaciones, por si quisieramos ampliar el codigo
let arrayOperaciones = ["/", "*", "-", "+"];

function cargar() {
  // CAPTURAR MEDIANTE CLICKS

  // Obtengo todos los botones de la tabla
  let botones = document.getElementsByTagName("button");

  // Asigno evento(CLICK) a todos los botones obtenidos,por lo que ejecutarán la funcion botonClick
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", botonClick);
  }

  // Función click de los botones
  function botonClick(event) {
    // Obtengo el td del resultado, actualizado
    let spanRes = document.getElementById("resultado");

    // Obtingo elemento clicado
    let valor = event.target.value;

    // Verifico el valor
    if (arrayOperaciones.includes(valor)) {
      // Si es alguna operación de las que incluye en array, lo muestra por la ventana emergente
      mostrarOperacion(valor);
      // Capturamos el primer operando
      op1 = parseFloat(spanRes.textContent);
      // Almaceno el operador seleccionado
      operacion = valor;

      // Llamo al afunción para limpiar la pantalla y poder obtener el segundo operando
      borrarPantalla();
      // Hacemos el calculo
    } else if (valor === "=") {
      calcular();
      // Borramos todo
    } else if (valor === "C") {
      borrarTodo();
    } else {
      // Agregar número a la pantalla de la calculadora
      spanRes.innerText += valor;
    }
  }

  // Función que muestra el operador en una ventana emergente por 1 segundo
  function mostrarOperacion(valor) {
    // Creo la ventana emergente en blanco
    let ventana = window.open(
      "about:blank",
      "_blank",
      "width=200px,height=100px,left=50px,top=50px" // Desde la ventana
    );

    //Escribo en la ventana la posible operación "/", "*", "-", "+"
    ventana.document.write("OPERACIÓN:" + valor);

    // Cierro la ventana emergente automáticamente después de 1 segundo
    setTimeout(function () {
      // Cierro la ventana
      ventana.close();
      // Borro la pantalla
      borrarPantalla();
    }, 1000); // 1 segundo
  }

  // CAPTURAR MEDIANTE TECLADO

  // Para detectar teclas presionadas, para que detecte el supr, ya que keypress falla
  window.addEventListener("keydown", botonPresionado);

  // Manejo los eventos de teclado
  function botonPresionado(event) {
    // Capturo la tecla pulsada
    let teclaPulsada = event.key;

    // Verifico si es Enter
    if (teclaPulsada === "Enter") {
      event.preventDefault(); // Bloquear función por defecto
      calcular();
      // Si es Delete
    } else if (teclaPulsada === "Delete") {
      event.preventDefault();
      borrarTodo();
      // Verifico si es un número
    } else if (!isNaN(teclaPulsada)) {
      // Si es número, agregarlo a la pantalla
      document.getElementById("resultado").innerText += teclaPulsada;
      // O si finalmente es una operación
    } else if (arrayOperaciones.includes(teclaPulsada)) {
      mostrarOperacion(teclaPulsada);
      // Obtengo el primer operador
      op1 = parseFloat(document.getElementById("resultado").textContent);

      // Asigno el operador seleccionado
      operacion = teclaPulsada;
      // Borro para obtener el segundo operando
      borrarPantalla();
    }
  }

  // Función para borrar los elementos de la pantalla
  function borrarPantalla() {
    document.getElementById("resultado").innerText = "";
  }

  // Función que calcula el resultado basado dependiendo del operador y recoje el operador 2
  function calcular() {
    // Obtenemos el segundo operador y lo almacenamos en op2
    op2 = parseFloat(document.getElementById("resultado").textContent);
    // Variable donde almacenamos el resultado de la operación
    let resultado;

    // Switch dependiendo del operador almacenado
    switch (operacion) {
      case "+": // Suma
        resultado = op1 + op2;
        break;

      case "-": // Resta
        resultado = op1 - op2;
        break;

      case "*": // Multiplicación
        resultado = op1 * op2;
        break;

      case "/": // División, se verifico si el segundo valor es diferente de 0
        if (op2 !== 0) {
          resultado = op1 / op2;
        } else {
          resultado = "Error"; // Si el segundo valor es 0, se muestra "Error" porque no se puede dividir por 0
        }
        break;
      default:
        break;
    }

    // Se muestra el resultado en pantalla
    document.getElementById("resultado").textContent = resultado;

    // Almaceno el resultado como nuevo op1 para la siguiente operación
    op1 = resultado;
    // Reseteo la operación, para poder recibir otra
    operacion = null;
  }

  // Resetea todos los valores y los limpia
  function borrarTodo() {
    op1 = null;
    op2 = null;
    operacion = null;
    borrarPantalla();
  }
}
