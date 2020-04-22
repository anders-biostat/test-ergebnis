init-db:
	sqlite3 db/results.db < db/init.sql

add-test-data:
	nodejs test/test-table.js

