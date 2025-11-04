import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Pakistani cities coordinates for weather API
const CITIES = [
  { name: "Karachi", lat: 24.8607, lon: 67.0011 },
  { name: "Lahore", lat: 31.5204, lon: 74.3587 },
  { name: "Islamabad", lat: 33.6844, lon: 73.0479 },
  { name: "Faisalabad", lat: 31.4504, lon: 73.135 },
  { name: "Multan", lat: 30.1575, lon: 71.5249 },
  { name: "Peshawar", lat: 34.0151, lon: 71.5249 },
  { name: "Quetta", lat: 30.1798, lon: 66.975 },
  { name: "Sialkot", lat: 32.4945, lon: 74.5229 },
];

// Async thunk to fetch weather data
export const fetchWeatherData = createAsyncThunk(
  "farmer/fetchWeatherData",
  async (_, { rejectWithValue }) => {
    try {
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "demo_key";
      const weatherPromises = CITIES.map(async (city) => {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}`
        );
        return {
          name: city.name,
          temp: Math.round(response.data.main.temp),
          condition: response.data.weather[0].main,
          humidity: response.data.main.humidity,
        };
      });

      const weatherData = await Promise.all(weatherPromises);
      return weatherData;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch weather data"
      );
    }
  }
);

const initialState = {
  currentTab: "marketPrices",
  marketPrices: {
    searchTerm: "",
    selectedRegion: "All Regions",
    selectedCategory: "All Categories",
    items: [],
  },
  weather: {
    cities: [],
    loading: false,
    error: null,
  },
  smartAdvice: {
    tips: [
      {
        id: 1,
        title: "Optimal Planting Season",
        description:
          "November to February is ideal for winter vegetables like cauliflower, carrots, and radish.",
        icon: "🌱",
        color: "green",
      },
      {
        id: 2,
        title: "Water Management",
        description:
          "Use drip irrigation to save 30-40% water while maintaining crop health and yield.",
        icon: "💧",
        color: "blue",
      },
      {
        id: 3,
        title: "Crop Rotation",
        description:
          "Rotate crops seasonally to maintain soil fertility and reduce pest problems naturally.",
        icon: "🌾",
        color: "yellow",
      },
      {
        id: 4,
        title: "Market Timing",
        description:
          "Sell produce during peak demand periods (festivals, weddings) for better prices.",
        icon: "📊",
        color: "purple",
      },
    ],
  },
  community: {
    posts: [],
    isModalOpen: false,
  },
};

const farmerSlice = createSlice({
  name: "farmer",
  initialState,
  reducers: {
    setCurrentTab(state, action) {
      state.currentTab = action.payload;
    },
    setSearchTerm(state, action) {
      state.marketPrices.searchTerm = action.payload;
    },
    setSelectedRegion(state, action) {
      state.marketPrices.selectedRegion = action.payload;
    },
    setSelectedCategory(state, action) {
      state.marketPrices.selectedCategory = action.payload;
    },
    setMarketItems(state, action) {
      state.marketPrices.items = action.payload;
    },
    toggleCommunityModal(state) {
      state.community.isModalOpen = !state.community.isModalOpen;
    },
    addCommunityPost(state, action) {
      state.community.posts.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.weather.loading = true;
        state.weather.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.weather.loading = false;
        state.weather.cities = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.weather.loading = false;
        state.weather.error = action.payload;
      });
  },
});

export const {
  setCurrentTab,
  setSearchTerm,
  setSelectedRegion,
  setSelectedCategory,
  setMarketItems,
  toggleCommunityModal,
  addCommunityPost,
} = farmerSlice.actions;
export default farmerSlice.reducer;
