#!/bin/bash
# Script to create a new PostgreSQL database for this Strapi instance
# This ensures it doesn't conflict with other Strapi instances on the same VM

echo "🔄 Creating database for Maisam Makeup Ecommerce Strapi..."

# Load environment variables from .env file if it exists
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Set defaults if not in .env
DB_NAME=${DATABASE_NAME:-maisam_makeup_ecommerce_strapi}
DB_USER=${DATABASE_USERNAME:-strapi}
DB_PASSWORD=${DATABASE_PASSWORD:-strapi}
DB_HOST=${DATABASE_HOST:-localhost}
DB_PORT=${DATABASE_PORT:-5432}

echo "📋 Database Configuration:"
echo "   Name: $DB_NAME"
echo "   User: $DB_USER"
echo "   Host: $DB_HOST"
echo "   Port: $DB_PORT"

# Connect to PostgreSQL and create database
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres <<EOF
-- Check if database exists
SELECT 1 FROM pg_database WHERE datname = '$DB_NAME';

-- Create database if it doesn't exist
CREATE DATABASE $DB_NAME;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
EOF

if [ $? -eq 0 ]; then
    echo "✅ Database '$DB_NAME' created successfully!"
    echo "✅ You can now run 'npm run develop' or 'npm start'"
else
    echo "❌ Error creating database"
    echo "💡 Make sure PostgreSQL is running and credentials are correct"
    exit 1
fi
