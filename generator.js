class JSInterpreter {
    constructor() {
        this.variables = {}; // Store variables
        this.functions = {}; // Store functions (like fib, add)
    }

    runCode(ast) {
        ast.forEach(node => this.evaluateNode(node));
    }

    evaluateNode(node) {
        switch (node.type) {
            case 'import':
                return this.evaluateDefaultImportAssign(node);
            case 'fun_call':
                return this.evaluateFunction(node);
            case 'var_assign':
                return this.evaluateVariableAssign(node);
            case 'string':
            case 'number':
                return JSON.parse(node.value);
            case 'identifier':
                return this.variables[node.value];
            case 'lambda':
                return this.createLambda(node);
            case 'binary':
                return this.evaluateBinary(node);                
            case 'if_statement':
                return this.evaluateIf(node);
            case 'ternary':
                return this.evaluateTernary(node);     
                case 'while_loop':
                return this.evaluateWhile(node);
            case 'comparison':
                return this.evaluateComparison(node);
            default:
                // throw new Error(`Unknown node type: ${node.type}`);
        }
    }

        // Binary operations
        evaluateBinary(node) {
            const left = this.evaluateNode(node.left);
            const right = this.evaluateNode(node.right);
            switch (node.operator) {
                case '+': return left + right;
                case '-': return left - right;
                case '*': return left * right;
                case '/': 
                if (right === 0) throw new Error("Division by zero");
                return left / right;
                default:
                    throw new Error(`Unknown Binary operator: ${node.operator}`);
            }
        }
    

    // Comparison operations
    evaluateComparison(node) {
        const left = this.evaluateNode(node.left);
        const right = this.evaluateNode(node.right);
        switch (node.operator) {
            case '>': return left > right;
            case '<': return left < right;
            case '>=': return left >= right;
            case '<=': return left <= right;
            case '==': return left === right;
            case '!=': return left !== right;
            default:
                throw new Error(`Unknown comparison operator: ${node.operator}`);
        }
    }

    // Variable assignment
    evaluateVariableAssign(node) {
        const varName = node.var_name.value;
        const value = this.evaluateNode(node.value);
        this.variables[varName] = value;
    }

    // Import statement handling
    evaluateDefaultImportAssign(node) {
        const math = {
            add: (a, b) => a + b
        };
        const route = {
            add: (a, b) => a + b
        };



        switch (node.path) {
            case "@core/math.js":
                this.variables[node.library] = math;                
                break;
            case "@core/route.js":
                this.variables[node.library] = route;                
                break;
            case "@core/dom.js":
               const dom =new DOMManipulator();
                this.variables[node.library] = dom;                
                break;
            case "@core/chain.js":
            const chain =new Chainable();
            this.variables[node.library] = chain;                
                break;

                
    
           
        }
    }

    // Function calls
    // evaluateFunction(node) {
    //     const funcName = node.fun_name.value;
    //     const args = node.arguments.map(arg => this.evaluateNode(arg));
        
    //     if (this.variables[funcName]) {
    //         return this.variables[funcName](...args); // Lambda function
    //     }
    //     return this[funcName](...args); // Built-in function
    // }
    evaluateFunction(node) {
        let object = node.object ? this.evaluateNode(node.object) : null;
        const funcName = node.fun_name.value;
        const args = node.arguments.map(arg => this.evaluateNode(arg));

        if (object && object[funcName]) {
            return object[funcName](...args); // Method chaining
        } else if (this.variables[funcName]) {
            return this.variables[funcName](...args); // Lambda function
        } else if (this[funcName]) {
            return this[funcName](...args); // Built-in function
        } else {
            throw new Error(`Unknown function: ${funcName}`);
        }
    }

    // Conditional statements
    evaluateIf(node) {
        const condition = this.evaluateNode(node.condition);
        if (condition) {
            return node.true_branch.forEach(statement => this.evaluateNode(statement));
        } else  {
            return node.false_branch.forEach(statement => this.evaluateNode(statement));
        }
    }

    
    evaluateTernary(node) {
        const condition = this.evaluateNode(node.condition);
        if (condition) {
            return this.evaluateNode(node.true_branch);
        } else  {
            return this.evaluateNode(node.false_branch);
        }
    }
    // Loops (while)
    evaluateWhile(node) {
        while (this.evaluateNode(node.condition)) {
            node.body.forEach(statement => this.evaluateNode(statement));
        }
    }

    // Lambda functions
    createLambda(node) {
        const parameters = node.parameters.map(param => param.value);
        const body = node.body;

        return (...args) => {
            const localVariables = {};
            parameters.forEach((param, index) => {
                localVariables[param] = args[index];
            });

            // Temporarily swap global variables for lambda execution
            const oldVariables = this.variables;
            this.variables = { ...this.variables, ...localVariables };

            let result;
            body.forEach(expr => result = this.evaluateNode(expr));

            this.variables = oldVariables;
            return result;
        };
    }

    // Built-in functions
    print(...args) {
        console.log(...args);
    }

    add(a, b) {
        return a + b;
    }

    concat(a, b) {
        return a + b;
    }

    if(condition, trueBranch, falseBranch) {
        return condition ? trueBranch() : falseBranch();
    }

    eq(a, b) {
        return a === b;
    }

    subtract(a, b) {
        return a - b;
    }

    split(string, delimiter) {
        return string.split(delimiter);
    }

    each(array, callback) {
        array.forEach(item => callback(item));
    }

    fib(n) {
        if (n === 1 || n === 2) return 1;
        return this.fib(n - 1) + this.fib(n - 2);
    }
}

class DOMManipulator {
    constructor(selector) {
      this.elements = document.querySelectorAll(selector);
    }
    selector(selector){
        this.elements = document.querySelectorAll(selector);

    }
  
    css(property, value) {
      this.elements.forEach(el => el.style[property] = value);
      return this;
    }
  
    addClass(className) {
      this.elements.forEach(el => el.classList.add(className));
      return this;
    }
  
    removeClass(className) {
      this.elements.forEach(el => el.classList.remove(className));
      return this;
    }
  
    text(content) {
      this.elements.forEach(el => el.textContent = content);
      return this;
    }
  
    html(content) {
      this.elements.forEach(el => el.innerHTML = content);
      return this;
    }
  
    on(event, handler) {
      this.elements.forEach(el => el.addEventListener(event, handler));
      return this;
    }
  
    off(event, handler) {
      this.elements.forEach(el => el.removeEventListener(event, handler));
      return this;
    }
  
    // Add more methods as needed
  }
  

  class Chainable {
    constructor() {
      this.value = 0;
    }
  
    add(val) {
      this.value += val;
      return this;  // Return this to allow chaining
    }
  
    subtract(val) {
      this.value -= val;
      return this;
    }
  
    multiply(val) {
      this.value *= val;
      return this;
    }
  
    divide(val) {
      if (val !== 0) {
        this.value /= val;
      } else {
        console.error("Division by zero is not allowed.");
      }
      return this;
    }
  
    result() {
      return this.value;
    }
  }
  
  const chain = new Chainable();
  const finalResult = chain.add(10).subtract(3).multiply(2).divide(7).result();
  console.log(finalResult); // Output: 2
  
module.exports = JSInterpreter;
