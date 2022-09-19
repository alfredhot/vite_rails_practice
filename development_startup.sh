#!/bin/bash
bundle update
rm -rf /var/www/tmp/pids/server.pid
foreman start -f Procfile.dev