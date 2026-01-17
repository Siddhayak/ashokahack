import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { LocationHeader, CategoryFilter, RestaurantCard, SearchBar } from '../components';
import BottomTabBar from '../components/BottomTabBar';
import {
  categories,
  userLocation,
  restaurants,
  getRelevantRestaurants,
  getPopularRestaurants,
  getNewlyAddedRestaurants,
  getRestaurantsByCategory,
} from '../data/mockData';

const SectionHeader = ({ title, onSeeAll }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {onSeeAll && (
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={styles.seeAllText}>See all</Text>
      </TouchableOpacity>
    )}
  </View>
);

const RestaurantSection = ({ title, restaurants: restaurantList, onRestaurantPress, onSeeAll }) => (
  <View style={styles.section}>
    <SectionHeader title={title} onSeeAll={onSeeAll} />
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.horizontalScrollContent}
    >
      {restaurantList.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onPress={onRestaurantPress}
        />
      ))}
    </ScrollView>
  </View>
);

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('explore');

  const filteredRestaurants = useMemo(() => {
    return getRestaurantsByCategory(restaurants, selectedCategory);
  }, [selectedCategory]);

  const relevantRestaurants = useMemo(() => {
    return getRelevantRestaurants(filteredRestaurants).slice(0, 6);
  }, [filteredRestaurants]);

  const popularRestaurants = useMemo(() => {
    return getPopularRestaurants(filteredRestaurants).slice(0, 6);
  }, [filteredRestaurants]);

  const newlyAddedRestaurants = useMemo(() => {
    return getNewlyAddedRestaurants(filteredRestaurants).slice(0, 6);
  }, [filteredRestaurants]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleRestaurantPress = (restaurant) => {
    navigation.navigate('RestaurantDetail', { restaurant });
  };

  const handleLocationPress = () => {
    console.log('Location pressed');
  };

  const handleFilterPress = () => {
    console.log('Filter pressed');
  };

  const handleSeeAll = (section) => {
    console.log(`See all ${section}`);
  };

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    console.log(`Tab pressed: ${tabId}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Location Header */}
        <LocationHeader
          location={userLocation}
          onPress={handleLocationPress}
        />

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={handleFilterPress}
        />

        {/* Most Relevant Section */}
        {relevantRestaurants.length > 0 && (
          <RestaurantSection
            title="Most Relevant"
            restaurants={relevantRestaurants}
            onRestaurantPress={handleRestaurantPress}
            onSeeAll={() => handleSeeAll('relevant')}
          />
        )}

        {/* Most Popular Section */}
        {popularRestaurants.length > 0 && (
          <RestaurantSection
            title="Most Popular Near You"
            restaurants={popularRestaurants}
            onRestaurantPress={handleRestaurantPress}
            onSeeAll={() => handleSeeAll('popular')}
          />
        )}

        {/* Newly Added Section */}
        {newlyAddedRestaurants.length > 0 && (
          <RestaurantSection
            title="New Added Rescue Bags"
            restaurants={newlyAddedRestaurants}
            onRestaurantPress={handleRestaurantPress}
            onSeeAll={() => handleSeeAll('new')}
          />
        )}

        {/* Bottom padding for tab bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: SPACING.xxxl + SPACING.md,
  },
  section: {
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  seeAllText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primaryAccent,
    fontWeight: '500',
  },
  horizontalScrollContent: {
    paddingHorizontal: SPACING.lg,
  },
  bottomPadding: {
    height: 100, // Space for bottom tab bar
  },
});

export default HomeScreen;
