#!/bin/sh
export TestId=`date +%s`
echo "TestId is ${TestId}"
protractor conf.js --suite=mysuite1 

