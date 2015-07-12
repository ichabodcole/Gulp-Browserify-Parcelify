## A basic example project using Gulp with Browserify and Parcelify (* and React *)

#### What is this actually an example of?

A minimal web app structure and set of build tools to help fascilitate creating apps that are built from highly modularized components, which encapsulate structure, behavior and presentation.

There are many tools and techniques currently emerging for accomplishing the above, and this is just one.

#### WAT are those things?!.

[Gulp](https://github.com/gulpjs/gulp) is a task runner for node, to help automate your build system... or whatever else you want to automate.

[Browserify](https://github.com/substack/node-browserify) lets you do node style require statements in your front-end code, then export a single or multiple js bundles for deployment.

[Parcelify](https://github.com/rotundasoftware/parcelify) a browserify plugin that lets you require css/scss/less and other assets by using node style requires. This means that as you use browserify to require javascript modules, parcelify will piggy back on the dependency graph it generates and and handle pulling in the css/scss/less files for that module as well. Just require your js module and all the css / scss / less files get contatonated and bundled into an external file, yay.

[React](https://github.com/facebook/react) this example uses facebook's react to render the component view, but could easily be replaced with any other font-end library such as angular, backbone etc.
