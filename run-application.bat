@ECHO OFF

SET "executing_dir=%~dp0"

REM check if we are working with a prepackaged project
IF EXIST %executing_dir%offer-analysis.jar (
    ECHO "Found offer-analysis.jar in %executing_dir%"
    java -jar "%executing_dir%offer-analysis.jar" "--spring.config.location=%executing_dir%application.properties"
    EXIT 0
)

REM check if we are working with a java source project
IF EXIST %executing_dir%target (
	IF EXIST %executing_dir%target\offer-analysis.jar (
	    ECHO "Found offer-analysis.jar in %executing_dir%target"
		java -jar "%executing_dir%target\offer-analysis.jar" "--spring.config.location=%executing_dir%src\main\resources\application.properties"
		EXIT 0
	)
)

ECHO "Unable to find a suitable offer-analysis.jar file to execute"
EXIT 999