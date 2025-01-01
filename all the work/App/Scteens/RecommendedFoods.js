import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const recommendedFoods = {
  Red: [
    {
      category: 'Fruits',
      items: ['Watermelon', 'Cucumber', 'Cherries'],
    },
    {
      category: 'Vegetables',
      items: ['Leafy greens (spinach, kale)', 'Celery', 'Zucchini'],
    },
    {
      category: 'Proteins',
      items: ['Fatty fish (salmon, mackerel) high in omega-3s'],
    },
    {
      category: 'Herbs/Spices',
      items: ['Mint', 'Chamomile', 'Turmeric'],
    },
    {
      category: 'Snacks',
      items: ['Unsalted almonds or walnuts'],
    },
  ],
  White: [
    {
      category: 'Fruits',
      items: ['Bananas', 'Apples', 'Oranges'],
    },
    {
      category: 'Vegetables',
      items: ['Sweet potatoes', 'Carrots', 'Squash'],
    },
    {
      category: 'Proteins',
      items: ['Eggs', 'Turkey (rich in tryptophan for calming effects)', 'Lentils'],
    },
    {
      category: 'Herbs/Spices',
      items: ['Cinnamon', 'Basil', 'Rosemary'],
    },
    {
      category: 'Snacks',
      items: ['Whole-grain crackers with almond butter or hummus'],
    },
  ],
  Violet: [
    {
      category: 'Fruits',
      items: ['Berries (blueberries, raspberries, strawberries)', 'Citrus fruits'],
    },
    {
      category: 'Vegetables',
      items: ['Broccoli', 'Brussels sprouts', 'Asparagus'],
    },
    {
      category: 'Proteins',
      items: ['Lean chicken', 'Beans', 'Quinoa'],
    },
    {
      category: 'Herbs/Spices',
      items: ['Ginger', 'Black pepper', 'Garlic'],
    },
    {
      category: 'Snacks',
      items: ['Dark chocolate (70% cacao or more)', 'Trail mix with dried fruits and nuts'],
    },
  ],
  Yellow: [
    {
      category: 'Fruits',
      items: ['Avocado', 'Peaches', 'Mango'],
    },
    {
      category: 'Vegetables',
      items: ['Mixed greens', 'Roasted root vegetables', 'Mushrooms'],
    },
    {
      category: 'Proteins',
      items: ['Grilled chicken', 'Tofu', 'Salmon', 'Chickpeas'],
    },
    {
      category: 'Herbs/Spices',
      items: ['Parsley', 'Cilantro', 'Dill'],
    },
    {
      category: 'Snacks',
      items: ['Greek yogurt with honey and granola', 'A smoothie bowl'],
    },
  ],
};

export default function RecommendedFoods({ route }) {
  const { state = [] } = route.params || {}; // Default to an empty array if no state is passed

  // Create a combined food object without using forEach
  const combinedFoods = state.reduce((acc, color) => {
    const foods = recommendedFoods[color] || [];
    return foods.reduce((innerAcc, foodGroup) => {
      const existingCategory = innerAcc[foodGroup.category] || new Set();
      const updatedCategory = new Set([...existingCategory, ...foodGroup.items]);
      return { ...innerAcc, [foodGroup.category]: updatedCategory };
    }, acc);
  }, {});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Foods</Text>
      <ScrollView style={styles.foodContainer}>
        {Object.entries(combinedFoods).map(([category, items], index) => (
          <View key={index} style={styles.foodGroup}>
            <Text style={styles.category}>{category}:</Text>
            {[...items].map((item, itemIndex) => (
              <Text key={itemIndex} style={styles.foodText}>- {item}</Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  foodContainer: {
    flex: 1,
    marginTop: 10,
  },
  foodGroup: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  category: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  foodText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
});
