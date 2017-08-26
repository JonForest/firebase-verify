# Firebase Verify
A simple node app that exposes a GET `verfify-id?token=` end-point to validate a user's JWT ID token and return their
decoded token as a json object.

The idea is that this can be used by back-ends that don't have official Firebase Admin SDKs.  Ideally ran as a Docker container so that there is no need to worry about setting up Node on your server.
Note: this currently serves on `http://localhost:<port>/verify-id?token=`

If you want it served from a different URL, you'll need to fork or add an issue.  It's not required for my initial use-case.
It also doesn't serve over https as, when run locally, it's not exposed to any external traffic.  Running Express over https is normally done with a nginx proxy offering https in front of Node.  You can do this if you wish, but I'm not interested in managing certificates - albeit probably self-signed ones - in a docker container.

## To Execute as a Docker container
```
docker build -t <yournamespace>/firebase-verify
docker run -p 3000:3000 -d \
  -e PORT=3000 \ 
  -e SAK_LOCATION=/src/app/serviceaccountkey.json \
  -e PROJECT_NAME=firebase-db-name \
  -v /local/location/of/serviceaccountkey:/src/app \
  <yournamespace>/firebase-verify
```

## To execute directly from the command line
PORT=3000 \
SAK_LOCATION=/local/location/of/serviceaccountkey/serviceaccountkey.json \
PROJECT_NAME=firebase-db-name \
node app.js
