# Security Protocol

## Data Protection
- **Encryption:** Use Laravel's `Crypt` (AES-256-CBC) for sensitive data:
    - Passport Numbers.
    - ID Card Numbers (NIK).
    - Personal Phone Numbers.
- **Storage:** Secure S3-compatible storage with private access. Use temporary signed URLs for viewing documents.

## Authentication & Authorization
- **Auth:** Laravel Sanctum for API token-based authentication.
- **RBAC:** Strict Role-Based Access Control. No "Universal Admin" inside tenant schemas except the Super Admin bypass.
- **Tenant Isolation Check:** Middleware must verify that the authenticated user belongs to the requested `tenant_id` scope.

## Auditing & Monitoring
- **Audit Logs:** Log every `CREATE`, `UPDATE`, and `DELETE` action on transaction, accounting, and HRIS modules.
- **Rate Limiting:** Global API rate limit (e.g., 60 requests/minute per IP) + specific limits for auth routes.
- **Sanitization:** Strict XSS and SQL Injection prevention via Laravel's Eloquent and Blade/Vue escaping.

## Infrastructure Security
- **SSL:** Forced HTTPS for all domains and subdomains.
- **DB Security:** Database not accessible from the public internet (only via VPC/Localhost).
- **Backups:** Daily automated backups with 30-day retention.
