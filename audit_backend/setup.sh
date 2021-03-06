#!/usr/bin/env bash

apt-get update && apt-get install -y \
    apt-transport-https \
	ca-certificates \
	curl \
  	gnupg \
	--no-install-recommends \
	&& curl -sSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
	&& echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
	&& apt-get update && apt-get install -y \
	google-chrome-stable \
	--no-install-recommends \
	&& apt-get purge --auto-remove -y curl gnupg \
	&& rm -rf /var/lib/apt/lists/*
    curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash - && \
    sudo apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*
