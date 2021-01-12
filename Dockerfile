FROM openjdk:8-jdk-alpine
COPY target/offer-analysis.jar /app/offer-analysis.jar
COPY src/main/resources/scripts/wait-for.sh /app/wait-for.sh
RUN chmod u+rx /app/wait-for.sh
CMD ["java","-jar","/app/offer-analysis.jar", "--spring.config.location=/app/config/application.properties"]