let depenses = [];
let revenus = [];

 Menu
document.getElementById('menuBtn').addEventListener('click', () = {
  document.getElementById('sidebar').classList.toggle('open');
});

 Déconnexion
document.getElementById('logoutBtn').addEventListener('click', () = {
  auth.signOut().then(() = window.location.href = 'index.html');
});

 Charger les données
function loadData() {
  const user = auth.currentUser;
  if (!user) return;

  db.collection('users').doc(user.uid).collection('transactions')
    .orderBy('date', 'desc')
    .onSnapshot(snap = {
      depenses = [];
      revenus = [];
      snap.forEach(doc = {
        const data = doc.data();
        if (data.type === 'depense') depenses.push(data);
        if (data.type === 'revenu') revenus.push(data);
      });
      afficherDepenses();
      afficherRevenus();
      calculerSolde();
    });
}

function ajouterDepense() {
  const type = document.getElementById('type').value;
  const montant = parseFloat(document.getElementById('montantDepense').value);
  const date = document.getElementById('dateDepense').value;
  const user = auth.currentUser;

  if (!type  !montant  !date  !user) return;

  db.collection('users').doc(user.uid).collection('transactions').add({
    type 'depense',
    typeDepense type,
    montant,
    date,
    timestamp new Date()
  });

  document.getElementById('type').value = '';
  document.getElementById('montantDepense').value = '';
  document.getElementById('dateDepense').value = '';
}

function ajouterRevenu() {
  const source = document.getElementById('source').value;
  const montant = parseFloat(document.getElementById('montantRevenu').value);
  const date = document.getElementById('dateRevenu').value;
  const user = auth.currentUser;

  if (!source  !montant  !date  !user) return;

  db.collection('users').doc(user.uid).collection('transactions').add({
    type 'revenu',
    source,
    montant,
    date,
    timestamp new Date()
  });

  document.getElementById('source').value = '';
  document.getElementById('montantRevenu').value = '';
  document.getElementById('dateRevenu').value = '';
}

function afficherDepenses() {
  const tbody = document.querySelector('#depensesTable tbody');
  tbody.innerHTML = '';
  depenses.forEach(d = {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      td${d.typeDepense}td
      td${d.montant.toFixed(3)} TNDtd
      td${d.date}td
      tdbutton onclick=supprimer('${d.id}')🗑️buttontd
    `;
    tbody.appendChild(tr);
  });
}

function afficherRevenus() {
  const tbody = document.querySelector('#revenusTable tbody');
  tbody.innerHTML = '';
  revenus.forEach(r = {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      td${r.source}td
      td${r.montant.toFixed(3)} TNDtd
      td${r.date}td
      tdbutton onclick=supprimer('${r.id}')🗑️buttontd
    `;
    tbody.appendChild(tr);
  });
}

function calculerSolde() {
  const totalRev = revenus.reduce((a, b) = a + b.montant, 0);
  const totalDep = depenses.reduce((a, b) = a + b.montant, 0);
  document.getElementById('solde').textContent = (totalRev - totalDep).toFixed(3) + ' TND';
}

 Vérifier l'auth
auth.onAuthStateChanged(user = {
  if (user && window.location.pathname.includes('dashboard.html')) {
    loadData();
  } else if (!user && window.location.pathname.includes('dashboard.html')) {
    window.location.href = 'login.html';
  }
});