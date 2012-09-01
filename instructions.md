To add a function to the rendering loop:
append it to the end of the animate() function.

any additional initialization to be done before the draw loop (loading sprites, etc):
place before the animate function is called in the event listener in draw.js

For now main variables are located in draw.js


using requirejs for build system. Prerequisites: npm install requirejs

to keep things small, string interpretations
e.g. <code>(someVariable === "someString")</code>
which minifies like <code>(a === "someString")</code>,
should defined as a global constant <code>(const CONSTANT\_NAME)</code>
e.g. <code>(someVariable === SOME_STRING)</code>
which minifies like: <code>(a === b)</code>