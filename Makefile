init-db:
	sqlite3 db/results.db < db/init.sql

add-test-data:
	nodejs test/test-table.js

install-deps:
	npm install

run-prod:
	 @TEST_RESULT_PORT=8081 nodejs server/app.js
