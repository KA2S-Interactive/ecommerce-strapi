#!/bin/bash
# Script to create Strapi tables using psql
# Usage: ./scripts/create-tables-psql.sh

echo "🔄 Creating Strapi database tables..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL environment variable is not set"
    echo "Please set it or provide database connection details"
    exit 1
fi

# Run the SQL script
psql "$DATABASE_URL" -f scripts/create-tables.sql

if [ $? -eq 0 ]; then
    echo "✅ Tables created successfully!"
    echo "✅ You can now run 'npm start' or 'npm run develop'"
else
    echo "❌ Error creating tables"
    exit 1
fi


