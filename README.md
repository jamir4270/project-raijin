# Nimbus - Weather App

A beautiful, responsive weather application built with React and Vite. Get real-time weather data and stunning city photos from around the world.

## Project Overview

**Nimbus** is a modern weather application developed as a capstone project for the **Platform Based Development** subject. This project demonstrates full-stack web development practices including component-based architecture, API integration, state management, responsive design, and performance optimization.

## What is Nimbus?

Nimbus is a weather application that provides users with real-time weather information and stunning photography for cities around the globe. The app combines clean UI design with powerful weather APIs to deliver an intuitive user experience on any device.

## Features

- **🌍 Real-Time Weather Data**: Current weather conditions, temperature, and detailed metrics
- **📅 5-Day Forecast**: Extended weather predictions for informed planning
- **🏙️ City Photos**: Beautiful, real photographs of cities powered by Unsplash
- **🔍 Smart Search**: City suggestions while typing with input validation
- **📱 Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **🌙 Dark Mode**: Easy on the eyes with full dark mode support
- **⚡ Performance**: LocalStorage caching, image optimization, and script defer
- **🎯 Error Handling**: Comprehensive error messages for network issues and invalid inputs

## Tech Stack

### Frontend Framework

- **React 19.2.4** - Modern UI component library
- **Vite** - Lightning-fast build tool and dev server
- **CSS3** - Responsive design with modern layout techniques

### Development & Build

- **Node.js** - JavaScript runtime
- **ESLint** - Code quality and linting

## Third Party Services

### Weather Data

- **OpenWeatherMap API** - Real-time weather data and forecasts
  - Current weather endpoint
  - 5-day forecast data
  - Geocoding for city suggestions

### City Photography

- **Unsplash API** - Beautiful, high-quality city photographs
  - Portrait-oriented images
  - Photographer attribution
  - Optimized image delivery

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd project-raijin
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
# Copy the example file
cp .env.example .env

# Add your API keys
VITE_OPEN_WEATHER_MAP_API_KEY=your_key_here
VITE_UNSPLASH_ACCESS_KEY=your_key_here
VITE_UNSPLASH_BASE_URL=https://api.unsplash.com
```

### Running the App

**Development mode:**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

**Build for production:**

```bash
npm run build
```

**Preview production build:**

```bash
npm run preview
```

**Lint code:**

```bash
npm run lint
```

## Project Structure

```
project-raijin/
├── src/
│   ├── components/          # React components
│   │   ├── App.jsx
│   │   ├── Sidebar.jsx
│   │   ├── MainPanel.jsx
│   │   ├── SearchInput.jsx
│   │   ├── SearchSuggestions.jsx
│   │   ├── TemperatureDisplay.jsx
│   │   ├── WeatherDisplay.jsx
│   │   ├── ForecastCard.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ErrorAlert.jsx
│   ├── services/            # API and utility services
│   │   ├── weather-api.js
│   │   ├── unsplash-api.js
│   │   ├── city-validator.js
│   │   └── cache-service.js
│   ├── App.css              # Application styles
│   ├── index.css            # Global styles
│   └── main.jsx             # App entry point
├── public/                  # Static assets
│   ├── cloud.png            # App logo
│   ├── favicon.svg
│   └── icons.svg
├── index.html               # HTML template
├── package.json             # Project dependencies
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint configuration
└── README.md                # This file
```

## Key Features Implementation

### 1. Real-Time Weather Display

- Displays current temperature, "feels like" value, and weather conditions
- Shows location with country code

### 2. Extended Forecast

- 5-day weather forecast with daily conditions
- Interactive forecast card selection
- Animated weather icons

### 3. Smart City Search

- Auto-complete suggestions using OpenWeatherMap Geocoding API
- Input validation to prevent country-only searches
- Debounced API calls for performance

### 4. Responsive Layout

- Mobile-first design approach
- Breakpoints: 480px (mobile), 768px (tablet), 1024px (large tablet), 1025px+ (desktop)
- Sidebar and main panel adapt to screen size

### 5. Performance Optimization

- LocalStorage caching with TTL (30 min weather, 7 days photos)
- Image optimization via Unsplash API (400px width, 75% quality)
- Script defer for faster page load
- Automatic cache expiration

### 6. Dark Mode

- Full dark mode support across all components
- Persistent theme preference
- Smooth transitions

## API Integration

### OpenWeatherMap

- **Endpoint**: `https://api.openweathermap.org/data/2.5`
- **Services Used**:
  - `/weather` - Current weather data
  - `/forecast` - 5-day forecast
  - `/geo/1.0/direct` - City name geocoding

### Unsplash

- **Endpoint**: `https://api.unsplash.com`
- **Service**: `/search/photos` - City photography
- **Optimization**: Automatic image sizing and quality adjustment

## Error Handling

The app gracefully handles various error scenarios:

- Network connectivity issues
- Invalid city input with helpful messages
- API rate limits and key errors
- Missing environment variables
- Missing photo data (shows default gradient)

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Hourly weather forecasts
- Weather alerts and warnings
- User location detection
- Favorite cities list
- Weather history and trends
- PWA (Progressive Web App) support

## Development Team

Created as a capstone project for Platform Based Development subject.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org)
- Photos provided by [Unsplash](https://unsplash.com)
- Built with [React](https://react.dev) and [Vite](https://vitejs.dev)
