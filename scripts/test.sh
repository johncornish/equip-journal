#!/usr/bin/env bash
RAILS_ENV=test rails db:migrate
rails test
