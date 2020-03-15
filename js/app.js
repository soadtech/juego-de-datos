/*
GAME RULES:
- El juego tiene 2 jugadores, jugando en rondas.
- En cada turno, un jugador tira un dado tantas veces como lo desee. Cada resultado se agrega a su puntaje REDONDO
- PERO, si el jugador saca un 1, toda su puntuación REDONDA se pierde. Después de eso, es el turno del siguiente jugador
- El jugador puede elegir 'Hold', lo que significa que su puntaje REDONDO se agrega a su puntaje GLBAL. Después de eso, es el turno del siguiente jugador
- El primer jugador en alcanzar 100 puntos en el puntaje GLOBAL gana el juego
*/

var puntuacion, puntuacionRedonda, jugadorActivo;

puntuacion = [0, 0];
puntuacionRedonda = 0;
jugadorActivo = 0;

//document.querySelector('#current-' + jugadorActivo).textContent = dado;
document.querySelector(".dice").style.display = "none";

document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

//######## funciones #############
const siguienteJugador = () => {
  //siguiente jugador
  jugadorActivo === 0 ? (jugadorActivo = 1) : (jugadorActivo = 0);
  puntuacionRedonda = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
};

//##### cuando dan click en Sostener ########
document.querySelector(".btn-roll").addEventListener("click", function() {
  //generar numero aleatorio
  var dado = Math.floor(Math.random() * 6) + 1;

  //mostrando el resultado
  var dadoDOM = document.querySelector(".dice");
  dadoDOM.style.display = "block";
  dadoDOM.src = "img/dice-" + dado + ".png";

  //actualizando el score si el numero no es 1
  if (dado !== 1) {
    //anadir score
    puntuacionRedonda += dado;
    document.querySelector(
      "#current-" + jugadorActivo
    ).textContent = puntuacionRedonda;
  } else {
    siguienteJugador();
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  //agregar puntaje actual al puntaje global
  puntuacion[jugadorActivo] += puntuacionRedonda;

  //actualizar la interfaz de usuario
  document.querySelector("#score-" + jugadorActivo).textContent =
    puntuacion[jugadorActivo];

  //comprobar si el jugador gano
  if (puntuacion[jugadorActivo] >= 20) {
    document.querySelector("#name-" + jugadorActivo).textContent = "Ganador !";
    document.querySelector(".dice").style.display = "none";
    document
      .querySelector(".player-" + jugadorActivo + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + jugadorActivo + "-panel")
      .classList.remove("active");
  } else {
    //turno del siguiente jugador
    siguienteJugador();
  }
});