#!/bin/bash
# Upload files to Github - https://github.com/talesCPV/P5_javascript.git

cd ..

git init

git add .

git commit -m "by_script"

git remote add origin "https://github.com/talesCPV/P5_javascript.git"

git commit -m "by_script"

git push -f origin master


