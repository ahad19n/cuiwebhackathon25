import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTab: "marketPrices",
  marketPrices: {
    searchTerm: "",
    selectedRegion: "All Regions",
    selectedCategory: "All Categories",
    items: [],
  },
  weather: {
    cities: [
      { name: "Karachi", temp: 32, condition: "Sunny", humidity: 65 },
      { name: "Lahore", temp: 28, condition: "Partly Cloudy", humidity: 55 },
      { name: "Islamabad", temp: 25, condition: "Rainy", humidity: 70 },
      { name: "Faisalabad", temp: 35, condition: "Hot", humidity: 40 },
      { name: "Multan", temp: 36, condition: "Hot", humidity: 38 },
      { name: "Peshawar", temp: 27, condition: "Normal", humidity: 60 },
      { name: "Quetta", temp: 22, condition: "Cool", humidity: 45 },
      { name: "Sialkot", temp: 26, condition: "Rainy", humidity: 75 },
    ],
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
