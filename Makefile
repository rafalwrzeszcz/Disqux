##
# Build automation.
#
# @author Rafał Wrzeszcz <rafal.wrzeszcz@wrzasq.pl>
# @copyright 2012 © by Rafał Wrzeszcz - Wrzasq.pl.
# @version 0.0.2
# @since 0.0.1
# @package WrzasqPl\Disqux
##

CLOSURE_COMPILER = closure/compiler.jar

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
init: $(CLOSURE_COMPILER)

# Build JavaScripts.
minify: disqus.min.js.gz

# File specific rules.

disqus.min.js: disqus.js $(CLOSURE_COMPILER)
	java -jar $(CLOSURE_COMPILER) --js disqus.js --js_output_file $@

$(CLOSURE_COMPILER): closure/compiler.zip
	unzip $^ -d closure

closure/compiler.zip: closure
	wget http://closure-compiler.googlecode.com/files/compiler-latest.zip -O $@

closure:
	mkdir $@

# Genric rules.

%.gz: %
	cat $^ | gzip > $@
