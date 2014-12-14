.PHONY: all update-deps watch

all: update-deps watch

update-deps:
	npm install

watch:
	./node_modules/.bin/gulp watch
