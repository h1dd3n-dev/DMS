import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc, collection, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = 'index.html';
    return;
  }
  const userSnap = await getDoc(doc(db, 'users', user.uid));
  if (userSnap.exists() && userSnap.data().role === 'super_admin') {
    document.getElementById('adminEmail').textContent = user.email;
    loadSystemUsers();
    loadGlobalDeeds();
  } else {
    alert("অননুমোদিত অ্যাক্সেস!");
    window.location.href = 'index.html';
  }
});

document.getElementById('logoutBtn').onclick = () => signOut(auth).then(() => window.location.href = 'index.html');

const tabUsersBtn = document.getElementById('tabUsersBtn');
const tabDeedsBtn = document.getElementById('tabDeedsBtn');
const usersSection = document.getElementById('usersSection');
const deedsSection = document.getElementById('deedsSection');

tabUsersBtn.onclick = () => {
  usersSection.classList.remove('hidden');
  deedsSection.classList.add('hidden');
  tabUsersBtn.className = "px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-600 text-white";
  tabDeedsBtn.className = "px-4 py-2 text-sm font-semibold rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700";
};

tabDeedsBtn.onclick = () => {
  deedsSection.classList.remove('hidden');
  usersSection.classList.add('hidden');
  tabDeedsBtn.className = "px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-600 text-white";
  tabUsersBtn.className = "px-4 py-2 text-sm font-semibold rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700";
};

const itModal = document.getElementById('itModal');
document.getElementById('openITModalBtn').onclick = () => itModal.classList.remove('hidden');
document.getElementById('closeITModal').onclick = () => itModal.classList.add('hidden');
document.getElementById('cancelITModal').onclick = () => itModal.classList.add('hidden');

document.getElementById('createITForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('itEmail').value.trim();
  const password = document.getElementById('itPassword').value;
  const branch = document.getElementById('itBranch').value.trim();

  try {
    const secApp = initializeApp(firebaseConfig, "AdminSecAuth");
    const secAuth = getAuth(secApp);
    const cred = await createUserWithEmailAndPassword(secAuth, email, password);

    await setDoc(doc(db, 'users', cred.user.uid), {
      uid: cred.user.uid,
      email: email,
      role: 'it_officer',
      officeCode: branch,
      currentAuthPass: password,
      createdAt: serverTimestamp()
    });

    alert("আইটি অফিসার সফলভাবে তৈরি হয়েছে!");
    document.getElementById('createITForm').reset();
    itModal.classList.add('hidden');
  } catch (err) {
    alert("ত্রুটি: " + err.message);
  }
});

function loadSystemUsers() {
  onSnapshot(collection(db, 'users'), (snapshot) => {
    let itCount = 0;
    const tbody = document.getElementById('userTableBody');
    tbody.innerHTML = snapshot.docs.map(docSnap => {
      const u = docSnap.data();
      if (u.role === 'it_officer') itCount++;
      const isRoot = u.role === 'super_admin';
      const passPending = u.pendingPassword ? `<span class="text-xs bg-amber-900 text-amber-300 px-2 py-0.5 rounded font-mono">Pending: ${u.pendingPassword}</span>` : `<span class="text-xs text-slate-500">Active</span>`;

      return `
        <tr class="hover:bg-slate-800 transition">
          <td class="p-3 font-mono text-xs text-emerald-400 font-semibold">${u.email}</td>
          <td class="p-3"><span class="px-2 py-0.5 text-xs uppercase font-bold rounded bg-slate-900 border border-slate-700">${u.role}</span></td>
          <td class="p-3">${u.officeCode || 'Central'}</td>
          <td class="p-3 font-mono text-xs">${u.bmCode || '—'}</td>
          <td class="p-3">${passPending}</td>
          <td class="p-3 text-center space-x-1">
            ${!isRoot ? `
              <button onclick="adminSetPasswordDirect('${docSnap.id}', '${u.email}')" class="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-2.5 py-1 rounded">পাসওয়ার্ড পরিবর্তন</button>
              <button onclick="adminModifyUser('${docSnap.id}', '${u.role}', '${u.officeCode || ''}', '${u.bmCode || ''}')" class="bg-amber-600 hover:bg-amber-700 text-white text-xs px-2 py-1 rounded">এডিট</button>
              <button onclick="adminDeleteUser('${docSnap.id}', '${u.email}')" class="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded">ডিলিট</button>
            ` : '<span class="text-xs text-slate-500">Protected Root</span>'}
          </td>
        </tr>
      `;
    }).join('');
    document.getElementById('statTotalIT').textContent = itCount;
  });
}

window.adminSetPasswordDirect = async (uid, email) => {
  const newPass = prompt(`'${email}' এর জন্য নতুন পাসওয়ার্ড লিখুন:`);
  if (!newPass) return;
  if (newPass.length < 6) {
    alert("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!");
    return;
  }
  await updateDoc(doc(db, 'users', uid), {
    pendingPassword: newPass,
    lastPasswordResetAt: new Date().toISOString()
  });
  alert(`পাসওয়ার্ড সেট হয়েছে! ইউজার (${newPass}) দিয়ে লগইন করতে পারবেন।`);
};

window.adminModifyUser = async (uid, role, office, bm) => {
  const newRole = prompt("নতুন Role দিন (super_admin / it_officer / sm / asm / bm / um / fa):", role);
  const newOffice = prompt("নতুন সেলস অফিস কোড:", office);
  const newBM = prompt("নতুন BM কোড:", bm);

  if (newRole && newOffice) {
    await updateDoc(doc(db, 'users', uid), {
      role: newRole,
      officeCode: newOffice,
      bmCode: newBM || null
    });
    alert("ইউজার প্রোফাইল সফলভাবে আপডেট হয়েছে!");
  }
};

window.adminDeleteUser = async (uid, email) => {
  if (confirm(`আপনি কি নিশ্চিতভাবে ${email} অ্যাকাউন্টটি ডিলিট করতে চান?`)) {
    await deleteDoc(doc(db, 'users', uid));
    alert("ইউজার ডাটাবেজ থেকে মুছে ফেলা হয়েছে।");
  }
};

function loadGlobalDeeds() {
  onSnapshot(collection(db, 'deeds'), (snapshot) => {
    let officeCount = 0;
    let deliveredCount = 0;
    const tbody = document.getElementById('globalDeedsBody');

    tbody.innerHTML = snapshot.docs.map(docSnap => {
      const d = docSnap.data();
      if (d.status === 'Delivered') deliveredCount++;
      else officeCount++;

      return `
        <tr class="hover:bg-slate-800 transition text-xs">
          <td class="p-3 font-semibold text-slate-200">${d.branchName || 'N/A'}</td>
          <td class="p-3 font-mono text-slate-400">${d.refNo}</td>
          <td class="p-3 font-bold text-emerald-400 font-mono">${d.policyNo}</td>
          <td class="p-3 text-slate-200">${d.policyHolderName}</td>
          <td class="p-3">${d.bmName} (${d.bmCode})</td>
          <td class="p-3 font-bold ${d.status === 'Delivered' ? 'text-emerald-400' : 'text-amber-400'}">${d.status}</td>
          <td class="p-3">${d.deliveredTo ? `${d.deliveredTo} (${d.deliveryDate})` : '—'}</td>
          <td class="p-3 text-center">
            <button onclick="adminDeleteDeed('${docSnap.id}')" class="text-red-400 hover:text-red-300 font-bold">ডিলিট</button>
          </td>
        </tr>
      `;
    }).join('');

    document.getElementById('statTotalDeeds').textContent = snapshot.docs.length;
    document.getElementById('statOfficeDeeds').textContent = officeCount;
    document.getElementById('statDeliveredDeeds').textContent = deliveredCount;
  });
}

window.adminDeleteDeed = async (id) => {
  if (confirm("এই দলিলটি পুরোপুরি মুছে ফেলতে চান?")) {
    await deleteDoc(doc(db, 'deeds', id));
  }
};