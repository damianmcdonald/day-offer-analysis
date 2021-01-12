#!/bin/bash

EXECUTING_DIR="${PWD}"

# check if we are working with a prepackaged project
if [ -f "${PWD}/offer-analysis.jar" ]; then
    echo " Found offer-analysis.jar in ${PWD}"
    java -jar "${PWD}/offer-analysis.jar" "--spring.config.location=${PWD}/application.properties"
    exit 0;
fi

# check if we are working with a java source project
if [ -d "${PWD}/target" ]; then
    if [ -f "${PWD}/target/offer-analysis.jar" ]; then
        echo " Found offer-analysis.jar in ${PWD}/target"
        java -jar "${PWD}/target/offer-analysis.jar" "--spring.config.location=${PWD}/src/main/resources/application.properties"
        exit 0;
    fi
fi

echo "Unable to find a suitable offer-analysis.jar file to execute".
exit 999;