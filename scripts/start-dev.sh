#!/usr/bin/env bash
set -e
RAILS_ENV=development rails db:migrate
rails server
