#!/bin/sh

# Start Docker daemon in the background
dockerd &

# Generate SSH keygen
ssh-keygen -A

# Start SSH daemon
/usr/sbin/sshd -D -e "$@"
