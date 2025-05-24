# 1. Build aşaması: Maven + JDK 17
FROM maven:3.9.4-eclipse-temurin-17 AS builder

WORKDIR /app
COPY . .
RUN mvn clean package -pl framework -am -DskipTests

# 2. Runtime aşaması: Küçük ama uyumlu imaj
FROM amazoncorretto:17-alpine AS runtime

WORKDIR /app
COPY --from=builder /app/framework/target/framework-*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
