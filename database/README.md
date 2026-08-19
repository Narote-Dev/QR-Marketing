# Database

PostgreSQL is provisioned by the root Docker Compose file. `init/` is reserved for non-sensitive bootstrap SQL; EF Core migrations will be added when a domain model exists.
