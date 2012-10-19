#!/bin/sh

echo "create minified code..."
java -jar compiler.jar\
     --js_output_file d3binding.min.js\
     --js `awk -v ORS=' ' '1;END{printf"\n"}' jsfiles.txt`
