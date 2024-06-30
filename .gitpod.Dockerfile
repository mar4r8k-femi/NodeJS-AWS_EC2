FROM gitpod/workspace-full

# Install Node.js LTS
RUN sudo apt update \
    && curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - \
    && sudo apt-get install -y nodejs
