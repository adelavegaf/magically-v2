#!/usr/bin/env bash

export CHROME_PATH="/opt/stickmanventures/chrome-headless/headless_shell"
export GOOGLE_APPLICATION_CREDENTIALS="$(pwd)/credentials.json"

node index
