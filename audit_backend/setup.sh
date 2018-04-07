#!/usr/bin/env bash

curl https://storage.googleapis.com/chrome-builds/headless/chrome-headless.deb > chrome-headless.deb

apt-get update && apt-get install -y \
  build-essential \
  software-properties-common \
  ca-certificates \
  byobu curl git htop man unzip vim wget \
  sudo \
  gconf-service \
  libcurl3 \
  libexif-dev \
  libgconf-2-4 \
  libglib2.0-0 \
  libgl1-mesa-dri \
  libgl1-mesa-glx \
  libnspr4 \
  libnss3 \
  libpango1.0-0 \
  libv4l-0 \
  libxss1 \
  libxtst6 \
  libxrender1 \
  libx11-6 \
  libxft2 \
  libfreetype6 \
  libc6 \
  zlib1g \
  libpng12-0 \
  wget \
  apt-utils \
  xdg-utils \
  --no-install-recommends && \
  dpkg -i './chrome-headless.deb' && \
  curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && \
  sudo apt-get install -y nodejs && \
  sudo apt-get install -y libnss3 && \
  rm -rf /var/lib/apt/lists/*
