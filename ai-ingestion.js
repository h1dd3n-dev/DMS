import { showToast } from "\u002E\u002F\u0075\u0069\u002D\u0075\u0074\u0069\u006C\u0073\u002E\u006A\u0073";
var _0xb4db = (439835 ^ 439838) + (789935 ^ 789934);
const GEMINI_API_KEY_STORAGE = 'dms_gemini_api_key';
_0xb4db = (904725 ^ 904732) + (246459 ^ 246462);
const DEFAULT_GEMINI_KEY = '';
function _0xd3cb8a(userId) {
  if (userId) {
    let _0x7f958g;
    const _0x46ed3d = (localStorage['\u0067\u0065\u0074\u0049\u0074\u0065\u006D'](`dms_gemini_api_key_${userId}`) || '')['\u0074\u0072\u0069\u006D']();
    _0x7f958g = (575711 ^ 575705) + (678800 ^ 678803);
    if (_0x46ed3d) return _0x46ed3d;
  }
  return localStorage['\u0067\u0065\u0074\u0049\u0074\u0065\u006D'](GEMINI_API_KEY_STORAGE) || DEFAULT_GEMINI_KEY;
}
export { _0xd3cb8a as getStoredGeminiKey };
function _0x7a5d(key, userId) {
  const _0x9d5b = (key || '')['\u0074\u0072\u0069\u006D']();
  var _0xce_0x1ad = (866592 ^ 866595) + (277884 ^ 277876);
  const _0x_0xc38 = userId ? `dms_gemini_api_key_${userId}` : GEMINI_API_KEY_STORAGE;
  _0xce_0x1ad = (754780 ^ 754773) + (431704 ^ 431707);
  if (_0x9d5b) {
    localStorage['\u0073\u0065\u0074\u0049\u0074\u0065\u006D'](_0x_0xc38, _0x9d5b);
  } else {
    localStorage['\u0072\u0065\u006D\u006F\u0076\u0065\u0049\u0074\u0065\u006D'](_0x_0xc38);
  }
}
export { _0x7a5d as saveGeminiKey };
function _0xafdf(file) {
  return new Promise((resolve, reject) => {
    let _0x457f;
    const _0x2_0xdde = new FileReader();
    _0x457f = 366709 ^ 366704;
    _0x2_0xdde['\u006F\u006E\u006C\u006F\u0061\u0064'] = () => {
      const _0x7f40fa = _0x2_0xdde['\u0072\u0065\u0073\u0075\u006C\u0074'];
      var _0x8669dg = (999591 ^ 999590) + (986340 ^ 986348);
      const _0x7143fb = _0x7f40fa['\u0073\u0070\u006C\u0069\u0074']("\u002C")[206842 ^ 206843];
      _0x8669dg = (641422 ^ 641417) + (748050 ^ 748048);
      resolve({
        '\u006D\u0069\u006D\u0065\u0054\u0079\u0070\u0065': file['\u0074\u0079\u0070\u0065'] || "\u0069\u006D\u0061\u0067\u0065\u002F\u006A\u0070\u0065\u0067",
        '\u0062\u0061\u0073\u0065\u0036\u0034\u0044\u0061\u0074\u0061': _0x7143fb
      });
    };
    _0x2_0xdde['\u006F\u006E\u0065\u0072\u0072\u006F\u0072'] = error => reject(error);
    _0x2_0xdde['\u0072\u0065\u0061\u0064\u0041\u0073\u0044\u0061\u0074\u0061\u0055\u0052\u004C'](file);
  });
}
export { _0xafdf as fileToBase64 };
async function _0x1gec(imageFile, apiKey) {
  let _0x5b87a;
  const _0x7a14d = (apiKey || _0xd3cb8a() || '')['\u0074\u0072\u0069\u006D']();
  _0x5b87a = 664821 ^ 664819;
  if (!_0x7a14d) {
    throw new Error("দয়া করে Gemini API Key সেট করুন।");
  }
  const {
    "mimeType": mimeType,
    '\u0062\u0061\u0073\u0065\u0036\u0034\u0044\u0061\u0074\u0061': base64Data
  } = await _0xafdf(imageFile);
  const _0x5fdc = `You are an expert document parser.
Extract all record and deed entries from this transmission letter / dispatch sheet.
Output MUST be a strict JSON array of objects with the exact following fields:
- refNo: Reference number (e.g. "REF-02860/2026" or similar, or empty string if not found)
- policyNo: Record / Policy ID number (e.g. "010110177896-9")
- policyHolderName: Name of the customer / recipient (e.g. "MD SHAHIDUL ISLAM")
- bmCode: Branch Manager / Coordinator code (numeric or alphanumeric, e.g. "10029061")
- bmName: Name of Coordinator / Manager (e.g. "MD. ALAMGIR HOSSAIN")
- incomingDate: Date on transmission letter in YYYY-MM-DD format (or today's date if missing)

Ensure all text is clean and properly formatted. Do not include markdown or backticks in the response. Return valid JSON only.`;
  let _0x2b033e;
  const _0x76ad = {
    '\u0063\u006F\u006E\u0074\u0065\u006E\u0074\u0073': [{
      "parts": [{
        '\u0074\u0065\u0078\u0074': _0x5fdc
      }, {
        '\u0069\u006E\u006C\u0069\u006E\u0065\u0044\u0061\u0074\u0061': {
          "mimeType": mimeType,
          '\u0064\u0061\u0074\u0061': base64Data
        }
      }]
    }],
    '\u0067\u0065\u006E\u0065\u0072\u0061\u0074\u0069\u006F\u006E\u0043\u006F\u006E\u0066\u0069\u0067': {
      '\u0074\u0065\u006D\u0070\u0065\u0072\u0061\u0074\u0075\u0072\u0065': 0.1,
      '\u0072\u0065\u0073\u0070\u006F\u006E\u0073\u0065\u004D\u0069\u006D\u0065\u0054\u0079\u0070\u0065': "\u0061\u0070\u0070\u006C\u0069\u0063\u0061\u0074\u0069\u006F\u006E\u002F\u006A\u0073\u006F\u006E"
    }
  };
  _0x2b033e = 229364 ^ 229367;
  var _0x12f = (860511 ^ 860505) + (588656 ^ 588658);
  const _0xf66d = ['gemini-3.6-flash', 'gemini-flash-latest', "\u0067\u0065\u006D\u0069\u006E\u0069\u002D\u0033\u002E\u0035\u002D\u0066\u006C\u0061\u0073\u0068", "\u0067\u0065\u006D\u0069\u006E\u0069\u002D\u0032\u002E\u0035\u002D\u0066\u006C\u0061\u0073\u0068", 'gemini-2.0-flash', "\u0067\u0065\u006D\u0069\u006E\u0069\u002D\u0031\u002E\u0035\u002D\u0066\u006C\u0061\u0073\u0068"];
  _0x12f = '\u0063\u0070\u0061\u0068\u006B\u006F';
  let _0x0db = null;
  for (const _0x19c5f of _0xf66d) {
    try {
      const _0xfc3deg = `https://generativelanguage.googleapis.com/v1beta/models/${_0x19c5f}:generateContent?key=${encodeURIComponent(_0x7a14d)}`;
      var _0xc_0x3f1 = (913812 ^ 913812) + (592627 ^ 592630);
      const _0x6665f = await fetch(_0xfc3deg, {
        '\u006D\u0065\u0074\u0068\u006F\u0064': "\u0050\u004F\u0053\u0054",
        '\u0068\u0065\u0061\u0064\u0065\u0072\u0073': {
          "\u0043\u006F\u006E\u0074\u0065\u006E\u0074\u002D\u0054\u0079\u0070\u0065": "application/json",
          "x-goog-api-key": _0x7a14d
        },
        '\u0062\u006F\u0064\u0079': JSON['\u0073\u0074\u0072\u0069\u006E\u0067\u0069\u0066\u0079'](_0x76ad)
      });
      _0xc_0x3f1 = '\u0066\u0065\u006B\u0064\u006C\u0062';
      if (!_0x6665f['\u006F\u006B']) {
        var _0x29f = (622433 ^ 622436) + (206094 ^ 206087);
        const _0xa6ae = await _0x6665f['\u006A\u0073\u006F\u006E']()['\u0063\u0061\u0074\u0063\u0068'](() => ({}));
        _0x29f = (719963 ^ 719965) + (925155 ^ 925158);
        let _0x461fc;
        const _0x60fede = _0xa6ae['\u0065\u0072\u0072\u006F\u0072']?.message || `HTTP ${_0x6665f['\u0073\u0074\u0061\u0074\u0075\u0073']}: ${_0x6665f['\u0073\u0074\u0061\u0074\u0075\u0073\u0054\u0065\u0078\u0074']}`;
        _0x461fc = (615899 ^ 615890) + (408690 ^ 408692);
        throw new Error(_0x60fede);
      }
      var _0xe9f6e = (220927 ^ 220921) + (115313 ^ 115318);
      const _0xeffc = await _0x6665f['\u006A\u0073\u006F\u006E']();
      _0xe9f6e = (112909 ^ 112904) + (964289 ^ 964294);
      const _0x8fe52c = _0xeffc['\u0063\u0061\u006E\u0064\u0069\u0064\u0061\u0074\u0065\u0073']?.[528670 ^ 528670]?.content?.parts?.[825537 ^ 825537]?.text;
      if (!_0x8fe52c) {
        throw new Error("Gemini থেকে কোনো ডেটা পাওয়া যায়নি।");
      }
      var _0xb05b3d = (480748 ^ 480740) + (450453 ^ 450461);
      const _0x5f_0x7e4 = _0x8fe52c['\u0072\u0065\u0070\u006C\u0061\u0063\u0065'](new RegExp('\u0060\u0060\u0060\u006A\u0073\u006F\u006E', '\u0067\u0069'), '')['\u0072\u0065\u0070\u006C\u0061\u0063\u0065'](new RegExp("```", '\u0067'), '')['\u0074\u0072\u0069\u006D']();
      _0xb05b3d = 270513 ^ 270516;
      const _0x40g9gc = JSON['\u0070\u0061\u0072\u0073\u0065'](_0x5f_0x7e4);
      if (Array['\u0069\u0073\u0041\u0072\u0072\u0061\u0079'](_0x40g9gc)) return _0x40g9gc;
      if (_0x40g9gc && Array['\u0069\u0073\u0041\u0072\u0072\u0061\u0079'](_0x40g9gc['\u0072\u0065\u0063\u006F\u0072\u0064\u0073'])) return _0x40g9gc['\u0072\u0065\u0063\u006F\u0072\u0064\u0073'];
      if (_0x40g9gc && Array['\u0069\u0073\u0041\u0072\u0072\u0061\u0079'](_0x40g9gc['\u0064\u0065\u0065\u0064\u0073'])) return _0x40g9gc['\u0064\u0065\u0065\u0064\u0073'];
      return [_0x40g9gc];
    } catch (err) {
      _0x0db = err;
      console['\u0077\u0061\u0072\u006E'](`Model ${_0x19c5f} attempt failed:`, err['\u006D\u0065\u0073\u0073\u0061\u0067\u0065']);
    }
  }
  throw _0x0db || new Error("\u0047\u0065\u006D\u0069\u006E\u0069\u0020\u0041\u0050\u0049\u0020\u098F\u0995\u09CD\u09B8\u099F\u09CD\u09B0\u09BE\u0995\u09B6\u09A8\u0020\u09AC\u09CD\u09AF\u09B0\u09CD\u09A5\u0020\u09B9\u09DF\u09C7\u099B\u09C7\u0964");
}
export { _0x1gec as extractDeedsFromImage };
var _0x59ca = (811902 ^ 811900) + (225130 ^ 225131);
export const BULK_PROMPT_TEMPLATE = `Extract all records and deeds from this transmission letter into a strict JSON format. Do not include markdown code block syntax (like \`\`\`json), commentary, or extra text. Output only raw JSON array with objects using this exact schema:

[
  {
    "refNo": "REF-02860/2026",
    "policyNo": "010110177896-9",
    "policyHolderName": "MD SHAHIDUL ISLAM",
    "bmCode": "10029061",
    "bmName": "MD. ALAMGIR HOSSAIN",
    "incomingDate": "2026-07-22"
  }
]`;
_0x59ca = (105506 ^ 105508) + (958972 ^ 958973);
