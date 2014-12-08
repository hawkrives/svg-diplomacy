# Functions
NODE_PREFIX := node node_modules/.bin/
run-module = $(addprefix $(NODE_PREFIX), $1)

# Variables
SRC  := app/
DEST := build/

BROWSERIFY_OPTS   := -e $(SRC)index.js -o $(DEST)app.js -t 6to5-browserify --verbose --debug
NODE_SASS_OPTS    := $(SRC)sass/app.scss --source-comments -o $(DEST)
AUTOPREFIXER_OPTS := $(DEST)app.css
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
# getting the path to a js command-line executable like browserify or node-sass.


# PHONY rules - used to tell Make that these are rules, not targets
.PHONY: build lint watch clean init


#
# Make Rules - You really only need these three.
#

all: watch

build: clean | markup icons javascript stylesheets lint

lint: lint-javascript

watch: clean | markup icons browser-sync
	$(MAKE) watch-javascript &
	$(MAKE) watch-stylesheets &

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

# `make stylesheets` compiles, then runs post-proccessors on the stylesheets.
stylesheets: prepare-directories
	$(call run-module, node-sass) $(NODE_SASS_OPTS)
	$(call run-module, autoprefixer) $(AUTOPREFIXER_OPTS)
	$(call run-module, csswring) $(CSSWRING_OPTS)

# `make javascript` compiles, then runs post-proccessors on the javascript.
javascript: prepare-directories
	$(call run-module, browserify) $(BROWSERIFY_OPTS)


#
# Watch Targets – Invokes bits of the individual targets as watchers, to
#   automatically re-compile them, via nodemon.
#

# Runs watchify in the background, then runs nodemon to execute `lint-javascript` on changes
watch-javascript: prepare-directories
	$(call run-module, watchify) $(BROWSERIFY_OPTS) &
	$(call run-module, nodemon) --watch $(SRC) -e js --exec "$(MAKE) lint-javascript"

# Runs node-sass in the background, then runs nodemon to execute `stylesheets` on changes
watch-stylesheets: prepare-directories
	$(call run-module, nodemon) --watch $(SRC) -e scss --exec "$(MAKE) stylesheets"


#
# Lint and style-check stuff
#

# Lints javascript by way of jscs and jshint
lint-javascript:
	$(call run-module, jscs) $(SRC)**/*.js
	$(call run-module, jshint) --reporter node_modules/jshint-stylish/stylish.js $(SRC)**/*.js


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
	npm prune
	npm dedupe

# Lists outdated dependencies
node-outdated:
	npm outdated --depth 0
