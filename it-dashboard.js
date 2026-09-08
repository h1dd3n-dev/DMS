const firebaseConfig = {
  apiKey: "AIzaSyBL_nhdEDyLD_3HnhjZ14LOYLCjaxOwJyY",
  authDomain: "alpha-deed-management.firebaseapp.com",
  projectId: "alpha-deed-management",
  storageBucket: "alpha-deed-management.firebasestorage.app",
  messagingSenderId: "460540818357",
  appId: "1:460540818357:web:ae0aac3ef01d690774dffc",
  measurementId: "G-GZK5JDLCEZ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();

let currentITUser = null;
let allDeeds = [];
let parsedBulkDeeds = [];

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => alert("AI প্রম্পট কপি হয়েছে! এবার আপনার AI-তে গিয়ে ছবির সাথে এটি পেস্ট করুন।"))
      .catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      alert("AI প্রম্পট কপি হয়েছে! এবার আপনার AI-তে গিয়ে ছবির সাথে এটি পেস্ট করুন।");
    } else {
      prompt("নিচের প্রম্পটটি ম্যানুয়ালি কপি করে নিন:", text);
    }
  } catch (err) {
    prompt("নিচের প্রম্পটটি ম্যানুয়ালি কপি করে নিন:", text);
  }
  document.body.removeChild(textArea);
}

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = 'index.html';
    return;
  }
  try {
    const userDoc = await db.collection('users').doc(user.uid).get();
    if (userDoc.exists && userDoc.data().role === 'it_officer') {
      currentITUser = { uid: user.uid, ...userDoc.data() };
      document.getElementById('officeBadge').textContent = `সেলস অফিস: ${currentITUser.officeCode || 'General'}`;
      document.getElementById('userEmailBadge').textContent = user.email;
      loadDeeds();
      loadFieldUsers();
    } else {
      alert("অননুমোদিত প্রবেশ!");
      window.location.href = 'index.html';
    }
  } catch (err) {
    console.error("Auth Guard Error:", err);
  }
});

document.getElementById('logoutBtn').onclick = () => auth.signOut().then(() => window.location.href = 'index.html');

const deedsSection = document.getElementById('deedsSection');
const usersSection = document.getElementById('usersSection');
const tabDeedsBtn = document.getElementById('tabDeedsBtn');
const tabUsersBtn = document.getElementById('tabUsersBtn');

tabDeedsBtn.onclick = () => {
  deedsSection.classList.remove('hidden');
  usersSection.classList.add('hidden');
  tabDeedsBtn.className = "px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-700 text-white transition";
  tabUsersBtn.className = "px-4 py-2 text-sm font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition";
};

tabUsersBtn.onclick = () => {
  usersSection.classList.remove('hidden');
  deedsSection.classList.add('hidden');
  tabUsersBtn.className = "px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-700 text-white transition";
  tabDeedsBtn.className = "px-4 py-2 text-sm font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition";
};

const bulkModal = document.getElementById('bulkModal');
const jsonInputContainer = document.getElementById('jsonInputContainer');
const previewContainer = document.getElementById('previewContainer');
const bulkJsonInput = document.getElementById('bulkJsonInput');
const previewTableBody = document.getElementById('previewTableBody');

document.getElementById('openBulkModalBtn').onclick = () => {
  bulkModal.classList.remove('hidden');
  jsonInputContainer.classList.remove('hidden');
  previewContainer.classList.add('hidden');
  bulkJsonInput.value = '';
};

document.getElementById('closeBulkModal').onclick = () => bulkModal.classList.add('hidden');
document.getElementById('cancelPreviewBtn').onclick = () => bulkModal.classList.add('hidden');

document.getElementById('backToEditJsonBtn').onclick = () => {
  previewContainer.classList.add('hidden');
  jsonInputContainer.classList.remove('hidden');
};

document.getElementById('copyPromptBtn').onclick = () => {
  const promptText = `Extract all insurance deeds from this transmission letter into a strict JSON format. Do not include markdown code block syntax (like \`\`\`json), commentary, or extra text. Output only raw JSON array with objects using this exact schema:

[
  {
    "refNo": "AILIL-02860/2026",
    "policyNo": "010110177896-9",
    "policyHolderName": "MD SHAHIDUL ISLAM",
    "bmCode": "10029061",
    "bmName": "MD. ALAMGIR HOSSAIN",
    "incomingDate": "2026-07-22"
  }
]`;
  copyToClipboard(promptText);
};

document.getElementById('parseJsonBtn').onclick = () => {
  let rawText = bulkJsonInput.value.trim();
  if (!rawText) {
    alert("দয়া করে AI থেকে পাওয়া JSON কোডটি পেস্ট করুন।");
    return;
  }
  rawText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();

  try {
    parsedBulkDeeds = JSON.parse(rawText);
    if (!Array.isArray(parsedBulkDeeds) || parsedBulkDeeds.length === 0) {
      throw new Error("JSON ফরম্যাটটি অ্যারে (Array) নয় অথবা কোনো রেকর্ড পাওয়া যায়নি।");
    }

    document.getElementById('previewCountBadge').textContent = `মোট ${parsedBulkDeeds.length} টি দলিল শনাক্ত হয়েছে`;
    previewTableBody.innerHTML = parsedBulkDeeds.map(d => `
      <tr class="hover:bg-slate-50">
        <td class="p-2.5 font-mono">${d.refNo || 'AILIL-AUTO'}</td>
        <td class="p-2.5 font-bold text-emerald-700">${d.policyNo || 'N/A'}</td>
        <td class="p-2.5 font-semibold">${d.policyHolderName || 'N/A'}</td>
        <td class="p-2.5 font-mono">${d.bmCode || 'N/A'}</td>
        <td class="p-2.5">${d.bmName || 'N/A'}</td>
        <td class="p-2.5">${d.incomingDate || new Date().toISOString().split('T')[0]}</td>
      </tr>
    `).join('');

    jsonInputContainer.classList.add('hidden');
    previewContainer.classList.remove('hidden');
  } catch (err) {
    alert("ভুল JSON ফরম্যাট! কোডটি সঠিকভাবে পেস্ট করুন।\nত্রুটি: " + err.message);
  }
};

document.getElementById('confirmBulkUploadBtn').onclick = async () => {
  if (!parsedBulkDeeds.length) return;
  const btn = document.getElementById('confirmBulkUploadBtn');
  btn.disabled = true;
  btn.textContent = "ডাটাবেজে যুক্ত হচ্ছে...";

  try {
    const batch = db.batch();
    const branch = currentITUser.officeCode || 'Bonpara';

    parsedBulkDeeds.forEach(deed => {
      const docRef = db.collection('deeds').doc();
      batch.set(docRef, {
        refNo: deed.refNo || 'N/A',
        policyNo: deed.policyNo || 'N/A',
        policyHolderName: deed.policyHolderName || 'N/A',
        bmCode: deed.bmCode || 'N/A',
        bmName: deed.bmName || 'N/A',
        branchName: branch,
        status: 'Received at Office',
        incomingDate: deed.incomingDate || new Date().toISOString().split('T')[0],
        deliveryDate: null,
        deliveredTo: null,
        itOfficerId: currentITUser.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    });

    await batch.commit();
    alert(`আলহামদুলিল্লাহ! ${parsedBulkDeeds.length} টি দলিল একসাথে সফলভাবে যুক্ত হয়েছে।`);
    bulkModal.classList.add('hidden');
  } catch (err) {
    alert("বাল্ক আপলোড ত্রুটি: " + err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = "কনফার্ম ও ডাটাবেজে সেভ করুন";
  }
};

document.getElementById('exportBackupBtn').onclick = () => {
  if (!allDeeds.length) {
    alert("ব্যাকআপ নেওয়ার মতো কোনো দলিল নেই।");
    return;
  }
  const headers = ["Reference No,Policy No,Policy Holder Name,BM Code,BM Name,Branch,Status,Incoming Date,Delivery Date,Delivered To"];
  const rows = allDeeds.map(d => [
    `"${d.refNo || ''}"`,
    `"${d.policyNo || ''}"`,
    `"${d.policyHolderName || ''}"`,
    `"${d.bmCode || ''}"`,
    `"${d.bmName || ''}"`,
    `"${d.branchName || ''}"`,
    `"${d.status || ''}"`,
    `"${d.incomingDate || ''}"`,
    `"${d.deliveryDate || ''}"`,
    `"${d.deliveredTo || ''}"`
  ].join(','));

  const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers, ...rows].join("\n");
  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", `Deed_Backup_${currentITUser.officeCode || 'Branch'}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const deedModal = document.getElementById('deedModal');
document.getElementById('openDeedModalBtn').onclick = () => {
  document.getElementById('incomingDate').value = new Date().toISOString().split('T')[0];
  deedModal.classList.remove('hidden');
};
document.getElementById('closeDeedModal').onclick = () => deedModal.classList.add('hidden');
document.getElementById('cancelDeedModal').onclick = () => deedModal.classList.add('hidden');

document.getElementById('deedForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    await db.collection('deeds').add({
      refNo: document.getElementById('refNo').value.trim(),
      policyNo: document.getElementById('policyNo').value.trim(),
      policyHolderName: document.getElementById('policyHolderName').value.trim(),
      bmCode: document.getElementById('bmCode').value.trim(),
      bmName: document.getElementById('bmName').value.trim(),
      branchName: currentITUser.officeCode || 'Bonpara',
      status: 'Received at Office',
      incomingDate: document.getElementById('incomingDate').value,
      deliveryDate: null,
      deliveredTo: null,
      itOfficerId: currentITUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    document.getElementById('deedForm').reset();
    deedModal.classList.add('hidden');
  } catch (err) {
    alert("ত্রুটি: " + err.message);
  }
});

function loadDeeds() {
  db.collection('deeds')
    .where('branchName', '==', currentITUser.officeCode || 'Bonpara')
    .onSnapshot((snapshot) => {
      allDeeds = [];
      snapshot.forEach(doc => allDeeds.push({ id: doc.id, ...doc.data() }));
      renderDeeds(allDeeds);
    });
}

function renderDeeds(deeds) {
  const tbody = document.getElementById('deedsTableBody');
  if (deeds.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center p-6 text-slate-500">কোনো দলিলের রেকর্ড পাওয়া যায়নি।</td></tr>`;
    return;
  }

  tbody.innerHTML = deeds.map(deed => {
    const isOwner = deed.itOfficerId === currentITUser.uid;
    let badge = deed.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : (deed.status === 'Received at Office' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800');
    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="p-3 font-medium">${deed.refNo}</td>
        <td class="p-3 font-semibold text-emerald-700">${deed.policyNo}</td>
        <td class="p-3">${deed.policyHolderName}</td>
        <td class="p-3"><div>${deed.bmName}</div><span class="text-xs text-slate-400 font-mono">${deed.bmCode}</span></td>
        <td class="p-3 text-xs">${deed.incomingDate || 'N/A'}</td>
        <td class="p-3"><span class="text-xs px-2.5 py-1 rounded-full font-bold ${badge}">${deed.status}</span></td>
        <td class="p-3 text-xs">${deed.deliveredTo ? `<b>${deed.deliveredTo}</b><br><span class="text-slate-400">${deed.deliveryDate}</span>` : 'অসম্পূর্ণ'}</td>
        <td class="p-3 text-center space-x-1">
          <button onclick="openDeliveryModal('${deed.id}', '${deed.status}', '${deed.deliveredTo || ''}', '${deed.deliveryDate || ''}')" class="text-xs bg-slate-100 hover:bg-slate-200 border px-2 py-1 rounded">স্ট্যাটাস</button>
          ${isOwner ? `
            <button onclick="editDeedDetails('${deed.id}', '${deed.policyNo}', '${deed.policyHolderName}', '${deed.bmCode}', '${deed.bmName}')" class="text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 px-2 py-1 rounded">এডিট</button>
            <button onclick="deleteDeedRecord('${deed.id}')" class="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded">ডিলিট</button>
          ` : ''}
        </td>
      </tr>
    `;
  }).join('');
}

const deliveryModal = document.getElementById('deliveryModal');
const updateStatusSelect = document.getElementById('updateStatus');
const deliveryFields = document.getElementById('deliveryFields');

updateStatusSelect.onchange = (e) => {
  if (e.target.value === 'Delivered') {
    deliveryFields.classList.remove('hidden');
    document.getElementById('deliveryDate').value = new Date().toISOString().split('T')[0];
  } else {
    deliveryFields.classList.add('hidden');
  }
};

window.openDeliveryModal = (id, status, deliveredTo, deliveryDate) => {
  document.getElementById('editDeedId').value = id;
  updateStatusSelect.value = status;
  if (status === 'Delivered') {
    deliveryFields.classList.remove('hidden');
    document.getElementById('deliveredTo').value = deliveredTo;
    document.getElementById('deliveryDate').value = deliveryDate || new Date().toISOString().split('T')[0];
  } else {
    deliveryFields.classList.add('hidden');
  }
  deliveryModal.classList.remove('hidden');
};

document.getElementById('closeDeliveryModal').onclick = () => deliveryModal.classList.add('hidden');
document.getElementById('cancelDeliveryModal').onclick = () => deliveryModal.classList.add('hidden');

document.getElementById('deliveryForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('editDeedId').value;
  const status = updateStatusSelect.value;
  const payload = {
    status,
    deliveredTo: status === 'Delivered' ? document.getElementById('deliveredTo').value.trim() : null,
    deliveryDate: status === 'Delivered' ? document.getElementById('deliveryDate').value : null
  };
  await db.collection('deeds').doc(id).update(payload);
  deliveryModal.classList.add('hidden');
});

window.editDeedDetails = async (id, currentPolicy, currentHolder, currentBM, currentBMName) => {
  const newPolicy = prompt("পলিসি নং সংশোধন করুন:", currentPolicy);
  const newHolder = prompt("গ্রাহকের নাম সংশোধন করুন:", currentHolder);
  const newBM = prompt("BM কোড সংশোধন করুন:", currentBM);
  const newBMName = prompt("BM-এর নাম সংশোধন করুন:", currentBMName);

  if (newPolicy && newHolder) {
    await db.collection('deeds').doc(id).update({
      policyNo: newPolicy,
      policyHolderName: newHolder,
      bmCode: newBM,
      bmName: newBMName
    });
    alert("দলিল তথ্য সফলভাবে হালনাগাদ করা হয়েছে!");
  }
};

window.deleteDeedRecord = async (id) => {
  if (confirm("আপনি কি নিশ্চিতভাবে এই দলিলটি মুছে ফেলতে চান?")) {
    await db.collection('deeds').doc(id).delete();
  }
};

const userModal = document.getElementById('userModal');
document.getElementById('openUserModalBtn').onclick = () => userModal.classList.remove('hidden');
document.getElementById('closeUserModal').onclick = () => userModal.classList.add('hidden');
document.getElementById('cancelUserModal').onclick = () => userModal.classList.add('hidden');

function loadFieldUsers() {
  db.collection('users')
    .where('createdBy', '==', currentITUser.uid)
    .onSnapshot((snapshot) => {
      const tbody = document.getElementById('usersTableBody');
      if (snapshot.empty) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center p-6 text-slate-500">আপনার তৈরি করা কোনো ফিল্ড অফিসার পাওয়া যায়নি।</td></tr>`;
        return;
      }
      tbody.innerHTML = snapshot.docs.map(docSnap => {
        const u = docSnap.data();
        const passPending = u.pendingPassword ? `<span class="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono">Pending: ${u.pendingPassword}</span>` : `<span class="text-xs text-slate-400">সিঙ্কড</span>`;
        return `
          <tr class="hover:bg-slate-50 transition">
            <td class="p-3 font-medium">${u.email}</td>
            <td class="p-3"><span class="uppercase text-xs font-bold px-2 py-0.5 bg-slate-100 border rounded">${u.role}</span></td>
            <td class="p-3 font-mono text-emerald-700">${u.bmCode || 'N/A'}</td>
            <td class="p-3">${passPending}</td>
            <td class="p-3 text-center space-x-1">
              <button onclick="changeFieldUserPassword('${docSnap.id}', '${u.email}')" class="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded">পাসওয়ার্ড পরিবর্তন</button>
              <button onclick="editFieldUserInfo('${docSnap.id}', '${u.role}', '${u.bmCode || ''}')" class="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded">এডিট</button>
              <button onclick="deleteFieldUserRecord('${docSnap.id}', '${u.email}')" class="text-xs bg-red-50 text-red-700 border border-red-200 px-2 py-1 rounded">ডিলিট</button>
            </td>
          </tr>
        `;
      }).join('');
    });
}

window.changeFieldUserPassword = async (uid, email) => {
  const newPass = prompt(`'${email}' এর জন্য নতুন পাসওয়ার্ড লিখুন (কমপক্ষে ৬ অক্ষর):`);
  if (!newPass) return;
  if (newPass.length < 6) {
    alert("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!");
    return;
  }
  await db.collection('users').doc(uid).update({
    pendingPassword: newPass,
    lastPasswordResetAt: new Date().toISOString()
  });
  alert(`পাসওয়ার্ড সেট হয়েছে! ফিল্ড অফিসার এখন (${newPass}) দিয়ে সরাসরি লগইন করতে পারবেন।`);
};

window.editFieldUserInfo = async (uid, role, bmCode) => {
  const newRole = prompt("নতুন পদবী দিন (bm / um / fa / sm / asm):", role);
  const newBM = prompt("নতুন BM কোড দিন:", bmCode);
  if (newRole) {
    await db.collection('users').doc(uid).update({
      role: newRole,
      bmCode: newBM || null
    });
    alert("ইউজার তথ্য আপডেট হয়েছে!");
  }
};

window.deleteFieldUserRecord = async (uid, email) => {
  if (confirm(`আপনি কি নিশ্চিতভাবে ${email} অ্যাকাউন্টটি ডিলিট করতে চান?`)) {
    await db.collection('users').doc(uid).delete();
    alert("ইউজার ডিলিট করা হয়েছে।");
  }
};

document.getElementById('fieldUserForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('newUserEmail').value.trim();
  const password = document.getElementById('newUserPassword').value;
  const role = document.getElementById('newUserRole').value;
  const bmCode = document.getElementById('newUserBMCode').value.trim();

  try {
    const secondaryApp = firebase.initializeApp(firebaseConfig, "ITSecAuthApp");
    const newUserCredential = await secondaryApp.auth().createUserWithEmailAndPassword(email, password);

    await db.collection('users').doc(newUserCredential.user.uid).set({
      uid: newUserCredential.user.uid,
      email: email,
      role: role,
      bmCode: bmCode,
      officeCode: currentITUser.officeCode || 'Bonpara',
      createdBy: currentITUser.uid,
      currentAuthPass: password,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    await secondaryApp.delete();
    alert("ফিল্ড অফিসার সফলভাবে তৈরি করা হয়েছে!");
    document.getElementById('fieldUserForm').reset();
    userModal.classList.add('hidden');
  } catch (err) {
    alert("ত্রুটি: " + err.message);
  }
});

function applyFilters() {
  const p = document.getElementById('searchPolicy').value.toLowerCase().trim();
  const b = document.getElementById('searchBM').value.toLowerCase().trim();
  const s = document.getElementById('filterStatus').value;

  const res = allDeeds.filter(d => {
    return (p ? d.policyNo && d.policyNo.toLowerCase().includes(p) : true) &&
           (b ? d.bmCode && d.bmCode.toLowerCase().includes(b) : true) &&
           (s ? d.status === s : true);
  });
  renderDeeds(res);
}

document.getElementById('searchPolicy').oninput = applyFilters;
document.getElementById('searchBM').oninput = applyFilters;
document.getElementById('filterStatus').onchange = applyFilters;
document.getElementById('resetFilters').onclick = () => {
  document.getElementById('searchPolicy').value = '';
  document.getElementById('searchBM').value = '';
  document.getElementById('filterStatus').value = '';
  renderDeeds(allDeeds);
};