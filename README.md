# voxx-car-systems-project

A fleet management system that handles vehicle tracking, maintenance, insurance, inspections, accidents, rentals, and company management in a single full-stack platform.

## Architecture

This project is built with Hexagonal Architecture (Ports & Adapters). The business logic (domain layer) has no dependency on any framework. All communication with the outside world goes through ports and adapters. Backend and frontend are developed as separate modules and containerized with Docker.

Write operations go to PostgreSQL, while read operations use Couchbase, implementing the CQRS (Command Query Responsibility Segregation) pattern. Domain events are published through Kafka and delivered to the frontend in real time via WebSocket.

## Tech Stack

### Backend
- **Java 21, Spring Boot 3**
- **Hexagonal Architecture** (Ports & Adapters)
- **CQRS** — write to PostgreSQL, read from Couchbase
- **DDD** (Domain-Driven Design) — aggregates, value objects, domain events
- **Apache Kafka** — domain event publishing and consuming
- **WebSocket** — real-time notifications (separate notifier per entity)
- **Keycloak** — centralized authentication and authorization (OAuth2 + JWT)
- **Liquibase** — database migration management (4 migration files)
- **PostgreSQL** — primary database (write side)
- **Couchbase** — cache and read model
- **Swagger/OpenAPI** — API documentation

### Frontend
- **React 18 + TypeScript**
- **TanStack Router** — file-based routing
- **TanStack Query** — server state management
- **Shadcn/UI** — UI component library
- **Vite** — build tool
- **Axios** — HTTP client
- **Zod** — schema validation

### Infrastructure
- **Docker + Docker Compose** — containerization of all services
- **GitHub Actions CI/CD** — automated build, push to DockerHub, deploy to remote server
- **Nginx** — reverse proxy and load balancer
- **Keycloak** realm configuration (imported via JSON)
- **Couchbase** automated setup script (cluster, bucket, and user creation)

## Project Structure

```
voxx-car-systems-project/
├── voxx-car-server/                # Backend (Java/Spring Boot)
│   ├── domain/                     # Business logic — entities, value objects, events (framework-independent)
│   ├── application/                # Use cases, ports (in/out), DTOs
│   ├── common/                     # Shared modules
│   │   ├── common-domain/          # Base entity, aggregate, value object abstractions
│   │   ├── common-application/     # Use case and query executor interfaces
│   │   ├── common-framework/       # Global exception handler, error codes
│   │   └── common-shared/          # Shared resources such as CORS constants
│   └── framework/                  # Adapters (REST, JPA, Kafka, WebSocket, Keycloak, Couchbase)
│       ├── adapter/in/web/         # REST controllers
│       ├── adapter/out/persistence/jpa/       # PostgreSQL JPA implementations
│       ├── adapter/out/persistence/couchbase/  # Couchbase read model
│       ├── adapter/out/messaging/kafka/        # Kafka producers and consumers
│       ├── adapter/out/websocket/              # WebSocket notifiers (one per entity)
│       ├── config/security/                    # Keycloak + JWT security configuration
│       └── resources/db/migrations/            # Liquibase migration files
├── voxx-car-client/                # Frontend (React/TypeScript)
│   ├── src/components/web/         # Business screens (vehicle, company, maintenance, insurance, etc.)
│   ├── src/hooks/                  # Custom hooks (separate hook per entity)
│   ├── src/requests/               # API request functions
│   ├── src/schemas/                # Zod validation schemas
│   └── src/routes/                 # TanStack Router file-based routing
├── infrastructure/                 # Docker infrastructure configuration
│   ├── couchbase/                  # Couchbase automated setup script
│   ├── keycloak/                   # Realm JSON configuration
│   └── nginx/                      # Nginx reverse proxy configuration
├── .github/workflows/              # CI/CD pipeline (GitHub Actions)
├── docker-compose.yaml             # Orchestration of all services
└── .env.dev / .env.prod            # Environment variables
```

## Key Design Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Architecture | Hexagonal (Ports & Adapters) | Separates business logic from framework, makes testing easy, adapters are swappable |
| Data Separation | CQRS (PostgreSQL write, Couchbase read) | Independent scalability for write and read performance |
| Messaging | Apache Kafka | Reliable publishing and consuming of domain events, loose coupling between services |
| Real-time | WebSocket | Delivers events from Kafka consumers to the frontend instantly |
| Authentication | Keycloak (OAuth2 + JWT) | Centralized user management with role-based access control |
| Database Migration | Liquibase | Version-controlled schema changes with rollback support |
| Frontend Routing | TanStack Router (file-based) | Type-safe routing with automatic code splitting |
| CI/CD | GitHub Actions → DockerHub → Remote Server | Fully automated deploy pipeline |

## What I Learned

- Isolating the domain layer completely from the framework with Hexagonal Architecture and how much easier it makes testing
- The advantages and complexity of separating write and read models with the CQRS pattern
- Building a domain event publish/consume cycle with Kafka and integrating real-time notifications via WebSocket
- Configuring Keycloak realms, JWT validation, and implementing role-based security
- Managing safe database migrations in production with Liquibase
- Setting up a complete CI/CD pipeline with GitHub Actions: Docker build → push → deploy

## Getting Started

### Prerequisites
- Java 21+
- Node.js 18+
- Docker and Docker Compose

### Run Locally
```bash
git clone https://github.com/CemAkr30/voxx-car-systems-project.git
cd voxx-car-systems-project
docker-compose --env-file .env.dev up -d
```

## Modules
Vehicle Fleet, Maintenance, Insurance, Inspection, MTV, Accident, Damage, Company, Address, Contact, Purchase Invoice, Fleet Exit, Car Rental, Brand, Model management

## Status
🟢 Active — under continuous improvement
