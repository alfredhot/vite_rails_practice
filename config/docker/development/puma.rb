#!/usr/bin/env puma
root = `pwd`.to_s.strip
env = 'development'
socket_path = "#{root}/tmp/sockets/puma.socket"
# daemonize true
directory root
environment env
pidfile "#{root}/tmp/pids/puma.pid"
# workers 1
threads 8, 16
# bind 'tcp://0.0.0.0:10001'
bind "unix:///#{socket_path}"
worker_timeout 60
worker_boot_timeout 60
preload_app! if env == 'production'
state_path "#{root}/tmp/pids/puma.state"
tag "alfred-admin"
