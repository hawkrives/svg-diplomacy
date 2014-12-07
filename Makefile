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
BROWSERSYNC_OPTS  := start --config ./bs-config.js


# Because all of these make variables and functions are essentially string
# substitution, if you need to pass an argument to a function, just pass it
# after the call to `run-module`.

# The | (pipe) character in a make rule tells `make` to execute  everything on
# the left side in sequence, as normal, but then to  execute things on the
# right in parallel. I don't recall how that works with the -j argument, and I
# can no longer find the source that taught me about it.

# $(call fn, argument) is Makefile function syntax. It's used in here for
# getting the path to a js command-line executable like browserify.

# I broke the `stylesheets` and `javascript` tasks up into `compile-` and
# `process-` tasks to be slighly DRYer. Very slightly. Anyway, because
# browserify and watchify take the same arguments, and the only difference in
# the node-sass invocation is the `--watch` flag, those are the only thing
# that needs to go in the `compile-` command; the stuff that runs on the
# generated file can be run without changes, so it gets put in the `process-`
# task.

# Some of these rules could possibly be replaced by their resultant filenames,
# to take advantage of make's don't-rebuild-unless-i-need-to philosophy.


# PHONY rules - used to tell Make that these are rules, not targets
.PHONY: all build watch clean init browser-sync stylesheets javascript markup lint compile-stylesheets compile-javascript prepare-directories process-stylesheets process-javascript


#
# Make Rules - You really only need these three.
#

all: watch

build: clean | javascript markup stylesheets lint

lint: lint-javascript lint-stylesheets

watch: | browser-sync watch-everything
	$(call run-module, nodemon) --watch $(DEST) ./noop.js

clean:
	rm -rf $(DEST)

init:
	$(MAKE) clean
	rm -rf node_modules
	npm install


#
# Individual Make Targets
#

# `make markup` copies the /app/htdocs folder to /build
markup: prepare-directories
	cp -r $(SRC)htdocs/** $(DEST)

# `make icons` copies the /app/icons folder to /build
icons: prepare-directories
	cp -r $(SRC)icons $(DEST)icons


# `make stylesheets` compiles, then runs process-proccessors on the stylesheets.
stylesheets: compile-stylesheets process-stylesheets

# `make compile-stylesheets` compiles the stylesheets via node-sass
compile-stylesheets: prepare-directories
	$(call run-module, node-sass) $(NODE_SASS_OPTS)

# `make process-stylesheets` runs process-proccessors on the compiled stylesheets
process-stylesheets:
	$(call run-module, autoprefixer) $(AUTOPREFIXER_OPTS)
	$(call run-module, csswring) $(CSSWRING_OPTS)


# `make javascript` compiles, then runs process-proccessors on the javascript.
javascript: compile-javascript process-javascript

# `make compile-javascript` compiles the javascript via browserify
compile-javascript: prepare-directories $(SRC)**/*.js
	$(call run-module, browserify) $(BROWSERIFY_OPTS)

# `make process-javascript` uglifies (minifies) the javascript
process-javascript:
	# $(call run-module, exorcist) $(EXORCIST_OPTS)
	# $(call run-module, uglifyjs) $(UGLIFY_OPTS)


#
# Watch Targets – Invokes bits of the individual targets as watchers, to
#   automatically re-compile them, via nodemon.
#

# Invokes both watch-javascript and watch-stylesheets
watch-everything:
	$(MAKE) watch-javascript &
	$(MAKE) watch-stylesheets &

# Runs Watchify in the background, then runs nodemon to execute process-javascript and lint-javascript on changes
watch-javascript: prepare-directories
	$(call run-module, watchify) $(BROWSERIFY_OPTS) &
	$(call run-module, nodemon) --watch $(SRC) -e js --exec "$(MAKE) process-javascript lint-javascript"

# Runs node-sass in the background, then runs nodemon to execute process-stylesheets and lint-stylesheets on changes
watch-stylesheets: prepare-directories
	$(call run-module, node-sass) $(NODE_SASS_OPTS) --watch
	$(call run-module, nodemon) --watch $(SRC) -e scss --exec "$(MAKE) process-stylesheets lint-stylesheets"


#
# Lint and style-check stuff
#

# Lints javascript by way of jscs and jshint
lint-javascript:
	$(call run-module, jscs) $(SRC)**/*.js
	$(call run-module, jshint) --reporter node_modules/jshint-stylish/stylish.js $(SRC)**/*.js

# Will lint the scss by way of node-sass eventually
lint-stylesheets:
	# $(call run-module, node-sass) $(NODE_SASS_OPTS) --lint # unfortunately, the --lint argument doesn't exist right now.


#
# Tools invoked via make
#

# Runs a server to automatically reload the browser when a file is changed
browser-sync: prepare-directories
	$(call run-module, browser-sync) $(BROWSERSYNC_OPTS) &

# Prepares the way for various things to not throw not-found errors on missing
# a directory
prepare-directories:
	mkdir -p build

# De-duplicates the node_modules folder; should shrink the thing slightly
node-shrink:
	npm dedupe

# Lists outdated dependencies
node-outdated:
	npm outdated --depth 0
