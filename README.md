A backend News Aggregator API built with Node.js, Express, and MongoDB that allows users to:

Register and authenticate using JWT

Set news preferences (categories, languages)

Fetch personalized news articles

Cache news responses to reduce external API calls

🚀 Features Implemented
✅ User Authentication

User Registration (POST /api/auth/register)

User Login (POST /api/auth/login)

JWT-based authentication

Protected routes using middleware

✅ User Preferences

Create preferences (POST /api/preferences)

Get preferences (GET /api/preferences)

Update preferences (PUT /api/preferences)

Preferences stored in separate collection linked to user

✅ External News API Integration

Integrated with GNews API (or NewsAPI)

Fetch news based on user preferences

Uses async/await for API handling

Proper error handling for external API failures

✅ Caching Mechanism

In-memory caching using JavaScript Map

TTL (Time To Live) implemented (5 minutes)

Cache key based on category + language

Reduces redundant external API calls

Returns "source": "cache" or "source": "api"

🛠 Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT (jsonwebtoken)

bcryptjs