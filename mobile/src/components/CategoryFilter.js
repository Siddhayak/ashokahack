import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

// Placeholder images - replace with actual images later
const categoryImages = {
  breakfast: null, // Will be: require('../../assets/images/categories/breakfast.png')
  dinner: null,    // Will be: require('../../assets/images/categories/dinner.png')
  grocery: null,   // Will be: require('../../assets/images/categories/grocery.png')
  dessert: null,   // Will be: require('../../assets/images/categories/dessert.png')
};

// Placeholder illustrations using emoji for now
const categoryEmojis = {
  breakfast: '🥐',
  dinner: '🥡',
  grocery: '🥬',
  dessert: '🍰',
  desserts: '🍰', // alias for backwards compatibility
};

const CategoryCard = ({ category, isSelected, onPress }) => {
  const image = categoryImages[category.id];
  const emoji = categoryEmojis[category.id] || '🍽️';
  
  return (
    <TouchableOpacity
      style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
      onPress={() => onPress(category.id)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={image} style={styles.categoryImage} resizeMode="contain" />
        ) : (
          <Text style={styles.placeholderEmoji}>{emoji}</Text>
        )}
      </View>
      <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            isSelected={selectedCategory === category.id}
            onPress={onSelectCategory}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.md,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  categoryCard: {
    width: 85,
    height: 110,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  categoryCardSelected: {
    borderColor: COLORS.primaryAccent,
    borderWidth: 2,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryImage: {
    width: 60,
    height: 60,
  },
  placeholderEmoji: {
    fontSize: 40,
  },
  categoryText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primaryAccent,
    fontWeight: '600',
    marginTop: SPACING.xs,
  },
  categoryTextSelected: {
    color: COLORS.primaryAccent,
    fontWeight: '700',
  },
});

export default CategoryFilter;
