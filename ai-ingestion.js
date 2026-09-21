import { showToast } from "\u002E\u002F\u0075\u0069\u002D\u0075\u0074\u0069\u006C\u0073\u002E\u006A\u0073";
let _0x659fgc;
const GEMINI_API_KEY_STORAGE = "\u0064\u006D\u0073\u005F\u0067\u0065\u006D\u0069\u006E\u0069\u005F\u0061\u0070\u0069\u005F\u006B\u0065\u0079";
_0x659fgc = 106946 ^ 106946;
let _0xbfeg;
const DEFAULT_GEMINI_KEY = "\u0041\u0051\u002E\u0041\u0062\u0038\u0052\u004E\u0036\u0049\u0069\u004B\u005F\u0045\u004B\u004D\u0041\u0038\u0047\u0059\u004E\u0046\u0067\u0067\u0055\u0068\u0067\u0037\u0051\u0030\u0038\u005A\u0070\u0041\u002D\u0068\u0056\u0037\u0039\u0075\u0076\u0064\u004D\u0062\u006C\u004E\u0077\u0057\u0058\u0059\u0039\u0042\u0077";
_0xbfeg = (520427 ^ 520428) + (406564 ^ 406572);
function _0xe0347d() {
  return localStorage['\u0067\u0065\u0074\u0049\u0074\u0065\u006D'](GEMINI_API_KEY_STORAGE) || DEFAULT_GEMINI_KEY;
}
export { _0xe0347d as getStoredGeminiKey };
function _0xca_0xbcc(key) {
  if (key) {
    localStorage['\u0073\u0065\u0074\u0049\u0074\u0065\u006D'](GEMINI_API_KEY_STORAGE, key['\u0074\u0072\u0069\u006D']());
  } else {
    localStorage['\u0072\u0065\u006D\u006F\u0076\u0065\u0049\u0074\u0065\u006D'](GEMINI_API_KEY_STORAGE);
  }
}
export { _0xca_0xbcc as saveGeminiKey };
function _0x946ff(file) {
  return new Promise((resolve, reject) => {
    let _0x178dc;
    const _0x66baec = new FileReader();
    _0x178dc = (955797 ^ 955798) + (363102 ^ 363095);
    _0x66baec['\u006F\u006E\u006C\u006F\u0061\u0064'] = () => {
      var _0x3cg = (205033 ^ 205036) + (736475 ^ 736472);
      const _0xb43c6c = _0x66baec['\u0072\u0065\u0073\u0075\u006C\u0074'];
      _0x3cg = (906777 ^ 906777) + (215694 ^ 215692);
      const _0x3c5eb = _0xb43c6c['\u0073\u0070\u006C\u0069\u0074']("\u002C")[431914 ^ 431915];
      resolve({
        "mimeType": file['\u0074\u0079\u0070\u0065'] || "\u0069\u006D\u0061\u0067\u0065\u002F\u006A\u0070\u0065\u0067",
        '\u0062\u0061\u0073\u0065\u0036\u0034\u0044\u0061\u0074\u0061': _0x3c5eb
      });
    };
    _0x66baec['\u006F\u006E\u0065\u0072\u0072\u006F\u0072'] = error => reject(error);
    _0x66baec['\u0072\u0065\u0061\u0064\u0041\u0073\u0044\u0061\u0074\u0061\u0055\u0052\u004C'](file);
  });
}
export { _0x946ff as fileToBase64 };
async function _0x64308b(imageFile, apiKey) {
  var _0x81b = (346334 ^ 346333) + (852456 ^ 852448);
  const _0x1g650e = (apiKey || _0xe0347d() || '')['\u0074\u0072\u0069\u006D']();
  _0x81b = "bfkagm";
  if (!_0x1g650e) {
    throw new Error("\u09A6\u09DF\u09BE\u0020\u0995\u09B0\u09C7\u0020\u0047\u0065\u006D\u0069\u006E\u0069\u0020\u0041\u0050\u0049\u0020\u004B\u0065\u0079\u0020\u09B8\u09C7\u099F\u0020\u0995\u09B0\u09C1\u09A8\u0964");
  }
  const {
    '\u006D\u0069\u006D\u0065\u0054\u0079\u0070\u0065': mimeType,
    '\u0062\u0061\u0073\u0065\u0036\u0034\u0044\u0061\u0074\u0061': base64Data
  } = await _0x946ff(imageFile);
  let _0x_0x744;
  const _0xb5d = `You are an expert document parser.
Extract all record and deed entries from this transmission letter / dispatch sheet.
Output MUST be a strict JSON array of objects with the exact following fields:
- refNo: Reference number (e.g. "REF-02860/2026" or similar, or empty string if not found)
- policyNo: Record / Policy ID number (e.g. "010110177896-9")
- policyHolderName: Name of the customer / recipient (e.g. "MD SHAHIDUL ISLAM")
- bmCode: Branch Manager / Coordinator code (numeric or alphanumeric, e.g. "10029061")
- bmName: Name of Coordinator / Manager (e.g. "MD. ALAMGIR HOSSAIN")
- incomingDate: Date on transmission letter in YYYY-MM-DD format (or today's date if missing)

Ensure all text is clean and properly formatted. Do not include markdown or backticks in the response. Return valid JSON only.`;
  _0x_0x744 = 438235 ^ 438236;
  let _0x02e;
  const _0xb_0xccb = {
    '\u0063\u006F\u006E\u0074\u0065\u006E\u0074\u0073': [{
      '\u0070\u0061\u0072\u0074\u0073': [{
        "text": _0xb5d
      }, {
        "inlineData": {
          '\u006D\u0069\u006D\u0065\u0054\u0079\u0070\u0065': mimeType,
          '\u0064\u0061\u0074\u0061': base64Data
        }
      }]
    }],
    '\u0067\u0065\u006E\u0065\u0072\u0061\u0074\u0069\u006F\u006E\u0043\u006F\u006E\u0066\u0069\u0067': {
      '\u0074\u0065\u006D\u0070\u0065\u0072\u0061\u0074\u0075\u0072\u0065': 0.1,
      "responseMimeType": "\u0061\u0070\u0070\u006C\u0069\u0063\u0061\u0074\u0069\u006F\u006E\u002F\u006A\u0073\u006F\u006E"
    }
  };
  _0x02e = 756917 ^ 756914;
  var _0xeabec = (470459 ^ 470458) + (588636 ^ 588639);
  const _0xab54ac = ['gemini-flash-latest', "\u0067\u0065\u006D\u0069\u006E\u0069\u002D\u0033\u002E\u0035\u002D\u0066\u006C\u0061\u0073\u0068", "\u0067\u0065\u006D\u0069\u006E\u0069\u002D\u0033\u002E\u0036\u002D\u0066\u006C\u0061\u0073\u0068", "\u0067\u0065\u006D\u0069\u006E\u0069\u002D\u0033\u002E\u0037\u002D\u0066\u006C\u0061\u0073\u0068", 'gemini-3.1-flash-lite'];
  _0xeabec = (866697 ^ 866699) + (481645 ^ 481636);
  var _0x1df75b = (288917 ^ 288925) + (255367 ^ 255366);
  let _0x33ga = null;
  _0x1df75b = (270612 ^ 270615) + (141582 ^ 141574);
  for (const _0x27ce of _0xab54ac) {
    try {
      var _0x29a = (264385 ^ 264388) + (478570 ^ 478568);
      const _0x592bf = `https://generativelanguage.googleapis.com/v1beta/models/${_0x27ce}:generateContent?key=${_0x1g650e}`;
      _0x29a = (227579 ^ 227582) + (250204 ^ 250196);
      var _0x595d = (100688 ^ 100694) + (972992 ^ 973000);
      const _0x8b_0x9c0 = await fetch(_0x592bf, {
        '\u006D\u0065\u0074\u0068\u006F\u0064': "\u0050\u004F\u0053\u0054",
        '\u0068\u0065\u0061\u0064\u0065\u0072\u0073': {
          "Content-Type": "\u0061\u0070\u0070\u006C\u0069\u0063\u0061\u0074\u0069\u006F\u006E\u002F\u006A\u0073\u006F\u006E"
        },
        '\u0062\u006F\u0064\u0079': JSON['\u0073\u0074\u0072\u0069\u006E\u0067\u0069\u0066\u0079'](_0xb_0xccb)
      });
      _0x595d = '\u0067\u006F\u0065\u0071\u006E\u006F';
      if (!_0x8b_0x9c0['\u006F\u006B']) {
        const _0xf9728b = await _0x8b_0x9c0['\u006A\u0073\u006F\u006E']()['\u0063\u0061\u0074\u0063\u0068'](() => ({}));
        const _0xg9a4ac = _0xf9728b['\u0065\u0072\u0072\u006F\u0072']?.message || `HTTP ${_0x8b_0x9c0['\u0073\u0074\u0061\u0074\u0075\u0073']}: ${_0x8b_0x9c0['\u0073\u0074\u0061\u0074\u0075\u0073\u0054\u0065\u0078\u0074']}`;
        throw new Error(_0xg9a4ac);
      }
      let _0x11ed;
      const _0xa_0xe92 = await _0x8b_0x9c0['\u006A\u0073\u006F\u006E']();
      _0x11ed = 267029 ^ 267030;
      const _0xdee76e = _0xa_0xe92['\u0063\u0061\u006E\u0064\u0069\u0064\u0061\u0074\u0065\u0073']?.[736414 ^ 736414]?.content?.parts?.[876458 ^ 876458]?.text;
      if (!_0xdee76e) {
        throw new Error("\u0047\u0065\u006D\u0069\u006E\u0069\u0020\u09A5\u09C7\u0995\u09C7\u0020\u0995\u09CB\u09A8\u09CB\u0020\u09A1\u09C7\u099F\u09BE\u0020\u09AA\u09BE\u0993\u09DF\u09BE\u0020\u09AF\u09BE\u09DF\u09A8\u09BF\u0964");
      }
      let _0x95131f;
      const _0x2g448c = _0xdee76e['\u0072\u0065\u0070\u006C\u0061\u0063\u0065'](new RegExp('\u0060\u0060\u0060\u006A\u0073\u006F\u006E', '\u0067\u0069'), '')['\u0072\u0065\u0070\u006C\u0061\u0063\u0065'](new RegExp("```", '\u0067'), '')['\u0074\u0072\u0069\u006D']();
      _0x95131f = "gbokmd";
      const _0xc77ca = JSON['\u0070\u0061\u0072\u0073\u0065'](_0x2g448c);
      if (Array['\u0069\u0073\u0041\u0072\u0072\u0061\u0079'](_0xc77ca)) return _0xc77ca;
      if (_0xc77ca && Array['\u0069\u0073\u0041\u0072\u0072\u0061\u0079'](_0xc77ca['\u0072\u0065\u0063\u006F\u0072\u0064\u0073'])) return _0xc77ca['\u0072\u0065\u0063\u006F\u0072\u0064\u0073'];
      if (_0xc77ca && Array['\u0069\u0073\u0041\u0072\u0072\u0061\u0079'](_0xc77ca['\u0064\u0065\u0065\u0064\u0073'])) return _0xc77ca['\u0064\u0065\u0065\u0064\u0073'];
      return [_0xc77ca];
    } catch (err) {
      _0x33ga = err;
      console['\u0077\u0061\u0072\u006E'](`Model ${_0x27ce} attempt failed:`, err['\u006D\u0065\u0073\u0073\u0061\u0067\u0065']);
    }
  }
  throw _0x33ga || new Error("\u0047\u0065\u006D\u0069\u006E\u0069\u0020\u0041\u0050\u0049\u0020\u098F\u0995\u09CD\u09B8\u099F\u09CD\u09B0\u09BE\u0995\u09B6\u09A8\u0020\u09AC\u09CD\u09AF\u09B0\u09CD\u09A5\u0020\u09B9\u09DF\u09C7\u099B\u09C7\u0964");
}
export { _0x64308b as extractDeedsFromImage };
var _0xf69g = (549142 ^ 549139) + (330885 ^ 330884);
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
_0xf69g = (633185 ^ 633190) + (610377 ^ 610378);
