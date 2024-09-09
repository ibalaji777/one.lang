// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const myLexer = require("./lexer");
var grammar = {
    Lexer: myLexer,
    ParserRules: [
    {"name": "program", "symbols": ["_ml", "statements", "_ml"], "postprocess": 
        (data) => {
            return data[1];
        }
                },
    {"name": "statements$ebnf$1", "symbols": []},
    {"name": "statements$ebnf$1$subexpression$1", "symbols": ["__lb_", "statement"]},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", "statements$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["statement", "statements$ebnf$1"], "postprocess": 
        (data) => {
            const repeated = data[1];
            const restStatements = repeated.map(chunks => chunks[1]);
            return [data[0], ...restStatements];
        }
                },
    {"name": "statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["fun_call"], "postprocess": id},
    {"name": "statement", "symbols": ["chain"], "postprocess": id},
    {"name": "statement", "symbols": ["import_statement"]},
    {"name": "statement", "symbols": ["if_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["while_loop"], "postprocess": id},
    {"name": "statement", "symbols": ["do_while_loop"], "postprocess": id},
    {"name": "statement", "symbols": [(myLexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "import_statement", "symbols": [{"literal":"import"}, "_", (myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"from"}, "_", (myLexer.has("string") ? {type: "string"} : string)], "postprocess": 
        (data) => {
            return {
                type: 'import',
                library: data[2].value,
                path: data[6].value,
            };
        }
                },
    {"name": "var_assign", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"="}, "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "var_assign",
                var_name: data[0],
                value: data[4]
            };
        }
                },
    {"name": "fun_call$ebnf$1$subexpression$1", "symbols": ["arg_list", "_ml"]},
    {"name": "fun_call$ebnf$1", "symbols": ["fun_call$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "fun_call$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "fun_call", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_ml", "fun_call$ebnf$1", {"literal":")"}], "postprocess": 
        (data) => {
            return {
                type: "fun_call",
                object: null, // For standalone function calls
                fun_name: data[0],
                arguments: data[4] ? data[4][0] : []
            };
        }
                },
    {"name": "chain$ebnf$1$subexpression$1", "symbols": ["fun_call", "_"]},
    {"name": "chain$ebnf$1", "symbols": ["chain$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "chain$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "chain$ebnf$2$subexpression$1", "symbols": ["arg_list", "_ml"]},
    {"name": "chain$ebnf$2", "symbols": ["chain$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "chain$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "chain", "symbols": ["chain$ebnf$1", {"literal":"."}, (myLexer.has("identifier") ? {type: "identifier"} : identifier), {"literal":"("}, "_ml", "chain$ebnf$2", {"literal":")"}], "postprocess": 
        (data) => {
            const previousCall = data[0] ? data[0][0] : null;
            return {
                type: "chain_fun",
                object: previousCall ? previousCall : null,
                fun_name: data[2],
                arguments: data[5] ? data[5][0] : []
            };
        }
                },
    {"name": "chain$ebnf$3$subexpression$1", "symbols": ["fun_call", "_"]},
    {"name": "chain$ebnf$3", "symbols": ["chain$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "chain$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "chain$ebnf$4$subexpression$1", "symbols": ["arg_list", "_ml"]},
    {"name": "chain$ebnf$4", "symbols": ["chain$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "chain$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "chain", "symbols": ["chain$ebnf$3", {"literal":"."}, (myLexer.has("identifier") ? {type: "identifier"} : identifier), {"literal":"("}, "_ml", "chain$ebnf$4", {"literal":")"}, "chain"], "postprocess": 
        (data) => {
            const previousCall = data[0] ? data[0][0] : null;
            const currentCall = {
                type: "chain_fun",
                object: previousCall ? previousCall : null,
                fun_name: data[2],
                arguments: data[5] ? data[5][0] : []
            };
            return {
                type: "chain_fun",
                object: currentCall, // Recursive call for chaining
                fun_name: data[7].fun_name, // Pass next function name in chain
                arguments: data[7].arguments // Pass next arguments in chain
            };
        }
                },
    {"name": "arg_list", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "arg_list", "symbols": ["arg_list", "__ml", "expr"], "postprocess": 
        (data) => {
            return [...data[0], data[2]];
        }
                },
    {"name": "expr", "symbols": ["expr", "_", {"literal":"+"}, "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "binary",
                operator: "+",
                left: data[0],
                right: data[4]
            };
        }
                },
    {"name": "expr", "symbols": ["expr", "_", {"literal":"-"}, "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "binary",
                operator: "-",
                left: data[0],
                right: data[4]
            };
        }
                },
    {"name": "expr", "symbols": ["expr", "_", {"literal":"*"}, "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "binary",
                operator: "*",
                left: data[0],
                right: data[4]
            };
        }
                },
    {"name": "expr", "symbols": ["expr", "_", {"literal":"/"}, "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "binary",
                operator: "/",
                left: data[0],
                right: data[4]
            };
        }
                },
    {"name": "expr", "symbols": ["expr", "_", {"literal":">"}, "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "comparison",
                operator: ">",
                left: data[0],
                right: data[4]
            };
        }
                },
    {"name": "expr", "symbols": ["expr", "_", {"literal":"<"}, "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "comparison",
                operator: "<",
                left: data[0],
                right: data[4]
            };
        }
                },
    {"name": "expr", "symbols": ["expr", "_", {"literal":">="}, "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "comparison",
                operator: ">=",
                left: data[0],
                right: data[4]
            };
        }
                },
    {"name": "expr", "symbols": ["expr", "_", {"literal":"<="}, "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "comparison",
                operator: "<=",
                left: data[0],
                right: data[4]
            };
        }
                },
    {"name": "expr", "symbols": ["expr", "_", {"literal":"=="}, "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "comparison",
                operator: "==",
                left: data[0],
                right: data[4]
            };
        }
                },
    {"name": "expr", "symbols": ["expr", "_", {"literal":"!="}, "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "comparison",
                operator: "!=",
                left: data[0],
                right: data[4]
            };
        }
                },
    {"name": "expr", "symbols": ["expr", "_", {"literal":"?"}, "_", "expr", "_", {"literal":":"}, "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "ternary",
                condition: data[0],
                true_branch: data[4],
                false_branch: data[8]
            };
        }
                },
    {"name": "expr", "symbols": [(myLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expr", "symbols": [(myLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expr", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "expr", "symbols": ["fun_call"], "postprocess": id},
    {"name": "expr", "symbols": ["lambda"], "postprocess": id},
    {"name": "lambda$ebnf$1$subexpression$1", "symbols": ["param_list", "_"]},
    {"name": "lambda$ebnf$1", "symbols": ["lambda$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "lambda$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "lambda", "symbols": [{"literal":"("}, "_", "lambda$ebnf$1", {"literal":")"}, "_", {"literal":"=>"}, "_ml", "lambda_body"], "postprocess": 
        (data) => {
            return {
                type: "lambda",
                parameters: data[2] ? data[2][0] : [],
                body: data[7]
            }
        }
            },
    {"name": "param_list$ebnf$1", "symbols": []},
    {"name": "param_list$ebnf$1$subexpression$1", "symbols": ["__", (myLexer.has("identifier") ? {type: "identifier"} : identifier)]},
    {"name": "param_list$ebnf$1", "symbols": ["param_list$ebnf$1", "param_list$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "param_list", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "param_list$ebnf$1"], "postprocess": 
        (data) => {
            const repeatedPieces = data[1];
            const restParams = repeatedPieces.map(piece => piece[1]);
            return [data[0], ...restParams];
        }
                },
    {"name": "lambda_body", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "lambda_body", "symbols": [{"literal":"{"}, "__lb_", "statements", "__lb_", {"literal":"}"}], "postprocess": 
        (data) => {
            return data[2];
        }
                },
    {"name": "if_statement$ebnf$1$subexpression$1", "symbols": [{"literal":"else"}, "_ml", {"literal":"{"}, "_ml", "statements", "_ml", {"literal":"}"}]},
    {"name": "if_statement$ebnf$1", "symbols": ["if_statement$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "if_statement$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "if_statement", "symbols": [{"literal":"if"}, "_ml", {"literal":"("}, "_", "expr", "_", {"literal":")"}, "_ml", {"literal":"{"}, "_ml", "statements", "_ml", {"literal":"}"}, "_ml", "if_statement$ebnf$1"], "postprocess": 
        (data) => {
            return {
                type: "if_statement",
                condition: data[4], // The condition expression
                true_branch: data[10], // The block of statements inside the if
                false_branch: data[14] ? data[14][4] : null   // The block inside else, if present
            };
        }
                },
    {"name": "while_loop", "symbols": [{"literal":"while"}, "_ml", {"literal":"("}, "_", "expr", "_", {"literal":")"}, "_ml", {"literal":"{"}, "_ml", "statements", "_ml", {"literal":"}"}], "postprocess": 
        (data) => {
            return {
                type: "while_loop",
                condition: data[4],
                body: data[8]
            };
        }
                },
    {"name": "do_while_loop", "symbols": [{"literal":"do"}, "_ml", {"literal":"{"}, "_ml", "statements", "_ml", {"literal":"}"}, "_ml", {"literal":"while"}, "_ml", {"literal":"("}, "_", "expr", "_", {"literal":")"}], "postprocess": 
        (data) => {
            return {
                type: "do_while_loop",
                body: data[2],
                condition: data[8]
            };
        }
                },
    {"name": "__lb_$ebnf$1$subexpression$1", "symbols": ["_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1$subexpression$1"]},
    {"name": "__lb_$ebnf$1$subexpression$2", "symbols": ["_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1", "__lb_$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__lb_", "symbols": ["__lb_$ebnf$1", "_"]},
    {"name": "_ml$ebnf$1", "symbols": []},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "_ml$ebnf$1", "symbols": ["_ml$ebnf$1", "_ml$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_ml", "symbols": ["_ml$ebnf$1"]},
    {"name": "__ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__ml$ebnf$1", "symbols": ["__ml$ebnf$1$subexpression$1"]},
    {"name": "__ml$ebnf$1$subexpression$2", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__ml$ebnf$1$subexpression$2", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__ml$ebnf$1", "symbols": ["__ml$ebnf$1", "__ml$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__ml", "symbols": ["__ml$ebnf$1"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (myLexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (myLexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
