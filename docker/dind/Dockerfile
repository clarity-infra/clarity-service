# Use the official Docker-in-Docker image
FROM docker:stable-dind

# Install OpenSSH and other dependencies
RUN apk add --no-cache \
  openssh \
  curl \
  git \
  bash

# Set root password
RUN echo 'root:testingonly' | chpasswd

# Configure SSH to allow root login
RUN \sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config && \
  sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config && \
  mkdir -p /root/.ssh && \
  chmod 700 /root/.ssh


# Add a startup script to launch both the Docker daemon and SSH daemon
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose Docker socket for DinD functionality
VOLUME /var/lib/docker

# Run the startup script
CMD ["/entrypoint.sh"]
# ENTRYPOINT ["sh", "-c", "while :; do sleep 1; done"]
