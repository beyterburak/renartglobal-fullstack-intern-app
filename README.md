# Rings Catalog - Full Stack Application

A modern product listing application featuring real-time gold pricing, dynamic price calculations, and an elegant carousel interface.

## 🌟 Live Demo

- **Frontend:** https://renartglobal-fullstack-intern-app.vercel.app
- **Backend API:** https://renartglobal-fullstack-intern-backend.onrender.com/api/products

## 📋 Assignment Overview

This project fulfills all requirements of the full-stack development assignment:

### ✅ Backend Requirements
- ✅ RESTful API serving product data from JSON file
- ✅ Dynamic price calculation: `Price = (popularityScore + 1) × weight × goldPrice`
- ✅ Real-time gold price integration (GoldAPI.io)
- ✅ Product attributes: name, popularityScore, weight, images
- ✅ **Bonus:** Advanced filtering system (price range, popularity score)

### ✅ Frontend Requirements
- ✅ Product display matching provided design
- ✅ Data fetching from backend API
- ✅ Product name, price, and information display
- ✅ Color picker with dynamic image switching
- ✅ Popularity score conversion (0-1 → x.x/5 format)
- ✅ Responsive carousel with arrows and swipe support

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js
- **Axios** for external API calls
- **Node-Cache** for performance optimization
- **Helmet** & **CORS** for security
- **GoldAPI.io** for real-time gold prices

### Frontend
- **React 19** with Vite
- **Tailwind CSS** for styling
- **Swiper.js** for carousel functionality
- **React Icons** for UI icons
- **Axios** for API communication

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- GoldAPI.io API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/beyterburak/renartglobal-fullstack-intern-app.git
   cd renartglobal-fullstack-intern-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your GoldAPI key
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Update API URL if needed
   npm run dev
   ```

## 🔧 Environment Configuration

### Backend (.env)
```env
PORT=3000
NODE_ENV=development
GOLD_API_KEY=your_goldapi_key_here
GOLD_API_URL=https://www.goldapi.io/api/XAU/USD
CACHE_TTL=3600
ALLOWED_ORIGINS=http://localhost:5173, https://renartglobal-fullstack-intern-app.vercel.app
```

### Frontend (.env)
```env
# Development
VITE_API_URL=http://localhost:3000/api

# Production (Vercel)
VITE_API_URL=https://renartglobal-fullstack-intern-backend.onrender.com/api
```

## 📡 API Documentation

### Endpoints

#### Get All Products
```http
GET /api/products
```

**Query Parameters (Optional - Bonus Feature):**
- `minPrice` - Minimum price filter (USD)
- `maxPrice` - Maximum price filter (USD)
- `minPopularity` - Minimum popularity score (0-1)
- `maxPopularity` - Maximum popularity score (0-1)

**Filter Usage Examples:**
```http
# Price filtering
GET /api/products?minPrice=100
GET /api/products?maxPrice=500
GET /api/products?minPrice=100&maxPrice=500

# Popularity filtering
GET /api/products?minPopularity=0.5
GET /api/products?maxPopularity=0.8
GET /api/products?minPopularity=0.3&maxPopularity=0.9

# Combined filtering
GET /api/products?minPrice=200&minPopularity=0.6
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Engagement Ring 1",
      "popularityScore": 0.85,
      "popularityDisplay": "4.3",
      "weight": 2.1,
      "price": 487.14,
      "priceFormatted": "$487.14 USD",
      "images": {
        "yellow": "https://...",
        "rose": "https://...",
        "white": "https://..."
      }
    }
  ],
  "meta": {
    "total": 8,
    "filtered": 3,
    "goldPrice": 124.97,
    "goldPriceUnit": "USD/gram",
    "lastUpdated": "2025-10-06T...",
    "cached": true
  }
}
```

#### Get Single Product
```http
GET /api/products/:id
```

#### Get Gold Price Info
```http
GET /api/gold-price
```

## 🎨 Features

### Dynamic Price Calculation
- Real-time gold price integration
- Formula: `(popularityScore + 1) × weight × goldPrice`
- Automatic caching for performance
- Fallback pricing for API failures

### Advanced Filtering (Bonus)
- Price range filtering
- Popularity score filtering
- Combinable filter parameters
- Real-time filtering support

### Interactive UI
- **Color Picker:** Switch between Yellow, White, and Rose Gold
- **Carousel Navigation:** Arrows + swipe/drag support
- **Responsive Design:** Mobile-first approach
- **Popularity Display:** Converted to x.x/5 star rating format

### Performance Optimizations
- **Backend Caching:** Gold price caching with TTL
- **Image Lazy Loading:** Improved page load times
- **Smooth Animations:** CSS transitions for better UX
- **Error Handling:** Comprehensive error management

## 📱 Responsive Design

- **Desktop:** 4 products per row with full carousel controls
- **Tablet:** 3 products per row with adapted spacing
- **Mobile:** 1-2 products per row with touch-friendly controls

## 🏗️ Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/     # API route handlers
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API routes
│   │   ├── data/            # Product JSON data
│   │   └── server.js        # Main server file
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   ├── assets/          # Fonts and static files
│   │   └── App.jsx          # Main app component
│   └── package.json
└── README.md
```

## 🚢 Deployment

### Backend (Render)
- Deployed on Render with environment variables
- Automatic deployments from main branch
- Health check endpoint: `/health`

### Frontend (Vercel)
- Deployed on Vercel with optimized build
- Environment variables configured
- Automatic deployments from main branch

## 🎯 Assignment Compliance

This project fully complies with the assignment requirements:

- ✅ **Backend Mock API** with JSON data source
- ✅ **Dynamic Price Calculation** using real-time gold prices
- ✅ **Product Attributes** (name, popularityScore, weight, images)
- ✅ **Frontend Design** matching provided specifications
- ✅ **Color Picker** functionality
- ✅ **Popularity Score** conversion and display
- ✅ **Carousel** with arrows and swipe support
- ✅ **Responsive Design** for all devices
- ✅ **Git Version Control** with comprehensive history
- ✅ **Deployment** on hosting platforms
- ✅ **Bonus Filtering** implementation

## 🔍 Testing

### API Testing
```bash
# Test all products
curl https://renartglobal-fullstack-intern-backend.onrender.com/api/products

# Test with filters
curl "https://renartglobal-fullstack-intern-backend.onrender.com/api/products?minPrice=200&maxPrice=600"

# Test single product
curl https://renartglobal-fullstack-intern-backend.onrender.com/api/products/1

# Test gold price
curl https://renartglobal-fullstack-intern-backend.onrender.com/api/gold-price
```

## 👨‍💻 Development

### Available Scripts

**Backend:**
```bash
npm run dev    # Development server with nodemon
npm start      # Production server
```

**Frontend:**
```bash
npm run dev    # Development server
npm run build  # Production build
npm run preview # Preview production build
```

## 📄 License

This project is developed as part of a full-stack development assignment.

---

**Developed by:** Burak Beyter
**Repository:** [GitHub](https://github.com/beyterburak/renartglobal-fullstack-intern-app)  
**Live Demo:** [Vercel](https://renartglobal-fullstack-intern-app.vercel.app)