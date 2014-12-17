.PHONY: all init watch build dist deep-clean cordova dist-csswring dist-uglify tarball full-tarball

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

tarball:
	rm -rf tarball svg-diplomacy.tar svg-diplomacy.tar.gz
	mkdir -p tarball
	cp -r `ls | grep -v -e "tarball" -e "tarball-full" -e "node_modules" -e "build" -e ".tar"` tarball
	rm -rf tarball/docs/locales tarball/docs/images tarball/docs/*.pdf
	rm -rf tarball/cordova/platforms/ios/www tarball/cordova/platforms/ios/build tarball/cordova/platforms/ios/CordovaLib/build tarball/cordova/www
	tar -cf svg-diplomacy.tar tarball
	rm -rf tarball
	which -s zopfli
	zopfli svg-diplomacy.tar

full-tarball:
	rm -rf tarball svg-diplomacy.tar svg-diplomacy.tar.gz
	mkdir -p tarball-full
	cp -r `ls | grep -v -e "tarball" -e "tarball-full" -e "build" -e ".tar"` tarball-full
	tar -cf svg-diplomacy.full.tar tarball-full
	rm -rf tarball-full
	which -s zopfli
	zopfli svg-diplomacy.full.tar
