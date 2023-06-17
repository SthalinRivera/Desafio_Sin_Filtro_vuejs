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
      retos: '',
      verdades: '',
      nuevoPregunta: '',
    }
  },
  methods: {
    agregarRetos() {
      if (this.nuevoPregunta.trim() !== '') {
        db.collection('retos').add({ reto: this.nuevoPregunta })
          .then(() => {
            this.nuevoPregunta = '';
            console.log('reto agregado correctamente');
          })
          .catch((error) => {
            console.error('Error al agregar el reto:', error);
          });
      }
    },
    deleterRetos(id) {
      db.collection("retos").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    },
    agregarVerdades() {
      if (this.nuevoPregunta.trim() !== '') {
        db.collection('verdades').add({ verdad: this.nuevoPregunta })
          .then(() => {
            this.nuevoPregunta = '';
            console.log('verdad agregado correctamente');
          })
          .catch((error) => {
            console.error('Error al agregar el verdad:', error);
          });
      }
    },
    deleteVerdad(id) {
      db.collection("verdades").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }
  },
  mounted() {
    db.collection('retos').onSnapshot((snapshot) => {
      this.retos = [];
      snapshot.forEach((doc) => {
        this.retos.push({ id: doc.id, reto: doc.data().reto });
      });
    });
    db.collection('verdades').onSnapshot((snapshot) => {
      this.verdades = [];
      snapshot.forEach((doc) => {
        this.verdades.push({ id: doc.id, verdad: doc.data().verdad });
      });
    });
  },
});

