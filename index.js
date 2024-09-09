const nearley = require("nearley");
const grammar = require("./grammar.js");
const JSInterpreter = require("./generator.js");

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

const input = 
`google().add(3).subtract(5)`;
parser.feed(input);

if (parser.results.length > 0) {
    console.log(JSON.stringify(parser.results[0], null, 2));
    const interpreter = new JSInterpreter();
    interpreter.runCode(parser.results[0])

} else {
    console.log("No parse results");
}
