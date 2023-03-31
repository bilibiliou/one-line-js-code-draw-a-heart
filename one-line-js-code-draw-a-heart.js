const readline = require('readline');

// ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ
// ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ
// ！＠＃＄％^＆＊（）_＋
// {}[]：""<>？，．／\
// https://lingojam.com/TextToEmojiLetters
function genMonospacedAlphabet(char) {
  return {
    ' ': '　',
    a: 'ａ',
    b: 'ｂ',
    c: 'ｃ',
    d: 'ｄ',
    e: 'ｅ',
    f: 'ｆ',
    g: 'ｇ',
    h: 'ｈ',
    i: 'ｉ',
    j: 'ｊ',
    k: 'ｋ',
    l: 'ｌ',
    m: 'ｍ',
    n: 'ｎ',
    o: 'ｏ',
    p: 'ｐ',
    q: 'ｑ',
    r: 'ｒ',
    s: 'ｓ',
    t: 'ｔ',
    u: 'ｕ',
    v: 'ｖ',
    w: 'ｗ',
    x: 'ｘ',
    y: 'ｙ',
    z: 'ｚ',
    A: 'Ａ',
    B: 'Ｂ',
    C: 'Ｃ',
    D: 'Ｄ',
    E: 'Ｅ',
    F: 'Ｆ',
    G: 'Ｇ',
    H: 'Ｈ',
    I: 'Ｉ',
    J: 'Ｊ',
    K: 'Ｋ',
    L: 'Ｌ',
    M: 'Ｍ',
    N: 'Ｎ',
    O: 'Ｏ',
    P: 'Ｐ',
    Q: 'Ｑ',
    R: 'Ｒ',
    S: 'Ｓ',
    T: 'Ｔ',
    U: 'Ｕ',
    V: 'Ｖ',
    W: 'Ｗ',
    X: 'Ｘ',
    Y: 'Ｙ',
    Z: 'Ｚ',
    '!': '！',
    '@': '＠',
    '#': '＃',
    '$': '＄',
    '%': '％',
    '^': '^',
    '&': '＆',
    '*': '＊',
    '(': '（',
    ')': '）',
    '_': '_',
    '+': '＋'
  }[char]
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Say something: ', (wannaSay) => {
  rl.close();

  const paddingStr = wannaSay.split("")
    .map((i) => genMonospacedAlphabet(i))
    .join("");
  const M = Math;
  const pow = M.pow;
  const sleep = (ms) => new Promise((resolve) => { setTimeout(() => { resolve() }, ms) });
  const blank = genMonospacedAlphabet(' ');
  const gStdout = () => {
    let flag = -1;
    let len = paddingStr.length;
    return () => {
      if (flag > len - 1) {
        flag = 0;
      } else {
        flag++;
      }

      if (flag === len || /\s/.test(paddingStr[flag])) {
        return blank;
      }
      return paddingStr[flag];
    };
  };

  const isIn = (x, y, a = 1, b = 1) => pow((pow((x * a * 0.05), 2) + pow((-y * b * 0.1), 2) - 1), 3) - pow((x * a * 0.05), 2) * pow((-y * b * 0.1), 3) < 0;
  const output = gStdout();

  const print = async (x, y) => { await process.stdout.write(isIn(x, y, 1.2) ? '\x1b[91m' + output() : blank); };

  let y = -15;
  const render = async () => {
    for (let x = -25; x < 25; x += 1) {
      await print(x, y);
      await sleep(2);
    }
    process.stdout.write('\n');
    if (y < 10) {
      y++;
      render();
    }
  };
  render();
});

