# Blog Aggregator

A command-line application for aggregating and managing RSS feeds from blogs and news sources. Users can register, add feeds, follow feeds from other users, and browse posts from their followed feeds.

## Features

- **User Management**: Register users and switch between different user profiles
- **RSS Feed Management**: Add and track RSS/Atom feeds
- **Feed Following**: Follow feeds added by other users
- **Automated Aggregation**: Periodically fetch and store posts from RSS feeds
- **Browse Posts**: View posts from your followed feeds with pagination
- **Database Persistence**: All data stored in PostgreSQL with Drizzle ORM

## Technologies Used

- **TypeScript**: Type-safe development
- **Node.js**: Runtime environment
- **PostgreSQL**: Database for storing users, feeds, posts, and relationships
- **Drizzle ORM**: Type-safe database access and migrations
- **fast-xml-parser**: RSS/Atom feed parsing
- **tsx**: TypeScript execution

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Blog_Aggregator
```

2. Install dependencies:
```bash
npm install
```

3. Set up your PostgreSQL database and configure the connection in `~/.gatorconfig.json`:
```json
{
  "dbUrl": "database_url",
  "currentUserName": "user_name"
}
```

4. Run database migrations:
```bash
npm run generate
npm run migrate
```

## Database Schema

The application uses four main tables:

### Users
- `id`: UUID primary key
- `name`: Unique username
- `created_at`, `updated_at`: Timestamps

### Feeds
- `id`: UUID primary key
- `name`: Feed name (optional)
- `url`: Unique feed URL
- `user_id`: Reference to the user who added the feed
- `last_fetched_at`: Timestamp of last fetch
- `created_at`, `updated_at`: Timestamps

### Posts
- `id`: UUID primary key
- `title`: Post title
- `url`: Unique post URL
- `description`: Post content/description
- `published_at`: Original publication date
- `feed_id`: Reference to the source feed
- `created_at`, `updated_at`: Timestamps

### Feed Follows
- `id`: UUID primary key
- `feed_id`: Reference to followed feed
- `user_id`: Reference to the user following
- `created_at`, `updated_at`: Timestamps
- Unique constraint on (feed_id, user_id)

## Commands

All commands are executed using:
```bash
npm run start <command> [arguments]
```

### User Management

#### Register
Create a new user and set them as the current user:
```bash
npm run start register <username>
```

#### Login
Switch to an existing user:
```bash
npm run start login <username>
```

#### Reset
Clear the current user from the configuration:
```bash
npm run start reset
```

#### Users
List all registered users:
```bash
npm run start users
```

### Feed Management

#### Add Feed
Add a new RSS feed (requires login):
```bash
npm run start addfeed <feed_url> [feed_name]
```
Example:
```bash
npm run start addfeed https://news.ycombinator.com/rss "Hacker News"
```

#### List Feeds
View all available feeds in the system:
```bash
npm run start feeds
```

#### Follow
Follow a feed to receive its posts (requires login):
```bash
npm run start follow <feed_url>
```

#### Unfollow
Unfollow a feed (requires login):
```bash
npm run start unfollow <feed_url>
```

#### Following
List all feeds you're currently following (requires login):
```bash
npm run start following
```

### Content Aggregation

#### Aggregate
Start the RSS feed aggregator that periodically fetches new posts:
```bash
npm run start agg <interval>
```

Interval format: `<number><unit>` where unit can be:
- `ms`: milliseconds
- `s`: seconds
- `m`: minutes
- `h`: hours

Example:
```bash
npm run start agg 1m  # Fetch feeds every 1 minute
npm run start agg 30s # Fetch feeds every 30 seconds
npm run start agg 2h  # Fetch feeds every 2 hours
```

The aggregator will:
1. Fetch the next feed that needs updating
2. Parse the RSS/Atom feed
3. Store new posts in the database
4. Update the feed's last_fetched_at timestamp
5. Repeat at the specified interval

Press `Ctrl+C` to stop the aggregator.

#### Browse
View posts from your followed feeds (requires login):
```bash
npm run start browse <limit>
```

Example:
```bash
npm run start browse 10  # Show 10 most recent posts
npm run start browse 4   # Show 4 most recent posts
```

Output includes:
- Post ID
- Title
- URL
- Description
- Published date
- Source feed ID
- Created/updated timestamps

## Project Structure

```
Blog_Aggregator/
├── src/
│   ├── command/              # Command handlers
│   │   ├── addfeedCommand.ts    # Add new RSS feeds
│   │   ├── aggCommand.ts        # Feed aggregation
│   │   ├── browseCommand.ts     # Browse posts
│   │   ├── feedsCommand.ts      # List feeds
│   │   ├── followCommand.ts     # Follow feeds
│   │   ├── followingCommand.ts  # List followed feeds
│   │   ├── loginCommand.ts      # User login
│   │   ├── registerCommand.ts   # User registration
│   │   ├── resetCommand.ts      # Reset current user
│   │   ├── unfollowCommand.ts   # Unfollow feeds
│   │   └── usersCommand.ts      # List users
│   ├── lib/
│   │   └── db/
│   │       ├── queries/          # Database query functions
│   │       │   ├── feedFollow.ts
│   │       │   ├── feeds.ts
│   │       │   ├── posts.ts
│   │       │   └── users.ts
│   │       ├── migrations/       # Drizzle migrations
│   │       ├── index.ts          # Database connection
│   │       └── schema.ts         # Database schema
│   ├── config.ts             # Configuration management
│   ├── index.ts              # Application entry point
│   ├── middleware.ts         # Authentication middleware
│   ├── rssFeed.ts            # RSS feed fetching
│   └── scrapeFeeds.ts        # Feed scraping logic
├── drizzle.config.ts         # Drizzle configuration
├── package.json
├── tsconfig.json
└── README.md
```

## How It Works

### Authentication
The application uses a local configuration file (`~/.gatorconfig.json`) to track the currently logged-in user. Certain commands like `addfeed`, `follow`, `unfollow`, `following`, and `browse` require authentication.

### Feed Aggregation Process
1. The `agg` command starts a continuous loop
2. Each iteration finds the feed that was fetched longest ago (or never fetched)
3. Fetches and parses the RSS/Atom feed XML
4. Extracts posts (title, URL, description, published date)
5. Stores new posts in the database (duplicates are skipped via unique URL constraint)
6. Updates the feed's `last_fetched_at` timestamp
7. Waits for the specified interval before repeating

### Feed Following System
- Users can add feeds to the system (becomes available to all users)
- Users follow feeds to indicate interest
- The `browse` command only shows posts from feeds the user follows
- Multiple users can follow the same feed


## Example Workflow

```bash
# 1. Register a new user
npm run start register alice

# 2. Add some RSS feeds
npm run start addfeed https://news.ycombinator.com/rss "Hacker News"
npm run start addfeed https://blog.example.com/feed.xml "Example Blog"

# 3. Follow the feeds
npm run start follow https://news.ycombinator.com/rss
npm run start follow https://blog.example.com/feed.xml

# 4. Start the aggregator (in a separate terminal)
npm run start agg 5m

# 5. Browse posts from your followed feeds
npm run start browse 10

# 6. View all feeds you're following
npm run start following

# 7. Unfollow a feed if needed
npm run start unfollow https://blog.example.com/feed.xml
```

## Configuration

The application stores configuration in `~/.gatorconfig.json`:

```json
{
  "dbUrl": "database_url",
  "currentUserName": "alice"
}
```

- `dbUrl`: PostgreSQL connection string
- `currentUserName`: Currently logged-in user