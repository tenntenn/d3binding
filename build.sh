#!/bin/sh

echo "create minified code..."
cat `awk -v ORS=' ' '1;END{printf"\n"}' jsfiles.txt `> d3binding.js
java -jar compiler.jar\
     --js_output_file d3binding.min.js\
     --js d3binding.js
