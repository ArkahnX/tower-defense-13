Setting up build system
===============
Create a new build system (name is not important), replace the generated contents with the contents of tower-defense.sublime-build, save, go to tools->build system-> select your build system. <code>ctrl+b</code> to build.

Adding a new file
=================
 1. Add it to the end of the script list in <code>index.html</code>
 2. add it to the end of the <code>include</code> array in <code>app.build.js</code>

Add a function to the rendering loop:
===========================
Append it to the end of the <code>animate()</code> function.

Initialization before draw loop begins:
=========================
e.g. (loading sprites, etc):
Place before the animate function is called in the event listener in <code>init.js</code>

**Global variables are located in <code>var.js</code>**


**Require.js is being used for the build system. Prerequisites: <code>npm install requirejs</code>**

Tips and tricks
==========
To keep things small, string interpretations
e.g. <code>(someVariable === "someString")</code>
which minifies like <code>(a === "someString")</code>,
should defined as a global constant <code>(const CONSTANT\_NAME)</code>
e.g. <code>(someVariable === SOME_STRING)</code>
which minifies like: <code>(a === b)</code>