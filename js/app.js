/*
GAME RULES:
- El juego tiene 2 jugadores, jugando en rondas.
- En cada turno, un jugador tira un dado tantas veces como lo desee. Cada resultado se agrega a su puntaje REDONDO
- PERO, si el jugador saca un 1, toda su puntuación REDONDA se pierde. Después de eso, es el turno del siguiente jugador
- El jugador puede elegir 'Sostener', lo que significa que su puntaje REDONDO se agrega a su puntaje GLBAL. Después de eso, es el turno del siguiente jugador
- El primer jugador en alcanzar 100 puntos en el puntaje GLOBAL gana el juego
*/

var puntuacion,
  puntuacionRedonda,
  jugadorActivo,
  gamePlaying,
  guardarDado,
  valorParaGanar;
init();

//##### cuando dan click en tirar dado ########
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //generar numero aleatorio
    var dado = Math.floor(Math.random() * 6) + 1;
    console.log(dado);

    //mostrando el resultado
    var dadoDOM = document.querySelector(".dice");
    dadoDOM.style.display = "block";
    dadoDOM.src = "img/dice-" + dado + ".png";

    //actualizando el score si el numero no es 1
    if (dado !== 1) {
      //verificando si saco 2 veces seguidas el dado 6
      if (dado === 6) {
        guardarDado += dado;
      } else {
        guardarDado = 0;
      }

      //cambiando el resultado a cero
      if (guardarDado === 12) {
        puntuacion[jugadorActivo] = 0;

        //actualizar la interfaz de usuario
        document.querySelector("#score-" + jugadorActivo).textContent =
          puntuacion[jugadorActivo];

        siguienteJugador();
      } else {
        //anadir score
        puntuacionRedonda += dado;
        document.querySelector(
          "#current-" + jugadorActivo
        ).textContent = puntuacionRedonda;
      }
    } else {
      siguienteJugador();
    }
  }
});

//######### cuando da click en sostener ##########
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //agregar puntaje actual al puntaje global
    puntuacion[jugadorActivo] += puntuacionRedonda;

    //actualizar la interfaz de usuario
    document.querySelector("#score-" + jugadorActivo).textContent =
      puntuacion[jugadorActivo];

    //comprobar si el jugador gano
    if (puntuacion[jugadorActivo] >= parseInt(valorParaGanar)) {
      document.querySelector("#name-" + jugadorActivo).textContent =
        "Ganador !";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + jugadorActivo + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + jugadorActivo + "-panel")
        .classList.remove("active");

      //cambiando estado para que no pueda seguir jugando si ya ganaron
      gamePlaying = false;
    } else {
      //turno del siguiente jugador
      siguienteJugador();
    }
  }
});

//###### cuando le da click en nuevo juego ###########
document.querySelector(".btn-new").addEventListener("click", init);

//######## funciones #############
function siguienteJugador() {
  //siguiente jugador
  jugadorActivo === 0 ? (jugadorActivo = 1) : (jugadorActivo = 0);
  puntuacionRedonda = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

function init() {
  valorParaGanar = prompt("digite cantidad para ganar");
  puntuacion = [0, 0];
  puntuacionRedonda = 0;
  jugadorActivo = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //cambiar de GANADOR a nombre de jugador
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  //limpiar clase ganadora
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

/** CAMBIAR LAS REGLAS DEL JUEGO
  1. Un jugador pierde su puntaje COMPLETO cuando tira dos 6 seguidos. Después de eso, es el turno del próximo jugador. (Sugerencia: siempre guarde la tirada de dados anterior en una variable separada) LISTO
 
 2. Agregue un campo de entrada al HTML donde los jugadores pueden establecer el puntaje ganador, para que puedan cambiar el puntaje predefinido de 100. (Sugerencia: puede leer ese valor con la propiedad .value en JavaScript. Esta es una buena oportunidad para usa google para resolver esto) LISTO

 3. Agregue otros dados al juego, para que haya dos dados ahora. El jugador pierde su puntaje actual cuando uno de ellos es un 1 (Sugerencia: necesitará CSS para colocar el segundo dado, así que eche un vistazo al código CSS para el primero)
 */
