.PHONY: all init watch build dist deep-clean cordova dist-csswring dist-uglify tarball full-tarball

all: init watch

clean:
	rm -rf build
	rm -rf cordova/platforms/ios/build
	rm *.tar.gz

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
	rm -rf svg-diplomacy svg-diplomacy.tar svg-diplomacy.tar.gz
	mkdir -p svg-diplomacy
	cp -r `ls | grep -v -e "svg-diplomacy" -e "svg-diplomacy-full" -e "node_modules" -e "build" -e ".tar"` svg-diplomacy
	cp .jscsrc .jshintrc svg-diplomacy
	rm -rf svg-diplomacy/docs/locales svg-diplomacy/docs/images svg-diplomacy/docs/*.pdf
	rm -rf svg-diplomacy/cordova/platforms/ios/www svg-diplomacy/cordova/platforms/ios/build svg-diplomacy/cordova/platforms/ios/CordovaLib/build svg-diplomacy/cordova/www
	tar -cf svg-diplomacy.tar svg-diplomacy
	rm -rf svg-diplomacy
	gzip svg-diplomacy.tar

full-tarball:
	rm -rf svg-diplomacy-full svg-diplomacy.full.tar svg-diplomacy.full.tar.gz
	mkdir -p svg-diplomacy-full
	cp -r `ls | grep -v -e "svg-diplomacy" -e "svg-diplomacy-full" -e "build" -e ".tar"` svg-diplomacy-full
	cp .jscsrc .jshintrc svg-diplomacy-full
	tar -cf svg-diplomacy.full.tar svg-diplomacy-full
	rm -rf svg-diplomacy-full
	gzip svg-diplomacy.full.tar
