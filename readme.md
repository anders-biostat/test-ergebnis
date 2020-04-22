## Config

- Port  
  Environment variable TEST_RESULT_PORT (DEFAULT for testing is 1234)
  
- static pages  
  One can serve static files in public/ from nginx and use only nodejs as api point:
  set env var TEST_RESULT_USE_REVERSE_PROXY to not null
  
- manual run:
  serve at localhost:8081
  ```
  make run-prod
  ``` 

## Nginx

I use nginx as a reverse proxy for the nodejs, hence it is enough to forward
all to the localhost:PORT
  
## The database

Currently we use SQLite.
The DB is generated with sqlite3 db/results.db file.
  
