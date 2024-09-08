const nearley = require("nearley");
const grammar = require("./grammar.js");
const JSInterpreter = require("./generator.js");

class OneLang {
    constructor() {
        // Initialize the Nearley parser with the compiled grammar
        this.parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    }

    run(input) {
        // Feed the input to the parser
        this.parser.feed(input);
        
        // Check if the parser has results and process them
        if (this.parser.results.length > 0) {
            console.log(JSON.stringify(this.parser.results[0], null, 2));

            // Create an instance of the JSInterpreter to run the parsed code
            const interpreter = new JSInterpreter();
            interpreter.runCode(this.parser.results[0]);
        } else {
            console.log("No parse results");
        }
    }

    ast(input) {
        this.parser.feed(input);

        // Method placeholder for returning AST (Abstract Syntax Tree)
        return this.parser.results.length > 0 ? this.parser.results[0] : null;
    }
}

// Export the class
// export default OneLang;
module.exports = OneLang;
