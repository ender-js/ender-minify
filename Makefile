tests:
	@node -e "require('colors');console.log('Running tests...'.bold.yellow)"
	@./node_modules/.bin/jshint lib/ test/
	@./node_modules/.bin/buster-test -g all
