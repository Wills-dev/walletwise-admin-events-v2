# WalletWise Events Admin

WalletWise Events Admin is the partner-facing dashboard for creating events,
managing tickets, reviewing revenue, and maintaining event settings. It also
provides the authentication flow used by WalletWise event partners, including
login, OTP verification, forgotten-password requests, and password reset.

## Product capabilities

- Partner authentication and persisted session state
- Email OTP verification
- Forgotten-password and password-reset flows
- Event overview and performance summaries
- Ticket summaries, filtering, tables, and pagination
- Revenue summaries, breakdowns, and charts
- Event creation with ticket types and custom registration fields
- Thumbnail and event-page image guidance with animated live previews
- Event submission review and approval workflow
- Event and ticket settings
- Responsive dashboard navigation

Some dashboard data is currently represented by local or placeholder data while
the remaining backend integrations are completed. Check the API modules before
assuming that every screen is connected to a production endpoint.

## Technology

- [Next.js 16](https://nextjs.org/) App Router
- React 19 and TypeScript
- Tailwind CSS 4
- TanStack Query for server-state mutations and requests
- TanStack Table for data tables
- Zustand for persisted client state
- Axios for HTTP requests
- Recharts for dashboard visualizations
- Framer Motion for interface transitions
- Sonner for notifications
- Lucide React for icons

## Requirements

- Node.js 20 or newer
- npm
- Access to the WalletWise backend API

## Local setup

1. Clone the repository and enter the project directory.

   ```bash
   git clone <repository-url>
   cd walletwise-admin-events-v2
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create `.env.local` in the project root.

   ```env
   NEXT_PUBLIC_BACKEND_BASE_URL=https://example.com/api/v2
   NEXT_PUBLIC_COOKIE_DOMAIN=
   ```

4. Start the development server.

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

`NEXT_PUBLIC_BACKEND_BASE_URL` should include the API version prefix expected by
the backend. For the current partner endpoints, that prefix is `/api/v2`.
`NEXT_PUBLIC_COOKIE_DOMAIN` is optional and should normally be omitted during
local development.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Next.js development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint across the project |

## Application routes

| Route | Description |
| --- | --- |
| `/` | Default login screen |
| `/login` | Partner login |
| `/verify?email=<email>` | Six-digit email OTP verification |
| `/forgot-password` | Request password-reset instructions |
| `/reset-password?token=<token>` | Set a new password using a reset token |
| `/overview` | Event dashboard and summaries |
| `/tickets` | Ticket management and reporting |
| `/revenue` | Revenue reporting and breakdowns |
| `/events/new` | Create an event |
| `/settings` | Event and ticket settings |

The backend-generated reset email must link to the frontend reset route and
include the reset token in the query string:

```text
https://<admin-domain>/reset-password?token=<reset-token>
```

## Authentication and password recovery

Authentication requests are defined in `src/lib/api/index.tsx`. Form behavior is
kept in dedicated hooks under `src/lib/hooks`, while components remain focused
on rendering.

The currently integrated partner endpoints are:

| Action | Method | API path |
| --- | --- | --- |
| Login | `POST` | `/partner/login` |
| Forgot password | `POST` | `/partner/forgot-password` |
| Reset password | `POST` | `/partner/reset-password` |

Forgot-password request:

```json
{
  "email": "info@elegance.ng"
}
```

Reset-password request:

```json
{
  "token": "<reset-token>",
  "newPassword": "NewStrongPass456!"
}
```

On successful login, the access token is stored in the
`walletwiseEventAdminToken` browser cookie for 30 days. The Axios request
interceptor reads that cookie and sends the token as a Bearer authorization
header. Partner details are persisted separately in the Zustand auth store.

Because the current token is written from client-side JavaScript, it cannot be
marked `HttpOnly`. If the backend later supports secure server-issued cookies,
prefer that approach for production authentication.

## Event creation

Partners create events at `/events/new`. The form supports the following
backend categories:

- `Concert`
- `Beauty Pageant`
- `Sports`
- `Conference`
- `Religion`
- `Others`

The form requires a square thumbnail image and accepts an optional landscape
banner:

| Field | Required | Recommended ratio | Accepted formats | Maximum size |
| --- | --- | --- | --- | --- |
| `thumbnail` | Yes | 1:1 | JPG, JPEG, PNG, WEBP | 10 MB |
| `banner` | No | 16:9 | JPG, JPEG, PNG, WEBP | 10 MB |

The create-event screen includes an upload guide and an animated live preview
for both website placements. Selected browser files remain available while
navigating within the current client-side session, but they are not retained
after a browser refresh or full page reload.

### Event validation

Before submission, the client verifies that:

- All required event fields have values.
- The event date is today or later.
- The end time is later than the start time.
- A supported thumbnail of no more than 10 MB is selected.
- An optional banner uses a supported format and does not exceed 10 MB.
- At least one complete ticket tier is confirmed.
- Beauty Pageant custom fields are confirmed before submission.

### Request format

Events are submitted to `POST /partner-event/create` as
`multipart/form-data`. Axios must not globally force `application/json`,
otherwise browser `File` objects are serialized as empty objects.

The multipart fields shared by every event are:

```text
title
description
category
date
time
end_time
address
service_fee
refund_policy
ticket_types
thumbnail
banner (optional)
```

`ticket_types` is a JSON-encoded array within the multipart request:

```json
[
  {
    "type": "VIP",
    "price": 25000,
    "capacity": 100
  },
  {
    "type": "Regular",
    "price": 10000,
    "capacity": 500
  }
]
```

For `Beauty Pageant` events, `form_settings` is also included as a JSON-encoded
multipart field:

```json
{
  "full_name": {
    "input_type": "text",
    "is_required": true
  },
  "date_of_birth": {
    "input_type": "date",
    "is_required": true
  },
  "state_of_origin": {
    "input_type": "text",
    "is_required": true
  },
  "custom_fields": [
    {
      "field_name": "Height (cm)",
      "input_type": "number",
      "is_required": true
    }
  ]
}
```

`form_settings` is omitted for every non-pageant category.

After a successful upload, the partner sees a confirmation explaining that the
event is waiting for approval. The screen redirects to
`/overview?tab=all-event` after 15 seconds and also provides an immediate
“View all events” button.

## Partner event analytics

The overview dashboard requests partner event data from:

```text
GET /partner-event
```

The request is implemented in `src/lib/api/event.ts` and consumed through
`useGetPartnerEventAnalytics`. The response envelope and nested analytics data
are modelled in `src/lib/types/analytics.ts`. The overview maps the two backend
chart arrays into the shared `{ label, value, color? }` presentation shape, so
the chart components stay independent of endpoint-specific field names.

Dashboard query hooks follow this project pattern:

```tsx
export const useGetPartnerEventAnalytics = (params = {}) => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["partner event analytics", params.page, params.limit],
    queryFn: () => getPartnerEventAnalytics(params),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};
```

## Project structure

```text
src/
├── app/                    # App Router pages and global layout
├── components/
│   ├── atoms/              # Small reusable UI primitives
│   ├── molecules/          # Forms, tables, charts, and composed controls
│   ├── organisms/          # Page-level feature sections
│   ├── templates/          # Authentication and dashboard layouts
│   └── ui/                 # Shared generated/base UI components
├── lib/
│   ├── api/                # Backend request functions
│   ├── helpers/            # Formatting, cookies, routing, and validation
│   ├── hooks/              # Form behavior and feature hooks
│   ├── types/              # Shared TypeScript types
│   └── axiosInstance.ts    # API base URL and authorization interceptor
└── store/                  # Persisted Zustand stores
```

The UI follows an atomic-style hierarchy:

- **Atoms** are basic reusable elements such as inputs, labels, and buttons.
- **Molecules** combine atoms into focused controls or forms.
- **Organisms** assemble feature sections used by pages.
- **Templates** provide the shared authentication and dashboard shells.

Keep API calls in `src/lib/api`, stateful form behavior in `src/lib/hooks`, and
JSX rendering in components.

## Development conventions

- Use the `@/` alias for imports from `src`.
- Add new routes under `src/app/<route>/page.tsx`.
- Reuse `AuthLayout` for authentication screens and `MainLayout` for dashboard
  screens.
- Keep request functions independent from React components.
- Use TanStack Query mutations for user-triggered API writes.
- Keep query hooks small: configure the query, destructure the required query
  state, and return only what consuming components need.
- Keep API payload transformation and form behavior outside presentation
  components.
- Route API failures through the shared `promiseErrorFunction` helper so backend
  messages are displayed consistently.
- Before using or changing a Next.js API, consult the version-specific guidance
  bundled in `node_modules/next/dist/docs/`.

## Validation

Before opening a pull request, run:

```bash
npm run lint
npm run build
```

At the time of writing, two existing repository issues may affect full
validation:

- TypeScript checking includes `Button.test.tsx`, but the repository does not
  currently declare `vitest` or `@testing-library/react`.
- Production prerendering reports that `/overview` uses `useSearchParams`
  without the required Suspense boundary.

These issues are separate from the event creation and analytics work but should
be resolved to restore a clean CI build.

## Production deployment

1. Configure the environment variables in the hosting platform.
2. Ensure the backend allows requests from the deployed frontend origin.
3. Configure reset emails to use the deployed `/reset-password` URL.
4. Run `npm run build`.
5. Serve the build with `npm run start`, or deploy it through a compatible
   Next.js hosting provider.

Do not commit `.env.local`, access tokens, reset tokens, or production
credentials.

## Troubleshooting

### Requests return 404

Confirm that `NEXT_PUBLIC_BACKEND_BASE_URL` contains the expected `/api/v2`
prefix and does not duplicate the endpoint path.

### Reset links open without a form

The `/reset-password` route requires a non-empty `token` query parameter.
Confirm that the backend email template includes it.

### Requests are unauthorized

Check that `walletwiseEventAdminToken` exists in the browser cookies and that
the backend accepts it as a Bearer token.

### The API reports that the thumbnail is required

Inspect the request in browser developer tools. It must use
`multipart/form-data` and show `thumbnail` as a binary file. If the request uses
`application/json` and displays `"thumbnail": {}`, the file has been serialized
incorrectly.

### Images disappear after refreshing the create-event page

This is expected. The browser does not persist selected `File` objects across
full page reloads. Select the images again before submitting the event.

### The production build cannot download fonts

The root layout uses `next/font` with Google-hosted fonts. The build environment
must have network access to Google Fonts, or the project should be migrated to
locally hosted font files.
