# Database Conventions (PostgreSQL)

## Multi-Tenancy Strategy
- **Isolation:** Schema-based separation. 
- **Public Schema:** Holds global tables (`tenants`, `subscription_plans`, `global_settings`).
- **Tenant Schema:** Each tenant has its own schema (e.g., `tenant_01`, `tenant_02`) containing transaction and operational data.
- **Switching Logic:** Middleware detects tenant from domain/header and sets PostgreSQL search path: `SET search_path TO tenant_x, public`.

## Schema Naming & Types
- **Tables:** snake_case, plural (e.g., `package_bookings`).
- **Columns:** snake_case.
- **Primary Keys:** Use `bigserial` or `uuid` for IDs.
- **Foreign Keys:** `table_name_singular_id` (e.g., `package_id`).
- **Booleans:** Prefix with `is_` or `has_` (e.g., `is_active`, `has_paid`).
- **Timestamps:** Mandatory `created_at` and `updated_at`. Use `deleted_at` for soft deletes on transaction records.

## Indexes
- Indices on all foreign keys.
- Composite indices for frequent filter combinations (e.g., `package_id` + `status`).
