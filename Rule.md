# Project Rules

1. Do not change the technology stack unless explicitly requested.
2. Frontend must use Next.js + TypeScript.
3. Backend must use ASP.NET Core .NET 8.
4. Database must use PostgreSQL.
5. Frontend and backend must remain separate projects.
6. Backend must expose REST APIs.
7. Do not put business logic inside controllers.
8. Use DTOs between API and business layer.
9. Use EF Core for database access.
10. Use Tailwind CSS and shadcn/ui for UI.
11. Use qr-code-styling for client-side QR preview and customization.
12. Do not implement a QR encoding algorithm from scratch.
13. SEO is a first-class requirement.
14. All public SEO pages must have unique metadata.
15. Avoid programmatically generating thin or duplicate SEO pages.
16. Do not add unnecessary dependencies.
17. Do not rewrite working code unnecessarily.
18. Before modifying existing architecture, inspect the current implementation.
19. Every feature must be implemented in a small, testable phase.
20. Do not implement future phases unless explicitly requested.
