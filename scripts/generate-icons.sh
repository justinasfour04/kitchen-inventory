#!/bin/bash

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is required but not installed. Please install it first."
    echo "On macOS: brew install imagemagick"
    echo "On Ubuntu: sudo apt-get install imagemagick"
    exit 1
fi

# Convert SVG to PNG icons
magick -resize 192x192 static/logo.svg static/icon-192x192.png
magick -resize 512x512 static/logo.svg static/icon-512x512.png

echo "PWA icons generated successfully!" 