import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBL_nhdEDyLD_3HnhjZ14LOYLCjaxOwJyY",
  authDomain: "alpha-deed-management.firebaseapp.com",
  projectId: "alpha-deed-management",
  storageBucket: "alpha-deed-management.firebasestorage.app",
  messagingSenderId: "460540818357",
  appId: "1:460540818357:web:ae0aac3ef01d690774dffc",
  measurementId: "G-GZK5JDLCEZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUserProfile = null;
let fieldDeeds = [];

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = 'index.html';
    return;
  }
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  if (!userDoc.exists()) {
    alert("প্রোফাইল তথ্য নেই!");
    window.location.href = 'index.html';
    return;
  }
  currentUserProfile = { uid: user.uid, ...userDoc.data() };
  document.getElementById('roleBadge').textContent = currentUserProfile.role;
  document.getElementById('officeInfo').textContent = `অফিস: ${currentUserProfile.officeCode || 'N/A'}`;
  if (currentUserProfile.bmCode) {
    const b = document.getElementById('bmCodeBadge');
    b.textContent = `BM: ${currentUserProfile.bmCode}`;
    b.classList.remove('hidden');
  }
  subscribeToDeeds();
});

document.getElementById('logoutBtn').onclick = () => signOut(auth).then(() => window.location.href = 'index.html');

function subscribeToDeeds() {
  let q;
  const deedsRef = collection(db, 'deeds');
  if (['sm', 'asm'].includes(currentUserProfile.role)) {
    q = query(deedsRef, where('branchName', '==', currentUserProfile.officeCode));
  } else {
    q = query(deedsRef, where('branchName', '==', currentUserProfile.officeCode), where('bmCode', '==', currentUserProfile.bmCode));
  }

  onSnapshot(q, (snapshot) => {
    fieldDeeds = [];
    snapshot.forEach(docSnap => fieldDeeds.push({ id: docSnap.id, ...docSnap.data() }));
    updateMetrics(fieldDeeds);
    renderDeeds(fieldDeeds);
  });
}

function updateMetrics(deeds) {
  let p = 0, r = 0, d = 0;
  deeds.forEach(item => {
    if (item.status === 'Delivered') d++;
    else if (item.status === 'Received at Office') r++;
    else p++;
  });
  document.getElementById('statTotal').textContent = deeds.length;
  document.getElementById('statPending').textContent = p;
  document.getElementById('statReceived').textContent = r;
  document.getElementById('statDelivered').textContent = d;
}

function renderDeeds(deeds) {
  const desktopTbody = document.getElementById('desktopTableBody');
  const mobileContainer = document.getElementById('mobileCardContainer');
  document.getElementById('resultCount').textContent = `${deeds.length} টি দলিল পাওয়া গেছে`;

  if (deeds.length === 0) {
    desktopTbody.innerHTML = `<tr><td colspan="7" class="text-center p-8 text-slate-400">কোনো দলিলের রেকর্ড পাওয়া যায়নি।</td></tr>`;
    mobileContainer.innerHTML = `<div class="p-8 text-center text-slate-400">কোনো দলিলের রেকর্ড পাওয়া যায়নি।</div>`;
    return;
  }

  desktopTbody.innerHTML = deeds.map(d => `
    <tr class="hover:bg-slate-50 transition">
      <td class="p-3.5 font-mono text-xs">${d.refNo || 'N/A'}</td>
      <td class="p-3.5 font-bold text-emerald-700">${d.policyNo}</td>
      <td class="p-3.5 font-medium">${d.policyHolderName}</td>
      <td class="p-3.5"><div>${d.bmName}</div><div class="text-xs text-slate-400 font-mono">${d.bmCode}</div></td>
      <td class="p-3.5 text-xs">${d.incomingDate || 'N/A'}</td>
      <td class="p-3.5"><span class="px-2 py-0.5 rounded-full text-xs font-bold ${d.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}">${d.status}</span></td>
      <td class="p-3.5 text-xs">${d.deliveredTo ? `<b>${d.deliveredTo}</b> (${d.deliveryDate})` : 'অফিসে সংরক্ষিত'}</td>
    </tr>
  `).join('');

  mobileContainer.innerHTML = deeds.map(d => `
    <div class="p-4 space-y-2">
      <div class="flex justify-between items-start">
        <div>
          <span class="text-xs font-mono text-slate-400">${d.refNo}</span>
          <div class="text-base font-bold text-emerald-800">${d.policyNo}</div>
        </div>
        <span class="px-2 py-0.5 rounded text-xs font-bold ${d.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}">${d.status}</span>
      </div>
      <div class="text-sm font-semibold">${d.policyHolderName}</div>
      <div class="text-xs text-slate-500">BM: ${d.bmName} (${d.bmCode}) | তারিখ: ${d.incomingDate || 'N/A'}</div>
      ${d.deliveredTo ? `<div class="mt-2 text-xs bg-emerald-50 p-2 rounded border border-emerald-100 font-semibold text-emerald-800">গ্রহীতা: ${d.deliveredTo} (${d.deliveryDate})</div>` : ''}
    </div>
  `).join('');
}

function applyFilters() {
  const s = document.getElementById('searchPolicy').value.toLowerCase().trim();
  const st = document.getElementById('filterStatus').value;
  const res = fieldDeeds.filter(d => {
    return (s ? (d.policyNo?.toLowerCase().includes(s) || d.policyHolderName?.toLowerCase().includes(s)) : true) &&
           (st ? d.status === st : true);
  });
  renderDeeds(res);
}

document.getElementById('searchPolicy').oninput = applyFilters;
document.getElementById('filterStatus').onchange = applyFilters;
document.getElementById('refreshBtn').onclick = () => renderDeeds(fieldDeeds);