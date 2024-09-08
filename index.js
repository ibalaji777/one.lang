const nearley = require("nearley");
const grammar = require("./grammar.js");
const JSInterpreter = require("./generator.js");

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

const input = `
import math from "@core/math.js"
import route from "@core/route.js"
import dom from "@core/dom.js"


print(math.add(5 3))
print("Hello, world")
print("3 + 5 =" add(3 5))
yy=10
cc = 5 + 9
print(cc)

cc = 5 > 9 ? "i am true" : "i am false"
print(cc)


hello = (subject) => {
    print(concat("Hello, " subject))
    print(concat("Hello, " subject))
}

doIt = () => {
    print("Do it!")
}

doIt()

hello("Brother")

classmates = split("Jerry Jordan Johnny Jack Jeffery" " ")

each(classmates (peep) =>
    print(concat("Hello " peep))
)

x= 1 + 4 - 100
if( x < 3 ){
 print("true") 
 }
else{
 print("else") 
 }


`;
parser.feed(input);

if (parser.results.length > 0) {
    console.log(JSON.stringify(parser.results[0], null, 2));
    const interpreter = new JSInterpreter();
    interpreter.runCode(parser.results[0])

} else {
    console.log("No parse results");
}
