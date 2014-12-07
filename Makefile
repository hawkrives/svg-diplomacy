# Variables
NODE_PREFIX := node node_modules/.bin/
run-module = $(addprefix $(NODE_PREFIX), $1)

SRC := app/
DEST := build/
JS_ENTRY := $(SRC)index.js
SCSS_ENTRY := $(SRC)sass/app.scss

NODE_SASS_OPTS    := $(SRC)sass/app.scss -o $(DEST) --source-comments
BROWSERIFY_OPTS   := -e $(JS_ENTRY) -o $(DEST)app.js -t 6to5-browserify --extension=es6 --full-paths --verbose --debug
UGLIFY_OPTS       := $(DEST)app.js -o $(DEST)app.min.js --screw-ie8 --unsafe
EXORCIST_OPTS     := $(DEST)app.js.map < $(DEST)app.js > $(DEST)app.js
AUTOPREFIXER_OPTS := $(DEST)app.css --map
CSSWRING_OPTS     := $(DEST)app.css $(DEST)app.min.css --sourcemap
BROWSERSYNC_OPTS  := start --files $(DEST)**/* --server $(DEST) --no-open


# Because all of these make variables and functions are essentially string
# substitution, if you need to pass an argument to a function, just pass it
# after the call to `run-module`.

# The | (pipe) character in a make rule tells `make` to execute  everything on
# the left side in sequence, as normal, but then to  execute things on the
# right in parallel. I don't recall how that works with the -j argument, and I
# can no longer find the source that taught me about it.


# PHONY rules - used to tell Make that these are rules, not targets
.PHONY: build watch serve clean javascript stylesheets lint

# Make Rules
all: watch

build: clean | javascript markup stylesheets

watch: | browser-sync watch-everything
	$(call run-module, nodemon) --watch $(DEST) ./noop.js

clean:
	rm -rf $(DEST)

# Individual Make Targets

browser-sync: prepare-directories
	$(call run-module, browser-sync) $(BROWSERSYNC_OPTS) &

stylesheets: pre-stylesheets post-stylesheets

pre-stylesheets: prepare-directories $(SRC)**/*.scss
	$(call run-module, node-sass) $(NODE_SASS_OPTS)

post-stylesheets:
	$(call run-module, autoprefixer) $(AUTOPREFIXER_OPTS)
	$(call run-module, csswring) $(CSSWRING_OPTS)

markup: prepare-directories $(SRC)htdocs/**
	cp -r $(SRC)htdocs/** $(DEST)
	cp -r $(SRC)icons $(DEST)icons

javascript: pre-javascript post-javascript

pre-javascript: prepare-directories $(SRC)**/*.js
	$(call run-module, browserify) $(BROWSERIFY_OPTS)

post-javascript:
	# $(call run-module, exorcist) $(EXORCIST_OPTS)
	# $(call run-module, uglifyjs) $(UGLIFY_OPTS)

watch-everything:
	$(MAKE) watch-javascript &
	$(MAKE) watch-stylesheets &

watch-javascript: prepare-directories
	$(call run-module, watchify) $(BROWSERIFY_OPTS) &
	$(call run-module, nodemon) --watch $(SRC) --watch gulp --exec "$(MAKE) post-javascript lint-js"

watch-stylesheets: prepare-directories
	$(call run-module, node-sass) $(NODE_SASS_OPTS) --watch
	$(call run-module, nodemon) --watch $(SRC) -e scss --exec "$(MAKE) post-stylesheets lint-scss"

# Linting
lint: lint-js lint-scss

lint-js: $(SRC)**/*.js gulp/**/*.js
	$(call run-module, jscs) $(SRC)**/*.js gulp/**/*.js
	$(call run-module, jshint) --reporter node_modules/jshint-stylish/stylish.js $(SRC)**/*.js gulp/**/*.js

lint-scss: $(SRC)**/*.scss
	# $(call run-module, node-sass) $(NODE_SASS_OPTS) --lint # <- which doesn't exist


prepare-directories:
	mkdir -p build
