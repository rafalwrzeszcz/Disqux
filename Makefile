##
# Build automation.
#
# @author Rafał Wrzeszcz <rafal.wrzeszcz@wrzasq.pl>
# @copyright 2012 © by Rafał Wrzeszcz - Wrzasq.pl.
# @version 0.0.1
# @since 0.0.1
# @package WrzasqPl\Disqux
##

# By default build the project.
default: build

# Make everything needed to run to project out-of-the-box.
all: init build

# Build all needed files.
build: minify

# Rebuild the project.
full: clean build

# Clean up project builds.
clean:
	rm -f disqus.min.js*

# Initialize project structure.
init:
	git submodule update --init --recursive

# Build JavaScripts.
minify: disqus.min.js.gz

# File specific rules.

disqus.min.js: disqus.js
	java -jar yuicompressor.jar $^ --charset utf-8 -o $@ --type js

# Genric rules.

%.gz: %
	cat $^ | gzip > $@