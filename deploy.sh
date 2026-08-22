#!/bin/bash
set -e

PROJECT_DIR="$HOME/Desktop/andrew-clean-site"
BUCKET="andrewstokols-website"
DISTRIBUTION_ID="E330PI5TMB7ICY"
URL="https://d1hwffd5njl8u3.cloudfront.net"

echo "📂 Going to project folder..."
cd "$PROJECT_DIR"

echo "🔨 Building site..."
npm run build

echo "☁️ Uploading assets (cached)..."
aws s3 sync dist/ s3://$BUCKET \
  --delete \
  --exclude "index.html" \
  --exclude ".DS_Store" \
  --cache-control "max-age=31536000,public"

echo "📄 Uploading index.html (no cache)..."
aws s3 cp dist/index.html s3://$BUCKET/index.html \
  --cache-control "no-cache"

echo "🚀 Invalidating CloudFront..."
aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*"

echo "🌍 Opening site..."
open "$URL"

echo "✅ Deploy complete!"