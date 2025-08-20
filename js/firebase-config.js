<script type="module">
  // 🔥 Charger Firebase (mode compat pour HTML simple)
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js';
  import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js';
  import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js';

  // 🔐 Ta configuration Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAGD3U5XUqQuhxP2JxxltnNnCPLk3CIVDw",
    authDomain: "gestion-financiere-tnd.firebaseapp.com",
    projectId: "gestion-financiere-tnd",
    storageBucket: "gestion-financiere-tnd.firebasestorage.app",
    messagingSenderId: "891261280632",
    appId: "1:891261280632:web:0a4c9b408e7d078745688d",
    measurementId: "G-WDFVCES5D0"
  };

  // ✅ Initialiser Firebase
  const app = initializeApp(firebaseConfig);

  // ✅ Services disponibles partout
  const auth = getAuth();
  const db = getFirestore();

  // 🛠️ Optionnel : si tu veux analytics
  // import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics-compat.js';
  // const analytics = getAnalytics(app);
</script>
