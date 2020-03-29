#!/usr/bin/env bash
set -ex
RAILS_ENV=test rails db:create
RAILS_ENV=test rails db:migrate
rails test
rails test:system
