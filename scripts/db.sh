#!/usr/bin/env bash
docker-compose rm -vf \
  && docker volume prune -f \
  && docker-compose up --build
