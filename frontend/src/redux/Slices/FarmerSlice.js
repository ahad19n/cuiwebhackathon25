import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api/api";

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
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

      if (!API_KEY) {
        return rejectWithValue("OpenWeather API key is not configured");
      }

      const weatherPromises = CITIES.map(async (city) => {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=e6b551ac46de4811af491250250411&q=${city.lat},${city.lon}`
        );
        console.log("Fetched weather for", city.name, ":", response.data);
        return {
          name: response.data.location.name,
          temp: response.data.current.temp_c,
          condition: response.data.current.condition.text,
          humidity: response.data.current.humidity,
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

// Async thunk to fetch forum posts
export const fetchForumPosts = createAsyncThunk(
  "farmer/fetchForumPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getPosts();
      return response.data.data.posts;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch forum posts"
      );
    }
  }
);

// Async thunk to create forum post
export const createForumPost = createAsyncThunk(
  "farmer/createForumPost",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.createPost(payload);
      return response.data.data.post;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create post"
      );
    }
  }
);

// Async thunk to delete forum post
export const deleteForumPost = createAsyncThunk(
  "farmer/deleteForumPost",
  async (postId, { rejectWithValue }) => {
    try {
      await api.deletePost(postId);
      return postId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete post"
      );
    }
  }
);

// Async thunk to fetch AI advice based on weather and rates
export const fetchSmartAdvice = createAsyncThunk(
  "farmer/fetchSmartAdvice",
  async ({ weather, rates }, { rejectWithValue }) => {
    try {
      console.log("Redux - Sending to API:", { weather, rates });
      const response = await api.getAdvice({ weather, rates });
      console.log("Redux - API Response:", JSON.stringify(response.data));

      // Handle different response structures
      const advice =
        response.data?.data?.advice ||
        response.data?.advice ||
        "No advice available";
      console.log("Redux - Extracted advice:", JSON.stringify(advice));

      return advice;
    } catch (error) {
      console.error("Redux - API Error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch AI advice"
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
    priceRange: { min: "", max: "" },
    items: [],
  },
  weather: {
    cities: [],
    loading: false,
    error: null,
  },
  smartAdvice: {
    aiAdvice: null,
    loading: false,
    error: null,
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
    loading: false,
    error: null,
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
    setPriceRange(state, action) {
      state.marketPrices.priceRange = action.payload;
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
    setCommunityPosts(state, action) {
      state.community.posts = action.payload;
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
      })
      .addCase(fetchForumPosts.pending, (state) => {
        state.community.loading = true;
        state.community.error = null;
      })
      .addCase(fetchForumPosts.fulfilled, (state, action) => {
        state.community.loading = false;
        state.community.posts = action.payload;
      })
      .addCase(fetchForumPosts.rejected, (state, action) => {
        state.community.loading = false;
        state.community.error = action.payload;
      })
      .addCase(createForumPost.pending, (state) => {
        state.community.loading = true;
        state.community.error = null;
      })
      .addCase(createForumPost.fulfilled, (state, action) => {
        state.community.loading = false;
        state.community.posts.unshift(action.payload);
      })
      .addCase(createForumPost.rejected, (state, action) => {
        state.community.loading = false;
        state.community.error = action.payload;
      })
      .addCase(deleteForumPost.pending, (state) => {
        state.community.loading = true;
        state.community.error = null;
      })
      .addCase(deleteForumPost.fulfilled, (state, action) => {
        state.community.loading = false;
        state.community.posts = state.community.posts.filter(
          (post) => post._id !== action.payload
        );
      })
      .addCase(deleteForumPost.rejected, (state, action) => {
        state.community.loading = false;
        state.community.error = action.payload;
      })
      .addCase(fetchSmartAdvice.pending, (state) => {
        state.smartAdvice.loading = true;
        state.smartAdvice.error = null;
      })
      .addCase(fetchSmartAdvice.fulfilled, (state, action) => {
        state.smartAdvice.loading = false;
        state.smartAdvice.aiAdvice = action.payload;
      })
      .addCase(fetchSmartAdvice.rejected, (state, action) => {
        state.smartAdvice.loading = false;
        state.smartAdvice.error = action.payload;
      });
  },
});

export const {
  setCurrentTab,
  setSearchTerm,
  setPriceRange,
  setSelectedRegion,
  setSelectedCategory,
  setMarketItems,
  toggleCommunityModal,
  addCommunityPost,
  setCommunityPosts,
} = farmerSlice.actions;
export default farmerSlice.reducer;
