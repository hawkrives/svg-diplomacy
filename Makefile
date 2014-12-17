.PHONY: all init watch build dist deep-clean cordova dist-csswring dist-uglify

all: init watch

clean:
	rm -rf build
	rm -rf cordova/platforms/ios/build

deep-clean: clean
	rm -rf node_modules

shrink:
	npm prune
	npm dedupe
	npm i dmn
	./node_modules/.bin/dmn clean -f
	npm uninstall dmn

init:
	npm install

build: clean
	./node_modules/.bin/gulp build

cordova:
	cd cordova && cordova build

watch: clean
	./node_modules/.bin/gulp watch

dist: export NODE_ENV = production
dist:
	echo $(NODE_ENV)
	./node_modules/.bin/gulp build
	$(MAKE) dist-uglify
	$(MAKE) dist-csswring

dist-uglify:
	./node_modules/.bin/uglifyjs build/app.js -o build/app.js --screw-ie8 --unsafe
	rm build/app.js.map

dist-csswring:
	./node_modules/.bin/csswring build/app.css build/app.css --sourcemap
	rm build/app.css.map
