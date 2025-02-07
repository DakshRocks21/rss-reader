# RSS-Reader


Demo Creds : `daksh@dakshthapar.com:123456`

## Misc TODO

- [ ] Input validation for URL. Check if it's RSS is valid.
- [ ] READER MODE!

# Writeup: Why We Used Specific Libraries in the Project

## Library: `date-fns`

> Written by Daksh

- **Purpose**: Provides utilities for formatting and validating dates.
- **Why Used**: To handle and format publication dates of RSS feed items, as well as standardizing dates and filtering by time periods like `last24h`, `last7d`.

---

## Libraries: `firebase` and `firebase-admin`

> Written by Daksh

- **Purpose**: This allows me to integrate with Firebase services like Authentication and Firestore.
- **Why Used**:
  - **`firebase`**: Handles client-side user authentication and database interactions.
  - **`firebase-admin`**: Handles server-side operations like secure data fetching and user management.

---

## Library: `react-markdown`

> Written by Daksh

- **Purpose**: Renders Markdown content into HTML directly in React components.
- **Why Used**: To display RSS feed content snippets or descriptions formatted in Markdown while ensuring security and flexibility.

---

## Library: `rss-parser`

> Written by Daksh

- **Purpose**: Parses RSS and Atom feeds into JavaScript objects.
- **Why Used**: Simplifies fetching and parsing RSS feed data from URLs into structured formats for rendering in the app.

## Library: `react-select`

> Written by Daksh

- **Purpose**: Provides a flexible and customizable dropdown component for React.
- **Why Used**: To allow users to select RSS feeds from a dropdown list, enabling easy feed selection and management.

## Library: `react-icons`

> Written by Puru

- **Purpose**: Allows for a default profile picture to be displayed if user does not have one
- **Why Used**: To allow users to select RSS feeds from a dropdown list, enabling easy feed selection and management.

## Library: `actify`

> Written by Puru

- **Purpose**: Ensures ease in toggling themes for user as well as improved UX for toggling themes rather than the regular button html element
- **Why Used**: Used as a component to toggle themes

