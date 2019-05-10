// initialize
let reg1 = new RegExp("(h|H)ello")
let reg2 = /(w|W)orld/

let txt = "Programming courses always starts with a hello World example."

// RegExp
console.log(reg1.test(txt))
console.log(reg2.test(txt))

console.log(reg1.exec(txt))
console.log(reg2.exec(txt))


// String
console.log(txt.match(reg1))
console.log(txt.match(reg2))

console.log(txt.search(reg1))
console.log(txt.search(reg2))

console.log(txt.split(reg1))
console.log(txt.split(reg2))

console.log(txt.replace(reg1, "---"))
console.log(txt.replace(reg2, "---"))


let txt = "Hello hello World world"

let reg1 = /(w|W)orld/
let reg2 = /(w|W)orld/g


console.log(txt.match(reg1))
console.log(txt.match(reg2))

/*
[ 'World',
  'W',
  index: 12,
  input: 'Hello hello World world',
  groups: undefined ]
[ 'World', 'world' ]
ほー、復数マッチだとこんな違いが
? matchオブジェクトを復数取得するには？
*/


/*
## Flag
- i: case insenssitive
- g: global. 復数マッチする
- m: multiline. 改行で止まらない
*/

/*
## meta character
^$.*+?=!:|\/()[]{}
\t \v(vertical tab) \n \r(carriage return)

carriage return(CR): 
カーソルを次の行に移し(改行: LF)、その行の先頭にカーソルを移動させるキーのこと。
改行の表現が場合ごとに異なる
- LF: \n unix, linux
- CRLF: \r\n: windows, httpやメールのプロトコルはなんとCRLF
- CR: \r 古いunix

*/

// . wildcard
// 「なにか1文字」
let reg;
reg = /h.t/g
console.log("how it that so hot? hoot".match(reg))
// [ 'hat', 'hot' ]

// \ escape
// - ^ \ ]
reg = /s\./g
console.log("match this. hogehoge".match(reg))
// [ 's.' ]


// control characters
reg = /(\t|\n|\v|\r)/g
console.log("hot\t \nnewline\vなんだこれ\r\r")
console.log("hot\t hogehoge\nnewline\vなんだこれ\r\r".match(reg))
// [ '\t', '\n', '\u000b', '\r', '\r' ]


/*
// ## [] Character Set
// その中に放り込んだ1文字を指定する

gray or grey
let re = /gr y/ ? how to express?

let re = /gr[ae]y/
*/

reg = /[\t\n\r\v]/g
console.log("hot\t \nnewline\vなんだこれ\r\r")
console.log("hot\t hogehoge\nnewline\vなんだこれ\r\r".match(reg))
// [ '\t', '\n', '\u000b', '\r', '\r' ]

/*
[] Character Set: Range
ハイフンを使ってrangeを表現できる
[0-9a-zA-Z]

? この並びはどこから?
? 記号, 日本語は?
*/
reg = /[1-4]/g
console.log("hot\t \nnewline\vなんだこれ\r\r")
console.log("hot\t hogehoge\nnewline\vなんだこれ\r\r".match(reg))

reg = /[13-5]/g
console.log("1234567890".match(reg))
// [ '1', '3', '4', '5' ]

reg = /[12-5]/g
console.log("1234567890".match(reg))
// [ '1', '2', '3', '4', '5' ]


reg = /[10-20]/g
console.log("1234567890".match(reg))
// [ '1', '2', '0' ]
// 1, 0-2, 0 と解釈されてる

/*
[] Character Set: Exclude
set[] の表現において、先頭に^をつけるとそれ以外という意味になる
*/

reg = /0x[0-9A-F][0-9A-F]/g
console.log("Exception 0xG89F".match(reg))
// null

reg = /0x[^0-9A-F][0-9A-F]/g
console.log("Exception 0xG89F".match(reg))
// ['0xG8']


/*
// ## Repeat
- 繰り返し表現がAutomatonでいうavailable_statusを生み出す。
    - よって最短/最長マッチみたいな概念が生まれる
- symbols
    + 1以上 ... 基本は+をつかう。
    ? 0 or 1
    * 0以上
*/

reg = /[A-Z]?/g
console.log("She sells seashells on a seashore. The shells she sells are seashells. I'm sure.".match(reg))
// 全てのcharにマッチする

reg = /s[a-z]*/g
console.log("She sells seashells on a seashore. The shells she sells are seashells. I'm sure.".match(reg))
/*
[ 'sells',
  'seashells',
  'seashore',
  'shells',
  'she',
  'sells',
  'seashells',
  'sure' ]
*/

reg = /[A-Z][a-z]?/g
console.log("Steve Norman Jeff amanda Sherry K".match(reg))
// [ 'St', 'No', 'Je', 'Sh', 'K' ]
// 可能な限り長くマッチさせるのが原則(後述のGreediness)

reg = /[A-Z][a-z]??/g
console.log("Steve Norman Jeff amanda Sherry K".match(reg))
// [ 'S', 'N', 'J', 'S', 'K' ]
// また、一度パターンとして読み取った文字列はもう使えない

/*
// Repeat: Greediness Laziness
- Greediness: try to match as long as possible
- Laziness: それをやめて最短マッチさせること。
    - repeat記号の後に?を置く
    - why laziness?
*/

reg = /<p>(.+)<\/p>/g
console.log(`
<p>This is the first paragraph.</p><p>Paragraph number two.</p>
`.match(reg))
//[ '<p>This is the first paragraph.</p><p>Paragraph number two.</p>',
// '<p>This is the first paragraph.</p><p>Paragraph number two.</p>' ]
// 途中のpタグで閉じてくれない。
// 可能な限り長くマッチさせるのが原則

reg = /<p>(.+?)<\/p>/g
console.log(`
<p>This is the first paragraph.</p><p>Paragraph number two.</p>
`.match(reg))
// [ '<p>This is the first paragraph.</p>',
// '<p>Paragraph number two.</p>' ]

reg = /<p>(.*?)/g
console.log(`
<p>This is the first paragraph.</p><p>Paragraph number two.</p>
`.match(reg))
// [ '<p>', '<p>' ]
// .*? は空文字にマッチしてしまう

/*
// Repeat: specify the repition amount 
{min, max} min以上max以下
{min} ピッタリこの回数
{min, } これ以上
{, max} これ以下 ... jsだとマッチしない? {0, 5}とか指定する必要がある
*/

reg = /\w{3,5}/g
console.log(`
My telephone number is as follows: 801-555-6789
`.match(reg))
// [ 'telep', 'hone', 'numbe', 'follo', '801', '555', '6789' ]

reg = /\w{3}/g
console.log(`
My telephone number is as follows: 801-555-6789
`.match(reg))
// [ 'tel', 'eph', 'one', 'num', 'ber', 'fol', 'low', '801', '555', '678' ]

reg = /\w{3,}/g
console.log(`
My telephone number is as follows: 801-555-6789
`.match(reg))
// [ 'telephone', 'number', 'follows', '801', '555', '6789' ]

reg = /\w{0,5}/g
console.log(`
My telephone number is as follows: 801-555-6789
`.match(reg))
// {, 5} はnull返す. {0, 5}, {1, 5} を指定する必要がある


/*
## Anchored Expression
- 「行」の先頭または末尾に限定したパターンマッチを見ることが出来る
    - 行ごとなので、multilineフラグと併用してつかう
    - ^ Start of line
    - $ End of line
- 「入力」の先頭または末尾に限定したパターンマッチ
    - \A
    - \Z

*/

reg = /^The$/g
console.log(`The dot is a very powerful regex metacharater. It allows you to be laxy.`.match(reg))
// null

reg = /^The/g
console.log(`The dot is a very powerful regex The metacharater. It allows you to be laxy.`.match(reg))
// [ 'The' ]

reg = /^The/g
console.log(`
The dot is a very powerful regex The metacharater. It allows you to be laxy.
`.match(reg))
// null

reg = /^The/gm // multiline flag
console.log(`
The dot is a very powerful regex The metacharater. It allows you to be laxy.
`.match(reg))
// [ 'The' ]


/*
## Word Boundaries

\b word bundary. pattern bounded by a non-word character
\B nonword boundary. pattern bounded by a ward character

マッチさせたいワードがnonchar/charで囲まれていることを指定できる

*/

reg = /plan/g
console.log(`
Inplant this idea: plan to plant multiple trees on this planet.
`.match(reg))
// ['plan', 'plan', 'plan', 'plan']

reg = /\bplan/g
console.log(`
Inplant this idea: plan to plant multiple trees on this planet.
`.match(reg))
// [ 'plan', 'plan', 'plan' ]

reg = /\bplan\b/g
console.log(`
Inplant this idea: plan to plant multiple trees on this planet.
`.match(reg))
// [ 'plan' ]

reg = /In/g
console.log(`
Inplant this idea: plan to plant multiple trees on this planet.
`.match(reg))
// [ 'In' ]

reg = /\bIn/g
console.log(`
Inplant this idea: plan to plant multiple trees on this planet.
`.match(reg))
// [ 'In' ]

const test = (reg, txt) => {
    console.log(txt.match(reg))
}

// Accurate RegExp
// これは確かにマッチするが正しいと言えるのか？
test(
    /.*/g,
    '84432'
)

// こっちのほうがより適切では？
// つまり、正しさには2つの側面があり
// 1. マッチしてほしい文字に確かにマッチすること
// 2. マッチしてほしくない文字列にはマッチしないこと
// なので
// 1. when possible, define the quantity of repeated expressions
// 2. narrow the scope of repeated expressions
// 3. provide clear starting and ending points
test(
    /^[0-9]{5}-[0-9]{4}$/g,
    '84432-1234'
)


/*
## Specifing Options

- or pipe
    - マッチするパーツをorで並べられる
    - マッチする箇所を正規表現の一部に留めるには丸かっこで囲む
*/

test(
    /\b[m,t,w,f,s][a-z]{1,4}[n,s,i,r]day\b/gi,
    `Each and every Tuesday at the beginning of the day, we hold a staff meeting.
At the Tuesday staff meeting, you will need to make a report on the past weeks progress, and you will receive assignments for the following Tuesday. 
Just be aware that someday this Tuesday meeting might not occur.
When that happens, we will make an announcument.
`
)

// コチラのほうがわかりやすい
test(
    /\bmonday|tuesday|wednesday|thursday|friday|saturday|sunday\b/gi,
    `Each and every Tuesday at the beginning of the day, we hold a staff meeting.
At the Tuesday staff meeting, you will need to make a report on the past weeks progress, and you will receive assignments for the following Tuesday. 
Just be aware that someday this Tuesday meeting might not occur.
When that happens, we will make an announcument.
`
)

test(
    /\b[a-z]{3}day\b|\b[a-z]{4}day\b|\b[a-z]{6}day\b/gi,
    `Each and every Tuesday at the beginning of the day, we hold a staff meeting.
At the Tuesday staff meeting, you will need to make a report on the past weeks progress, and you will receive assignments for the following Tuesday. 
Just be aware that someday this Tuesday meeting might not occur.
When that happens, we will make an announcument.
`
)


/*
## Grouping
() まるで囲める. orと併用すること多い
captureできるのでそれを参照することが出来る
?:captureなしのグルーピングだけ行う事もできる
*/

test(
    /(\b(mon|tue|wedness)day\b)/gi,
    'Today is monday and tomorrow is tuesdays and then have wednessday.'
)

let inputs = ["2018-01-01", "2100.21.02", "3400/12/21"]
inputs.forEach((element) => {
    let reg = /^(\d{4})[-./](\d{2})[-./](\d{2})$/gi
    let res = reg.exec(element)
    console.log(res)
});

// Captureing Groups
// Groupingしたものはあとでアクセスできる

test(
    /yo/g,
    'yoyo'
)

// Groupingでマッチしたものはその後の正規表現中でもう使える
// 2019/05-12 とかをこれで防げる
inputs.forEach((element) => {
    let reg = /^(\d{4})([-./])(\d{1,2})\2(\d{1,2})$/gi
    let res = reg.exec(element)
    console.log(res)
});

// Group Backreferences
test(
    /([a-d][1-5]){3}/g,
    'a1c1d5c1d5b2b3d4'
)
// [ 'a1c1d5', 'c1d5b2' ]

// 
test(
    /([a-d][1-5])\1/g,
    'a1a1c1d5c1d5b2b3d4'
)
// ['a1a1']

// non capture
// groupingだけでキャプチャはいらないのであれば先頭に?:付ける
test(
    /(?:[a-d][1-5])\1/g,
    'a1a1c1d5c1d5b2b3d4'
)
// null

// 最短マッチしなくてもこれで防げる
test(
    /<(\w+>)[\w\s]+<\/\1/g,
    '<strong>This is a strong tag</strong><i>this is italic</i>'
)
// ['<strong>This is a strong tag</strong>',
//  '<i>this is italic</i>']


// Lookahead Groups: 先読み
// 簡単な理解: 「直後にとあるパターンが続く、あるパターン」
// だいじな理解: 先読み/後読みはアンカー。それにマッチする位置から前後に指定したパターンが有るかをみる
// 先読みしたあと、curPointerに戻るという理解も重要
test(
    // .comをあとにもつ\w+
    /\w+(?=\.com)/g,
    'allthingsjs.com google.com youtube.com'
)
// [ 'allthingsjs', 'google', 'youtube' ]

test(
    /\w+(?=\.com)\.jp/g,
    'allthingsjs.com.jp google.com.jp youtube.com.jp'
)
// null これはマッチしない. curPointerは..js/..le/..ubeの直後であり、そこから.comを読ませないと.jpにマッチでいない

test(
    /\w+(?=\.com)[\w.]+\.jp/g,
    'allthingsjs.com.jp google.com.jp youtube.com.jp'
)
// [ 'allthingsjs.com.jp', 'google.com.jp', 'youtube.com.jp' ]

inputs = ['aH9kdfj7', 'aH9kdfj']
inputs.forEach((password) => {
    test(
        // 先頭から
        // 任意の8文字があって(curPointerは先頭に戻る)
        // 任意のA-Zがあって(curPointerは先頭に戻る)
        // 任意の小文字a-zがあって(curPointerは先頭に戻る)
        // 任意の\dがあって(curPointerは先頭に戻る)
        // そのあと任意の文字が0以上有る
        // つまり, [A-Za-z0-9]を8文字以上つかう、という縛り
        /^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/g,
        password
    )
})

// Positive Lookahead
// (?=)
// Negative Lookahead Grouping
// (?!)
// Positive Lookback 
// (?<=)
// Negative Lookback
// (?<!)

inputs = ['aH9kdfj7', 'aH9kdfj', 'asjAbfsk']
inputs.forEach((password) => {
    test(
        /^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?!=.*[0-9]).*$/g,
        password
    )
})
// [ 'asjAbfsk' ]


/*
## Unicode
https://unicode-table.com/en/

16進数の4乗で65536通りの文字を表現できる。

\u0030 == 0
\u0065 == a
\u77F3 == 石


rangeもあり
[\u0061-\u0067]

ひらがな: [\u3041-\u309F]
カタカナ: [\u30A0-\u30FF]
漢字: [\u4E00-\u9FA0]
その他:
    0x30FB 中黒点「・」
    0x30FC 長音「ー」
    0x30FD 「ヽ」
    0x30FE 「ヾ」
    0x309B 濁点
    0x309C 半濁点
    0x3000 - 0x301C 全角スペース、句読点など
*/


test(
    /\u0061/g,
    'Smith, Andrea'
)
// [ 'a' ]

test(
    /[\u0061-\u0067]/g,
    'Smith, Andrea'
)
// [ 'd', 'e', 'a' ]

test(
    /[\u4E00-\u9FA0]/g,
    "漢字も入っているんですけど、如何な御様子？"
)
// ['漢', '字', '入', '如', '何', '御', '様', '子']


/*
## Application
- email address
- twitter handle
- password
-
*/


// email
// <利用可能な文字列>@<利用可能な文字列>(.<利用可能な文字列>)+
testcases = {
    "somet hoge gaho@hgoe.com": false,
    "something@domain.com": true,
    "something@domain.hoge.com": true,
    "something@domain": false,
    "something@domain..com": false,
};

Object.keys(testcases).forEach((email) => {
    let expected = testcases[email]
    console.log(`${email} is expected to be ${expected}: `)
    test(
        /^[\w\!#$%&'\*\+\/=?^_`{|}~=\]]+@[\w-]+(\.[\w-]+)+$/g,
        email
    )
})


// twitter name
// @?<利用可能な文字列>と考える
testcases = {
    "@vsanna": true,
    "@vsa anna": false,
    "hoge@vsanna": false,
    "@123": true,
    "@ 123": false,
    "hogehoge": true,
};

Object.keys(testcases).forEach((tname) => {
    let expected = testcases[tname]
    console.log(`${tname} is expected to be ${expected}: `)
    test(
        /^@?[\w]+$/g,
        tname
    )
})

// password
// 1. 8文字以上32文字以下
// 2. 大文字含む
// 3. 小文字含む
// 4. 数字含む
// 5. 特定の記号を含む
// testメソッドを復数回呼び出す
testcases = {
    "@vsanna": true,
    "@vsa anna": false,
    "hoge@vsanna": false,
    "@123": true,
    "@ 123": false,
    "hogehoge": true,
};

Object.keys(testcases).forEach((password) => {
    let expected = testcases[password]

    let matched = (/[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[!"#$%'()*+,\-.\:;<=>?@[\\\]^_`{|}-~]/.test(password))

    console.log(`${password} is expected to be ${expected}. actual is: ${matched}`)
})