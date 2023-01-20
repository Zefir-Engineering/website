OJS := $(wildcard *.js)
MJS := $(OJS:.js=.min.js)
DJS := $(addprefix dist/,${MJS})

all: $(DJS)
.PHONY: all

dist/%.min.js : %.js
	npx uglify-js $^ --compress --mangle toplevel --no-annotations -o $@ --source-map

format:
	npx prettier -w *.js

install:
	yarn add -D uglify-js prettier

clean:
	@rm -rvf node_modules yarn.lock package.json dist/*

re: clean install all
