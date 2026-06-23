# Supabase Database Schema Setup

## Instructions

Execute the following SQL commands in the Supabase SQL Editor to set up the database schema:

### 1. Enable UUID Extension
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### 2. Create Clubs Table
```sql
CREATE TABLE IF NOT EXISTS clubs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Create Users Table
```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role VARCHAR(50) NOT NULL DEFAULT 'player',
  club_id UUID REFERENCES clubs(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Create Updated_at Trigger Function
```sql
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### 5. Create Triggers
```sql
CREATE TRIGGER handle_clubs_updated_at
  BEFORE UPDATE ON clubs
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();
```

### 6. Create Indexes
```sql
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_club_id ON users(club_id);
CREATE INDEX IF NOT EXISTS idx_clubs_name ON clubs(name);
```

### 7. Insert Sample Data (Optional)
```sql
-- Insert sample club
INSERT INTO clubs (name, description) VALUES 
('Leuven Chiefs', 'Professional basketball club in Leuven');

-- Insert sample user
INSERT INTO users (clerk_id, email, first_name, last_name, role, club_id) VALUES 
('sample_clerk_id', 'coach@example.com', 'John', 'Doe', 'coach', 
 (SELECT id FROM clubs WHERE name = 'Leuven Chiefs'));
```