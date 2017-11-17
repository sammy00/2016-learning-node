#!/bin/bash

# --rm: remove the container on exit
# -p 3000:3000: map the host port 3000 to 0.0.0.0:3000 in container
# -u "node": run as user named 'node'
# -v ${PWD}:/home/node/app: mount the guides folder in host to '/home/node/app' in container
# -it: run it interactive mode and assigned a tty
docker run --rm -p 3000:3000 -u "node" -v ${PWD}:/home/node/app -w /home/node/app -it node:9.1 bash
