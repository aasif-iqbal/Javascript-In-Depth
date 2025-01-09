## What is Javascript.
JavaScript is a versatile, dynamically typed programming language used for interactive web applications, supporting both client-side and server-side development.

- JavaScript is a single-threaded language that executes one task at a time.
- It is an Interpreted language which means it executes the code line by line.
- The data type of the variable is decided at run-time in JavaScript that’s why it is called dynamically typed.

### Is JavaScript Compiled or Interpreted or both ?
- JavaScript is both compiled and interpreted. The V8 engine improves performance by first interpreting code and then compiling frequently used functions for speed. This makes JavaScript efficient for modern web apps. It’s mainly used for web development but also works in other environments. You can learn it through tutorials and examples.

- Just-In-Time (JIT) compilation is a technique used by JavaScript engines (like V8) to improve performance. Here’s how it works

- Interpretation: Initially, the code is interpreted line-by-line by the engine.
Hot Code Detection: The engine identifies frequently executed code, such as often-called functions.

- Compilation: The “hot” code is compiled into optimized machine code for faster execution.

- Execution: The compiled machine code is then executed directly, improving performance compared to repeated interpretation.

- JIT compilation balances between interpretation (for quick startup) and compilation (for faster execution).

Language_overview
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview

TODO: Dynamic and weak typing 
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#dynamic_and_weak_typing

Functions are first-class objects
JavaScript functions are first-class objects. This means that they can be assigned to variables, passed as arguments to other functions, and returned from other functions. In addition, JavaScript supports closures out-of-the-box without explicit capturing, allowing you to conveniently apply functional programming styles.