### A basic example project using Gulp with Browserify and Parcelify

Gulp is a task runner for node, to help automate your build system... or whatever else you want to automate.

Browserify lets you do node style require statements in your front-end code, and export a single or multiple js bundles for deployment.

Parcelify lets you require css/scss/less and other assets by using node style requires. This means you no longer need to double the work of requiring js files and using things like @import for your sass/less files. Just require your js module and all the css / scss / less files get contatonated and bundled into an external file.
