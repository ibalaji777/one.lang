const moo = require('moo');

let lexer = moo.compile({
  WS:      /[ \t]+/,
  comment: /\/\/.*?$/,
  number:  /0|[1-9][0-9]*/,
  string:  /"(?:\\["\\]|[^\n"\\])*"/,
  lparen:  '(',
  rparen:  ')',
  lbrace:  '{',
  rbrace:  '}',
 "+":     "+",
  "-":     "-",
  "*":     "*",
  "/":     "/",
  ">":     ">",
  "<":     "<",
  ">=":    ">=",
  "<=":    "<=",
  "==":    "==",
  "!=":    "!=",
  ".":     ".",
  "(":     "(",
  ")":     ")",
  "{":     "{",
  "}":     "}",
  ",":     ",",
  "?":     "?",
  ":":     ":",
  ".":     ".",
  "if":    "if",
  "else":  "else",
  "while": "while",
  "import": "import",
  "from":  "from",
  identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
  fatarrow: '=>',
  assign: '=',
  NL:      { match: /\n/, lineBreaks: true },
});

module.exports = lexer;

