
// Configuración de Firebase
const firebaseConfig = {
  // Coloca aquí tu configuración de Firebase
  apiKey: "AIzaSyDFxPNu_LJY-bANvpD0QLtPSKuRDBQEDxg",
  authDomain: "tutorial-538a4.firebaseapp.com",
  projectId: "tutorial-538a4",
  storageBucket: "tutorial-538a4.appspot.com",
  messagingSenderId: "453631372977",
  appId: "1:453631372977:web:87e5815fb4762737737c90"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

new Vue({
  el: '#app',
  data() {
    return {
      mostrarDiv: false,
      mostrarDivJuego: true,
      ocultarDivJuegos:false,
      ocultarDivJugadores: true,
      nuevoJugador: '',
      mostrarNombre: false,
      jugadores: [],
      preguntaActual: {
        tipo: '',
        pregunta: ''
      },
      id: '',
      girando: false,
      seleccionado: '',
      mostrarModal: false,
      degrees: null,
      eleccion: '',
      preguntas: {
        retos: [],
        verdades: []
      },
      preguntaActual: {
        tipo: '',
        pregunta: ''
      },
      retos: '',
      nuevaPregunta: '',
      tipoPregunta: ''
    };
  },
  methods: {
    agregarJugador() {
      if (this.nuevoJugador.trim() !== '') {
        db.collection('jugadores').add({ nombre: this.nuevoJugador })
          .then(() => {
            this.nuevoJugador = '';
            console.log('Jugador agregado correctamente');
          })
          .catch((error) => {
            console.error('Error al agregar el jugador:', error);
          });
      }
    },
    elegirVerdadReto(tipo) {
      this.eleccion = tipo;
      const preguntas = this.preguntas[tipo + 's'];
      const randomIndex = Math.floor(Math.random() * preguntas.length);
      this.preguntaActual.tipo = tipo;
      this.preguntaActual.pregunta = preguntas[randomIndex];
      $('#exampleModalToggle2').modal('show'); // Si estás utilizando jQuery
      $('#exampleModal').modal('hide'); // Si estás utilizando jQuery
    },

    deleteJugador(id) {
      db.collection("jugadores").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    },

    girarRuleta() {
      this.girando = true;
      const degrees = Math.floor(Math.random() * 360) + 720; // Número aleatorio entre 720 y 1080 grados
      setTimeout(() => {
        this.girando = false;
        this.seleccionarNombre();
        $('#exampleModal').modal('show'); // Si estás utilizando jQuery
      }, 4000); // Esperar 4 segundos antes de seleccionar el nombre

      this.degrees = degrees; // Asignar el número de grados a una propiedad de datos en Vue
      this.mostrarDiv = true;
    },

    seleccionarNombre() {
      const names = document.querySelectorAll('.name');
      const randomIndex = Math.floor(Math.random() * names.length);
      this.seleccionado = names[randomIndex].textContent;
      console.log(this.seleccionado);
    },
    ocultarDiv() {
      this.mostrarDiv = true;
      this.ocultarDivJugadores= false;
    },
    ocultarDivJuego() {
      this.mostrarDivJuego = false;
      this. ocultarDivJuegos= true;
      console.log('ahi estoy pendejo');
    },
    addQuestionsQR() {
      $('#exampleModal3').modal('show'); // Si estás utilizando jQuery
    },
    agregarPreguntasPredefinidas() {
      // Obtener las preguntas de la colección "preguntas" en Firebase
      const colecciones = ["retos", "verdades"]; // Agrega aquí los nombres de las colecciones que deseas consultar
      colecciones.forEach((coleccion) => {
        db.collection(coleccion)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const retos = doc.data().reto;
              const verdades = doc.data().verdad;
              if (retos !== undefined ) {
                this.preguntas.retos.push(retos);
                console.log(retos);
              }
              if (verdades !== undefined) {
                 this.preguntas.verdades.push(verdades);
                console.log(verdades);
              }


            });
          })
          .catch((error) => {
            console.error(`Error al obtener las preguntas de la colección ${coleccion}:`, error);
          });
      });
    }
  },
  mounted() {
    const self = this;
    db.collection('jugadores').onSnapshot((snapshot) => {
      self.jugadores = [];
      snapshot.forEach((doc) => {
        self.jugadores.push({ id: doc.id, nombre: doc.data().nombre });
      });
    });

    this.agregarPreguntasPredefinidas();
    setTimeout(() => {
      this.ocultarDivJuegos = true;
      this.mostrarDivJuego=false;
    }, 6000);
  },
computed() {

},
});

