# BaiTorng API & Development Flow

This document outlines the system architecture, authentication flow, and API endpoints for testing via Postman.

## 🔐 Authentication Flow (UI Ready)

Testing via `http://localhost:5001/login.html`

1. **Register**: `POST /api/v1/auth/register` (Handled by UI)
2. **Verify**: `POST /api/v1/auth/verify-phone` (Handled by UI)
3. **Login**: `POST /api/v1/auth/login` (Handled by UI)
4. **Dashboard**: `dashboard.html` (Handled by UI)

---

## 🚀 API Endpoints (Postman Testing)

Use the `token` from login in the **Authorization** header as `Bearer <your_token>`.

### 🛍️ Product Management
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/products` | Get all active products | No |
| **GET** | `/api/v1/products/:id` | Get product details | No |
| **POST** | `/api/v1/products` | Create a new product listing | Yes |
| **PUT** | `/api/v1/products/:id` | Update your product | Yes |
| **DELETE** | `/api/v1/products/:id` | Soft delete your product | Yes |

**Sample Product JSON for POST/PUT:**
```json
{
  "category_id": 1,
  "name": "Organic Jasmine Rice",
  "variety": "Phka Rumduol",
  "price_per_unit": 1.20,
  "unit": "kg",
  "quantity": 500,
  "province_id": 11,
  "description": "Premium quality rice from Kampong Cham."
}
```

### 👤 User Profile
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/users/profile` | Get your own profile | Yes |
| **PUT** | `/api/v1/users/profile` | Update your profile | Yes |

---

## 🛠 Project Structure
- `public/`: HTML files for Auth & Dashboard.
- `src/features/`: Backend logic organized by feature.
- `src/middleware/`: Auth and Error handlers.

### 📍 Reference IDs (for Testing)
- **Categories**: 1 (Crop), 2 (Fruit), 3 (Vegetable)
- **Provinces**: 1 (Phnom Penh), 11 (Kampong Cham), 20 (Battambang)

---

> [!IMPORTANT]
> **Postman Setup**:
> 1. Set `Base URL` to `http://localhost:5001`.
> 2. For protected routes, go to the **Auth** tab, select **Bearer Token**, and paste your JWT.
