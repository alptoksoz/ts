import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Card, Button, ProgressBar } from '../components';
import { mockUser, userProgress, languages } from '../data/mockData';

export default function HomeScreen() {
  const dailyGoalProgress = (userProgress.todayXP / userProgress.dailyGoal) * 100;
  const currentLanguage = languages.find((l) => l.id === userProgress.languageId);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Merhaba, {mockUser.name}! 👋</Text>
            <View style={styles.languageRow}>
              <Text style={styles.currentLanguage}>
                {currentLanguage?.flag} {currentLanguage?.name} öğreniyorsun
              </Text>
            </View>
          </View>
        </View>

        {/* Streak Card */}
        <Card style={styles.streakCard}>
          <View style={styles.streakContent}>
            <View style={styles.streakItem}>
              <Text style={styles.streakEmoji}>🔥</Text>
              <View>
                <Text style={styles.streakNumber}>{mockUser.currentStreak}</Text>
                <Text style={styles.streakLabel}>Günlük Seri</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.streakItem}>
              <Text style={styles.streakEmoji}>⭐</Text>
              <View>
                <Text style={styles.streakNumber}>{mockUser.totalXP}</Text>
                <Text style={styles.streakLabel}>Toplam XP</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.streakItem}>
              <Text style={styles.streakEmoji}>🏆</Text>
              <View>
                <Text style={styles.streakNumber}>{mockUser.level}</Text>
                <Text style={styles.streakLabel}>Seviye</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Daily Goal */}
        <Card style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Text style={styles.goalTitle}>Günlük Hedef</Text>
            <Text style={styles.goalXP}>
              {userProgress.todayXP}/{userProgress.dailyGoal} XP
            </Text>
          </View>
          <ProgressBar progress={dailyGoalProgress} height={16} showLabel />
          <Text style={styles.goalMessage}>
            {dailyGoalProgress >= 100
              ? '🎉 Tebrikler! Günlük hedefini tamamladın!'
              : `Hedefini tamamlamak için ${userProgress.dailyGoal - userProgress.todayXP} XP daha kazan!`}
          </Text>
        </Card>

        {/* Quick Start */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hızlı Başlangıç</Text>
          <TouchableOpacity style={styles.quickStartCard}>
            <View style={styles.quickStartLeft}>
              <Text style={styles.quickStartIcon}>🎯</Text>
              <View>
                <Text style={styles.quickStartTitle}>Günlük Pratik</Text>
                <Text style={styles.quickStartSubtitle}>5 dakika • +15 XP</Text>
              </View>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickStartCard}>
            <View style={styles.quickStartLeft}>
              <Text style={styles.quickStartIcon}>💪</Text>
              <View>
                <Text style={styles.quickStartTitle}>Pratik Testi</Text>
                <Text style={styles.quickStartSubtitle}>Zayıf alanlarını güçlendir</Text>
              </View>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Languages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diğer Diller</Text>
          <View style={styles.languageGrid}>
            {languages
              .filter((l) => l.id !== userProgress.languageId)
              .map((lang) => (
                <TouchableOpacity key={lang.id} style={styles.languageCard}>
                  <Text style={styles.languageFlag}>{lang.flag}</Text>
                  <Text style={styles.languageName}>{lang.name}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F1F1F',
    marginBottom: 4,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentLanguage: {
    fontSize: 16,
    color: '#777777',
  },
  streakCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  streakContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  streakItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  streakEmoji: {
    fontSize: 32,
  },
  streakNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F1F1F',
  },
  streakLabel: {
    fontSize: 12,
    color: '#777777',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E5E5',
  },
  goalCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F1F1F',
  },
  goalXP: {
    fontSize: 16,
    fontWeight: '600',
    color: '#58CC02',
  },
  goalMessage: {
    marginTop: 12,
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F1F1F',
    marginBottom: 12,
  },
  quickStartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickStartLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quickStartIcon: {
    fontSize: 32,
  },
  quickStartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F',
  },
  quickStartSubtitle: {
    fontSize: 14,
    color: '#777777',
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    color: '#CCCCCC',
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  languageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  languageFlag: {
    fontSize: 48,
    marginBottom: 8,
  },
  languageName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F1F1F',
  },
});
