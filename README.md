# Education App - Universal Video Learning Platform

An interactive learning platform built with Next.js that supports multiple video formats and provides rich learning features.

## 🎥 Universal Video Support

This app now supports **any video URL** format:

### Supported Video Types:
- **Direct Video Files**: `.mp4`, `.webm`, `.ogg`, `.mov`, `.avi`, etc.
- **YouTube Videos**: Any YouTube URL format
- **Vimeo Videos**: Any Vimeo URL format

### How to Use Different Video URLs:

1. **Direct Video Files**:
   ```
   https://example.com/video.mp4
   http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
   ```

2. **YouTube Videos**:
   ```
   https://www.youtube.com/watch?v=VIDEO_ID
   https://youtu.be/VIDEO_ID
   https://www.youtube.com/embed/VIDEO_ID
   ```

3. **Vimeo Videos**:
   ```
   https://vimeo.com/VIDEO_ID
   https://player.vimeo.com/video/VIDEO_ID
   ```

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** to `http://localhost:9002`

## 📝 Changing Video Content

### Method 1: Edit the data file
1. Open `src/lib/data.ts`
2. Replace the `videoUrl` value in `courseData` with your desired video URL
3. The app automatically detects the video type and displays it appropriately

### Method 2: Use the in-app editor
1. Click the edit button in the "Video URL Manager" panel
2. Paste your video URL or try the quick examples
3. Click "Save" to apply changes

## ✨ Features

- **Adaptive Video Player**: Automatically detects video type and uses appropriate player
- **Interactive Learning Tools**:
  - 📝 Timestamped notes
  - 🧠 Interactive quizzes  
  - 🔄 Flashcards
  - 📊 Progress tracking
- **Custom Video Controls**: For direct video files
- **Embedded Players**: For YouTube and Vimeo
- **Key Moments Navigation**: Quick jump to important sections
- **Real-time Video URL Management**: Change videos without restarting

## 🛠 Technical Details

The app uses smart video URL parsing to:
- Detect video platform (YouTube, Vimeo, Direct)
- Extract video IDs for embedded players
- Provide appropriate playback method
- Handle different URL formats automatically

### Key Files:
- `src/lib/video-utils.ts` - Video URL parsing and utilities
- `src/lib/data.ts` - Course content and video configuration
- `src/components/learning-page.tsx` - Main learning interface
- `src/components/video-url-editor.tsx` - Dynamic video URL management

## 🎯 Examples

See `src/lib/video-examples.ts` for more URL format examples and usage patterns.

---

**Built with**: Next.js 15, React 18, TypeScript, Tailwind CSS, Shadcn/ui
