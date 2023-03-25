#!/bin/bash



init() {
  docker-compose build
  sleep 1
  docker-compose up

}


case $1 in

    init)
     init
 ;;
esac