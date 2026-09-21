(function initUIStyles() {
  if (document['\u0067\u0065\u0074\u0045\u006C\u0065\u006D\u0065\u006E\u0074\u0042\u0079\u0049\u0064']("\u0075\u0069\u002D\u0075\u0074\u0069\u006C\u0073\u002D\u0073\u0074\u0079\u006C\u0065\u0073")) return;
  let _0xb85bcb;
  const _0x6ed = document['\u0063\u0072\u0065\u0061\u0074\u0065\u0045\u006C\u0065\u006D\u0065\u006E\u0074']("\u0073\u0074\u0079\u006C\u0065");
  _0xb85bcb = (952639 ^ 952634) + (194631 ^ 194630);
  _0x6ed['\u0069\u0064'] = "\u0075\u0069\u002D\u0075\u0074\u0069\u006C\u0073\u002D\u0073\u0074\u0079\u006C\u0065\u0073";
  _0x6ed['\u0074\u0065\u0078\u0074\u0043\u006F\u006E\u0074\u0065\u006E\u0074'] = `
    .toast-container {
      position: fixed;
      top: 1.25rem;
      right: 1.25rem;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
      max-width: 24rem;
      width: calc(100% - 2.5rem);
      pointer-events: none;
    }
    .toast-card {
      pointer-events: auto;
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 0.875rem 1rem;
      border-radius: 0.875rem;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.2);
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 500;
      color: #fff;
      transform: translateY(-20px);
      opacity: 0;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
      backdrop-filter: blur(12px);
    }
    .toast-card.show {
      transform: translateY(0);
      opacity: 1;
    }
    .toast-card.hide {
      transform: translateY(-10px);
      opacity: 0;
    }
    .toast-success {
      background: linear-gradient(135deg, #065f46 0%, #047857 100%);
      border: 1px solid #10b98155;
    }
    .toast-error {
      background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%);
      border: 1px solid #ef444455;
    }
    .toast-warning {
      background: linear-gradient(135deg, #78350f 0%, #92400e 100%);
      border: 1px solid #f59e0b55;
    }
    .toast-info {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border: 1px solid #47556955;
    }

    /* Modal Backdrop */
    .custom-modal-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(4px);
      z-index: 9998;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      animation: fadeIn 0.2s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes scaleIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .custom-modal-box {
      animation: scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
  `;
  document['\u0068\u0065\u0061\u0064']['\u0061\u0070\u0070\u0065\u006E\u0064\u0043\u0068\u0069\u006C\u0064'](_0x6ed);
})();
let toastContainer = null;
function getToastContainer() {
  if (!toastContainer) {
    toastContainer = document['\u0063\u0072\u0065\u0061\u0074\u0065\u0045\u006C\u0065\u006D\u0065\u006E\u0074']("\u0064\u0069\u0076");
    toastContainer['\u0063\u006C\u0061\u0073\u0073\u004E\u0061\u006D\u0065'] = "\u0074\u006F\u0061\u0073\u0074\u002D\u0063\u006F\u006E\u0074\u0061\u0069\u006E\u0065\u0072";
    document['\u0062\u006F\u0064\u0079']['\u0061\u0070\u0070\u0065\u006E\u0064\u0043\u0068\u0069\u006C\u0064'](toastContainer);
  }
  return toastContainer;
}
function _0x3394ac(message, type = 'info', duration = 672273 ^ 675773) {
  const _0x31481f = getToastContainer();
  var _0x5ddad = (956062 ^ 956062) + (590728 ^ 590730);
  const _0xcbedb = document['\u0063\u0072\u0065\u0061\u0074\u0065\u0045\u006C\u0065\u006D\u0065\u006E\u0074']("\u0064\u0069\u0076");
  _0x5ddad = '\u006D\u0069\u006B\u0064\u0070\u006D';
  _0xcbedb['\u0063\u006C\u0061\u0073\u0073\u004E\u0061\u006D\u0065'] = `toast-card toast-${type}`;
  let _0xe2b8b;
  const _0xda0cg = {
    '\u0073\u0075\u0063\u0063\u0065\u0073\u0073': `<svg class="w-5 h-5 text-emerald-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`,
    "error": `<svg class="w-5 h-5 text-red-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`,
    '\u0077\u0061\u0072\u006E\u0069\u006E\u0067': `<svg class="w-5 h-5 text-amber-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
    "info": `<svg class="w-5 h-5 text-cyan-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
  };
  _0xe2b8b = 153377 ^ 153384;
  _0xcbedb['\u0069\u006E\u006E\u0065\u0072\u0048\u0054\u004D\u004C'] = `
    ${_0xda0cg[type] || _0xda0cg['\u0069\u006E\u0066\u006F']}
    <div class="flex-1">${message}</div>
    <button type="button" class="text-white/60 hover:text-white ml-2 flex-shrink-0">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  `;
  var _0xe1f = (331025 ^ 331030) + (955564 ^ 955560);
  const _0xb5c92a = _0xcbedb['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072']('button');
  _0xe1f = "paooei";
  const _0xcg2d6a = () => {
    _0xcbedb['\u0063\u006C\u0061\u0073\u0073\u004C\u0069\u0073\u0074']['\u0072\u0065\u006D\u006F\u0076\u0065']("\u0073\u0068\u006F\u0077");
    _0xcbedb['\u0063\u006C\u0061\u0073\u0073\u004C\u0069\u0073\u0074']['\u0061\u0064\u0064']('hide');
    setTimeout(() => {
      if (_0xcbedb['\u0070\u0061\u0072\u0065\u006E\u0074\u0045\u006C\u0065\u006D\u0065\u006E\u0074']) _0xcbedb['\u0070\u0061\u0072\u0065\u006E\u0074\u0045\u006C\u0065\u006D\u0065\u006E\u0074']['\u0072\u0065\u006D\u006F\u0076\u0065\u0043\u0068\u0069\u006C\u0064'](_0xcbedb);
    }, 791796 ^ 791566);
  };
  _0xb5c92a['\u006F\u006E\u0063\u006C\u0069\u0063\u006B'] = _0xcg2d6a;
  _0x31481f['\u0061\u0070\u0070\u0065\u006E\u0064\u0043\u0068\u0069\u006C\u0064'](_0xcbedb);
  requestAnimationFrame(() => _0xcbedb['\u0063\u006C\u0061\u0073\u0073\u004C\u0069\u0073\u0074']['\u0061\u0064\u0064']('show'));
  if (duration > (862367 ^ 862367)) {
    setTimeout(_0xcg2d6a, duration);
  }
}
export { _0x3394ac as showToast };
function _0x687ce({
  "title": title = "নিশ্চিতকরণ",
  "message": message = "আপনি কি নিশ্চিতভাবে এই কাজটি সম্পন্ন করতে চান?",
  '\u0063\u006F\u006E\u0066\u0069\u0072\u006D\u0054\u0065\u0078\u0074': confirmText = "\u09B9\u09CD\u09AF\u09BE\u0981\u002C\u0020\u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4",
  '\u0063\u0061\u006E\u0063\u0065\u006C\u0054\u0065\u0078\u0074': cancelText = "\u09AC\u09BE\u09A4\u09BF\u09B2",
  "isDanger": isDanger = !![]
}) {
  return new Promise(resolve => {
    var _0xd7g1f = (280109 ^ 280101) + (142816 ^ 142817);
    const _0xg8b1ec = document['\u0063\u0072\u0065\u0061\u0074\u0065\u0045\u006C\u0065\u006D\u0065\u006E\u0074']('div');
    _0xd7g1f = 844408 ^ 844401;
    _0xg8b1ec['\u0063\u006C\u0061\u0073\u0073\u004E\u0061\u006D\u0065'] = 'custom-modal-backdrop';
    var _0xf34f = (417951 ^ 417945) + (252020 ^ 252021);
    const _0xb9ca3a = isDanger ? 'bg-red-600 hover:bg-red-700 text-white' : "\u0062\u0067\u002D\u0069\u006E\u0064\u0069\u0067\u006F\u002D\u0036\u0030\u0030\u0020\u0068\u006F\u0076\u0065\u0072\u003A\u0062\u0067\u002D\u0069\u006E\u0064\u0069\u0067\u006F\u002D\u0037\u0030\u0030\u0020\u0074\u0065\u0078\u0074\u002D\u0077\u0068\u0069\u0074\u0065";
    _0xf34f = (755351 ^ 755346) + (264108 ^ 264101);
    _0xg8b1ec['\u0069\u006E\u006E\u0065\u0072\u0048\u0054\u004D\u004C'] = `
      <div class="custom-modal-box bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl text-slate-200 space-y-4">
        <div class="flex items-center gap-3">
          <div class="p-2.5 rounded-xl ${isDanger ? "\u0062\u0067\u002D\u0072\u0065\u0064\u002D\u0039\u0035\u0030\u002F\u0038\u0030\u0020\u0074\u0065\u0078\u0074\u002D\u0072\u0065\u0064\u002D\u0034\u0030\u0030\u0020\u0062\u006F\u0072\u0064\u0065\u0072\u0020\u0062\u006F\u0072\u0064\u0065\u0072\u002D\u0072\u0065\u0064\u002D\u0038\u0030\u0030\u002F\u0036\u0030" : 'bg-indigo-950/80 text-indigo-400 border border-indigo-800/60'}">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <h3 class="text-base font-bold text-white">${title}</h3>
        </div>
        <p class="text-sm text-slate-300 leading-relaxed">${message}</p>
        <div class="flex justify-end gap-2.5 pt-2">
          <button id="cancelModalBtn" type="button" class="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
            ${cancelText}
          </button>
          <button id="confirmModalBtn" type="button" class="px-4 py-2 text-xs font-semibold rounded-lg ${_0xb9ca3a} transition shadow-md">
            ${confirmText}
          </button>
        </div>
      </div>
    `;
    document['\u0062\u006F\u0064\u0079']['\u0061\u0070\u0070\u0065\u006E\u0064\u0043\u0068\u0069\u006C\u0064'](_0xg8b1ec);
    var _0xge3cga = (391242 ^ 391240) + (292667 ^ 292669);
    const _0x25ef4d = () => {
      if (_0xg8b1ec['\u0070\u0061\u0072\u0065\u006E\u0074\u0045\u006C\u0065\u006D\u0065\u006E\u0074']) _0xg8b1ec['\u0070\u0061\u0072\u0065\u006E\u0074\u0045\u006C\u0065\u006D\u0065\u006E\u0074']['\u0072\u0065\u006D\u006F\u0076\u0065\u0043\u0068\u0069\u006C\u0064'](_0xg8b1ec);
    };
    _0xge3cga = "bjnpfo";
    _0xg8b1ec['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072']("\u0023\u0063\u006F\u006E\u0066\u0069\u0072\u006D\u004D\u006F\u0064\u0061\u006C\u0042\u0074\u006E")['\u006F\u006E\u0063\u006C\u0069\u0063\u006B'] = () => {
      _0x25ef4d();
      resolve(!![]);
    };
    _0xg8b1ec['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072']("\u0023\u0063\u0061\u006E\u0063\u0065\u006C\u004D\u006F\u0064\u0061\u006C\u0042\u0074\u006E")['\u006F\u006E\u0063\u006C\u0069\u0063\u006B'] = () => {
      _0x25ef4d();
      resolve(false);
    };
    _0xg8b1ec['\u006F\u006E\u0063\u006C\u0069\u0063\u006B'] = e => {
      if (e['\u0074\u0061\u0072\u0067\u0065\u0074'] === _0xg8b1ec) {
        _0x25ef4d();
        resolve(false);
      }
    };
  });
}
export { _0x687ce as showConfirmModal };
function _0xdb9g1e({
  "title": title = "ইনপুট দিন",
  '\u006D\u0065\u0073\u0073\u0061\u0067\u0065': message = "অনুগ্রহ করে প্রয়োজনীয় তথ্য প্রদান করুন:",
  "defaultValue": defaultValue = "",
  '\u0070\u006C\u0061\u0063\u0065\u0068\u006F\u006C\u0064\u0065\u0072': placeholder = "",
  "inputType": inputType = "\u0074\u0065\u0078\u0074",
  "confirmText": confirmText = "\u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09A3",
  '\u0063\u0061\u006E\u0063\u0065\u006C\u0054\u0065\u0078\u0074': cancelText = "\u09AC\u09BE\u09A4\u09BF\u09B2"
}) {
  return new Promise(resolve => {
    const _0x48c = document['\u0063\u0072\u0065\u0061\u0074\u0065\u0045\u006C\u0065\u006D\u0065\u006E\u0074']("\u0064\u0069\u0076");
    _0x48c['\u0063\u006C\u0061\u0073\u0073\u004E\u0061\u006D\u0065'] = "\u0063\u0075\u0073\u0074\u006F\u006D\u002D\u006D\u006F\u0064\u0061\u006C\u002D\u0062\u0061\u0063\u006B\u0064\u0072\u006F\u0070";
    _0x48c['\u0069\u006E\u006E\u0065\u0072\u0048\u0054\u004D\u004C'] = `
      <div class="custom-modal-box bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl text-slate-200 space-y-4">
        <h3 class="text-base font-bold text-white">${title}</h3>
        <p class="text-sm text-slate-300">${message}</p>
        <form id="promptForm" class="space-y-4">
          <input 
            type="${inputType}" 
            id="promptInput" 
            value="${defaultValue}" 
            placeholder="${placeholder}"
            required
            class="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none text-sm transition"
          />
          <div class="flex justify-end gap-2.5 pt-2">
            <button id="cancelPromptBtn" type="button" class="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
              ${cancelText}
            </button>
            <button type="submit" class="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-md">
              ${confirmText}
            </button>
          </div>
        </form>
      </div>
    `;
    document['\u0062\u006F\u0064\u0079']['\u0061\u0070\u0070\u0065\u006E\u0064\u0043\u0068\u0069\u006C\u0064'](_0x48c);
    const _0x8eed = _0x48c['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072']("\u0023\u0070\u0072\u006F\u006D\u0070\u0074\u0049\u006E\u0070\u0075\u0074");
    _0x8eed['\u0066\u006F\u0063\u0075\u0073']();
    _0x8eed['\u0073\u0065\u006C\u0065\u0063\u0074']();
    const _0x8bbf1f = () => {
      if (_0x48c['\u0070\u0061\u0072\u0065\u006E\u0074\u0045\u006C\u0065\u006D\u0065\u006E\u0074']) _0x48c['\u0070\u0061\u0072\u0065\u006E\u0074\u0045\u006C\u0065\u006D\u0065\u006E\u0074']['\u0072\u0065\u006D\u006F\u0076\u0065\u0043\u0068\u0069\u006C\u0064'](_0x48c);
    };
    _0x48c['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072']('#promptForm')['\u006F\u006E\u0073\u0075\u0062\u006D\u0069\u0074'] = e => {
      e['\u0070\u0072\u0065\u0076\u0065\u006E\u0074\u0044\u0065\u0066\u0061\u0075\u006C\u0074']();
      const _0x142c = _0x8eed['\u0076\u0061\u006C\u0075\u0065']['\u0074\u0072\u0069\u006D']();
      _0x8bbf1f();
      resolve(_0x142c);
    };
    _0x48c['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072']("\u0023\u0063\u0061\u006E\u0063\u0065\u006C\u0050\u0072\u006F\u006D\u0070\u0074\u0042\u0074\u006E")['\u006F\u006E\u0063\u006C\u0069\u0063\u006B'] = () => {
      _0x8bbf1f();
      resolve(null);
    };
    _0x48c['\u006F\u006E\u0063\u006C\u0069\u0063\u006B'] = e => {
      if (e['\u0074\u0061\u0072\u0067\u0065\u0074'] === _0x48c) {
        _0x8bbf1f();
        resolve(null);
      }
    };
  });
}
export { _0xdb9g1e as showPromptModal };
