#!/usr/bin/env bash

export CHROME_PATH="/usr/bin/google-chrome-stable"
export GOOGLE_APPLICATION_CREDENTIALS="$(pwd)/credentials.json"

nohup node index > audit_backend.log &
