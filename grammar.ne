@{%
const myLexer = require("./lexer");
%}

@lexer myLexer

program
    -> _ml statements _ml
        {%
            (data) => {
                return data[1];
            }
        %}

statements
    ->  statement (__lb_ statement):*
        {%
            (data) => {
                const repeated = data[1];
                const restStatements = repeated.map(chunks => chunks[1]);
                return [data[0], ...restStatements];
            }
        %}

statement
    -> var_assign  {% id %}
    | fun_call     {% id %}
    | %comment     {% id %}
    | import_statement  
    | if_statement {% id %}
    | while_loop   {% id %}
    | do_while_loop   {% id %}

# Import statement
import_statement 
    -> "import" _ %identifier _ "from" _ %string
        {%
            (data) => {
                return {
                    type: 'import',
                    library: data[2].value,
                    path: data[6].value,
                };
            }
        %}

# Variable assignment
var_assign
    -> %identifier _ "=" _ expr
        {%
            (data) => {
                return {
                    type: "var_assign",
                    var_name: data[0],
                    value: data[4]
                };
            }
        %}

# Function call
fun_call
    -> (%identifier _ "."):?  %identifier _ "(" _ml (arg_list _ml):? ")"
        {%
            (data) => {
                return {
                    type: "fun_call",
                    object: data[0] ? data[0][0] : null,
                    fun_name: data[1],
                    arguments: data[5] ? data[5][0] : []
                };
            }
        %}

# Argument list for function calls
arg_list
    -> expr
        {%
            (data) => {
                return [data[0]];
            }
        %}
    |  arg_list __ml expr
        {%
            (data) => {
                return [...data[0], data[2]];
            }
        %}

# Expressions and operators
expr
    -> expr _ "+" _ expr
        {%
            (data) => {
                return {
                    type: "binary",
                    operator: "+",
                    left: data[0],
                    right: data[4]
                };
            }
        %}
    | expr _ "-" _ expr
        {%
            (data) => {
                return {
                    type: "binary",
                    operator: "-",
                    left: data[0],
                    right: data[4]
                };
            }
        %}
    | expr _ "*" _ expr
        {%
            (data) => {
                return {
                    type: "binary",
                    operator: "*",
                    left: data[0],
                    right: data[4]
                };
            }
        %}
    | expr _ "/" _ expr
        {%
            (data) => {
                return {
                    type: "binary",
                    operator: "/",
                    left: data[0],
                    right: data[4]
                };
            }
        %}
    | expr _ ">" _ expr
        {%
            (data) => {
                return {
                    type: "comparison",
                    operator: ">",
                    left: data[0],
                    right: data[4]
                };
            }
        %}
    | expr _ "<" _ expr
        {%
            (data) => {
                return {
                    type: "comparison",
                    operator: "<",
                    left: data[0],
                    right: data[4]
                };
            }
        %}
    | expr _ ">=" _ expr
        {%
            (data) => {
                return {
                    type: "comparison",
                    operator: ">=",
                    left: data[0],
                    right: data[4]
                };
            }
        %}
    | expr _ "<=" _ expr
        {%
            (data) => {
                return {
                    type: "comparison",
                    operator: "<=",
                    left: data[0],
                    right: data[4]
                };
            }
        %}
    | expr _ "==" _ expr
        {%
            (data) => {
                return {
                    type: "comparison",
                    operator: "==",
                    left: data[0],
                    right: data[4]
                };
            }
        %}
    | expr _ "!=" _ expr
        {%
            (data) => {
                return {
                    type: "comparison",
                    operator: "!=",
                    left: data[0],
                    right: data[4]
                };
            }
        %}
    | expr _ "?" _ expr _ ":" _ expr
        {%
            (data) => {
                return {
                    type: "ternary",
                    condition: data[0],
                    true_branch: data[4],
                    false_branch: data[8]
                };
            }
        %}
    | %string     {% id %}
    | %number     {% id %}
    | %identifier {% id %}
    | fun_call    {% id %}
    | lambda      {% id %}

# Lambda functions
lambda -> "(" _ (param_list _):? ")" _ "=>" _ml lambda_body
    {%
        (data) => {
            return {
                type: "lambda",
                parameters: data[2] ? data[2][0] : [],
                body: data[7]
            }
        }
    %}

param_list
    -> %identifier (__ %identifier):*
        {%
            (data) => {
                const repeatedPieces = data[1];
                const restParams = repeatedPieces.map(piece => piece[1]);
                return [data[0], ...restParams];
            }
        %}

lambda_body
    -> expr
        {%
            (data) => {
                return [data[0]];
            }
        %}
    | "{" __lb_ statements __lb_ "}"
        {%
            (data) => {
                return data[2];
            }
        %}

# If statements
if_statement
    -> "if" _ml "(" _ expr _ ")" _ml "{" _ml statements _ml "}" _ml  ("else" _ml "{" _ml statements _ml "}"):?
        {%
            (data) => {
                return {
                    type: "if_statement",
                    condition: data[4], // The condition expression
                    true_branch: data[10], // The block of statements inside the if
                    false_branch: data[14] ? data[14][4] : null   // The block inside else, if present
                };
            }
        %}
# While loop
while_loop
    -> "while" _ml "(" _ expr _ ")" _ml "{" _ml statements _ml "}"
        {%
            (data) => {
                return {
                    type: "while_loop",
                    condition: data[4],
                    body: data[8]
                };
            }
        %}

# Do-while loop
do_while_loop
    -> "do" _ml "{" _ml statements _ml "}" _ml "while" _ml "(" _ expr _ ")"
        {%
            (data) => {
                return {
                    type: "do_while_loop",
                    body: data[2],
                    condition: data[8]
                };
            }
        %}

# Mandatory line-break with optional whitespace around it
__lb_ -> (_ %NL):+ _

# Optional multi-line whitespace
_ml -> (%WS | %NL):*

# Mandatory multi-line whitespace
__ml -> (%WS | %NL):+

# Optional whitespace    
_ -> %WS:*

# Mandatory whitespace
__ -> %WS:+
