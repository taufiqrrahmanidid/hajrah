# Coding Standards

## Backend (Laravel 11)
- **Standard:** Follow PSR-12 strictly.
- **Strict Typing:** Always use `declare(strict_types=1);` in all PHP files.
- **Type Hinting:** Mandatory for function arguments and return types.
- **Architecture:** 
    - **Controllers:** Keep thin, handle only request/response.
    - **Services:** Place business logic in `app/Services`.
    - **Actions:** Use for single-responsibility tasks (e.g., `CreateTenantAction`).
    - **DTOs:** Use Data Transfer Objects for complex request data.
- **API Standard:** Return consistent JSON: `{ "status": boolean, "data": array|object, "message": string, "errors": null|object }`.
- **Validation:** Use FormRequests for all input validation.

## Frontend (Vue 3 / Nuxt 3)
- **API Style:** Use Composition API (`<script setup>`).
- **Component Pattern:** 
    - `Props` definition at the top.
    - `Emits` definition next.
    - Business logic / composables.
- **State Management:** Use Pinia for global state.
- **File Naming:** PascalCase for components (`ManifestTable.vue`), camelCase for assets and scripts.
- **UI Components:** Primary use of Vuexy template components for consistency.
