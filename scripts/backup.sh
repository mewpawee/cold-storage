#!/bin/bash
mongodump --uri="mongodb://root:rootpassword@localhost:6666/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false" -o ../backup/$(date +%m-%d-%y)
