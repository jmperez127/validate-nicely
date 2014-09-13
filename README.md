# Validate Nicely

### Yet another simple jQuery form validator plugin

So you need to integrate quickly a contact form, but native validation is ugly. You don't want to use some complex programming logic to do such a simple task. Then this plugin might be the right for you. 

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="js/jquery.validate-nicely.min.js"></script>
	```
3. Define your form:


	```html
		<form action="" method="" id="validate">
			<span data-label-for="my-field"></span>
			<input type="text" data-required data-message="This can't be empty" id="my-field">
			<button type="submit">submit</button>
		</form>
	```

4. Call the plugin:

	```javascript
	$("#validate").validateNicely();
	```
5. Configure the plugin:

	```javascript
	$("#validate").validateNicely({
		showLabel: true,
		showPlaceholderMsg: false,
		inputErrorColor: #f44949,
		inputErrorClass: "invalid",
		labelErrorClass: "invalid-span"
		...
	});
	```


## Structure

The basic structure of the project is given in the following way:

```
├── demo/
│   └── index.html
├── dist/
│   ├── jquery.validate-nicely-version.js
│   └── jquery.validate-nicely.min.js
├── src/
│   └── jquery.validate-nicely.js
├── spec/
│	├── fixtures/
│	│	└── form.html
│	├── karma-dependencies/
│	│	├── jasmine-jquery.js
│	│	└── jquery-2.1.1.min.js
│   └── jquery.validate-nicely.js
│    
├── .editorconfig
├── .gitignore
├── .jshintrc
├── .travis.yml
├── boilerplate.jquery.json
├── Gruntfile.js
├── karma.conf.js
└── package.json
```

#### [demo/](https://[REPO]/tree/master/demo)

Contains a simple HTML file to demonstrate your plugin.

#### [dist/](https://[REPO]/tree/master/dist)

This is where the generated files are stored once Grunt runs.

#### [src/](https://[REPO]/tree/master/src)

Contains the files responsible for the plugin


#### [spec/](https://[REPO]/tree/master/spec)

Contains jasmine spec files, fixtures and karma dependencies.


#### [fixtures/](https://[REPO]/tree/master/spec/fixture)

Fixtures for DOM testing with jasmine and jQuery

#### [karma-dependencies/](https://[REPO]/tree/master/spec/karma-dependencies)

Additional lib files used by karma such as jQuery and jasmine-jquery

#### [.editorconfig](https://[REPO]/tree/master/.editorconfig)

This file is for unifying the coding style for different editors and IDEs.

> Check [editorconfig.org](http://editorconfig.org) if you haven't heard about this project yet.

#### [.gitignore](https://[REPO]/tree/master/.gitignore)

List of files that we don't want Git to track.

> Check this [Git Ignoring Files Guide](https://help.github.com/articles/ignoring-files) for more details.

#### [.jshintrc](https://[REPO]/tree/master/.jshintrc)

List of rules used by JSHint to detect errors and potential problems in JavaScript.

> Check [jshint.com](http://jshint.com/about/) if you haven't heard about this project yet.

#### [.travis.yml](https://[REPO]/tree/master/.travis.yml)

Definitions for continous integration using Travis.

> Check [travis-ci.org](http://about.travis-ci.org/) if you haven't heard about this project yet.

#### [validate-nicely.jquery.json](https://[REPO]/tree/master/validate-nicely.jquery.json)

Package manifest file used to publish plugins in jQuery Plugin Registry.

> Check this [Package Manifest Guide](http://plugins.jquery.com/docs/package-manifest/) for more details.

#### [Gruntfile.js](https://[REPO]/tree/master/Gruntfile.js)

Contains all automated tasks using Grunt.

> Check [gruntjs.com](http://gruntjs.com) if you haven't heard about this project yet.

#### [package.json]([REPO]/tree/master/package.json)

Specify all dependencies loaded via Node.JS.

> Check [NPM](https://npmjs.org/doc/json.html) for more details.

## Guides

#### How did we get here?

This is a simple tool created for a friend, and I tought someone might also want to give a try and collaborate if certain requirement is needed. It is also a fun experience to be able to practice your javascript skills even if it is developing a simple jQuery plugin.

## Contributing

Check [CONTRIBUTING.md](https://[REPO]/master/CONTRIBUTING.md) for more information.

## History

Check [Releases](https://[REPO]/releases) for detailed changelog.

## License

[MIT License](http://jeanperez.mit-license.org) © Jean Pérez
