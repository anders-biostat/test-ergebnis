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
- access log  
  Writes [testid|GMT time (not CEST!)].
  By default, it writes to the file ./log/access.log  
  It can be changed by TEST_RESULT_LOG_FILE env variable in the ops/test-ergebnis.service

## Nginx

I use nginx as a reverse proxy for the nodejs, hence it is enough to forward
all to the localhost:PORT
  
## The database

Currently we use SQLite.
The DB is generated with sqlite3 db/results.db file.

Add new data with a csv file with:
- two columns [testid], [testresult (can be "")]
- three columns [testid], [testresult], [timestamp].

Python script db/upsert-results.py --dbpath X --csv Y.
  
## Service

The configuration is located in ops/test-ergebnis.service.

In case of any disaster, service is being restarted, but if it does not,

```
sudo systemctl start test-ergebnis
```

It server at 8081 localhost port.

If you change the config for the service:

```
sudo systemctl daemon-reload
```

To see the log of the service (in case it does not function or can not start),
look for messages in /var/log/syslog file.
