import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

const loginForm = document.getElementById('loginForm');
const errorAlert = document.getElementById('errorAlert');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');

function showError(message) {
  errorAlert.textContent = message;
  errorAlert.classList.remove('hidden');
}

function setBtnLoading(isLoading) {
  if (isLoading) {
    btnText.textContent = "যাচাই করা হচ্ছে...";
    btnLoader.classList.remove('hidden');
  } else {
    btnText.textContent = "লগইন করুন";
    btnLoader.classList.add('hidden');
  }
}

async function redirectByRole(user) {
  try {
    const userDocRef = doc(db, 'users', user.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const role = userData.role;

      if (role === 'super_admin') {
        window.location.href = 'admin-dashboard.html';
      } else if (role === 'it_officer') {
        window.location.href = 'it-dashboard.html';
      } else if (['sm', 'asm', 'bm', 'um', 'fa'].includes(role)) {
        window.location.href = 'field-dashboard.html';
      } else {
        showError("আপনার অ্যাকাউন্টে কোনো নির্ধারিত রোল (Role) পাওয়া যায়নি।");
        setBtnLoading(false);
      }
    } else {
      showError("ডাটাবেজে আপনার প্রোফাইল পাওয়া যায়নি। আইটি এডমিনের সাথে যোগাযোগ করুন।");
      setBtnLoading(false);
    }
  } catch (err) {
    showError("ডেটা লোড করতে সমস্যা হয়েছে: " + err.message);
    setBtnLoading(false);
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    setBtnLoading(true);
    redirectByRole(user);
  }
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorAlert.classList.add('hidden');
  setBtnLoading(true);

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await redirectByRole(userCredential.user);
  } catch (error) {
    setBtnLoading(false);
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      showError("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
    } else if (error.code === 'auth/too-many-requests') {
      showError("অতিরিক্ত ভুল চেষ্টার কারণে সাময়িকভাবে ব্লক করা হয়েছে। কিছুক্ষণ পর চেষ্টা করুন।");
    } else {
      showError("লগইন ত্রুটি: " + error.message);
    }
  }
});