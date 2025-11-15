import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Card, ProgressBar } from '../components';
import { mockUser, userProgress, subjects } from '../data/mockData';

export default function HomeScreen() {
  const dailyGoalProgress = (userProgress.todayQuestionsSolved / userProgress.dailyQuestionGoal) * 100;
  const successRate = mockUser.totalQuestions > 0
    ? Math.round((mockUser.correctAnswers / mockUser.totalQuestions) * 100)
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Merhaba, {mockUser.name}! 👨‍⚕️</Text>
            <Text style={styles.subtitle}>TUS'a hazırlık devam ediyor</Text>
          </View>
        </View>

        {/* Stats Card */}
        <Card style={styles.statsCard}>
          <View style={styles.statsContent}>
            <View style={styles.statItem}>
              <Text style={styles.statEmoji}>🔥</Text>
              <View>
                <Text style={styles.statNumber}>{mockUser.currentStreak}</Text>
                <Text style={styles.statLabel}>Günlük Seri</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statEmoji}>✅</Text>
              <View>
                <Text style={styles.statNumber}>{mockUser.correctAnswers}</Text>
                <Text style={styles.statLabel}>Doğru Soru</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statEmoji}>📊</Text>
              <View>
                <Text style={styles.statNumber}>%{successRate}</Text>
                <Text style={styles.statLabel}>Başarı</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Daily Goal */}
        <Card style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Text style={styles.goalTitle}>Günlük Hedef</Text>
            <Text style={styles.goalQuestions}>
              {userProgress.todayQuestionsSolved}/{userProgress.dailyQuestionGoal} Soru
            </Text>
          </View>
          <ProgressBar progress={dailyGoalProgress} height={16} showLabel />
          <Text style={styles.goalMessage}>
            {dailyGoalProgress >= 100
              ? '🎉 Harika! Günlük hedefini tamamladın!'
              : `Hedefini tamamlamak için ${userProgress.dailyQuestionGoal - userProgress.todayQuestionsSolved} soru daha çöz!`}
          </Text>
        </Card>

        {/* Quick Start */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hızlı Başlat</Text>
          <TouchableOpacity style={styles.quickStartCard}>
            <View style={styles.quickStartLeft}>
              <Text style={styles.quickStartIcon}>🎯</Text>
              <View>
                <Text style={styles.quickStartTitle}>Günlük Test</Text>
                <Text style={styles.quickStartSubtitle}>20 soru • Karışık</Text>
              </View>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickStartCard}>
            <View style={styles.quickStartLeft}>
              <Text style={styles.quickStartIcon}>💪</Text>
              <View>
                <Text style={styles.quickStartTitle}>Zayıf Konular</Text>
                <Text style={styles.quickStartSubtitle}>
                  {userProgress.weakSubjects.length} konu çalışılmalı
                </Text>
              </View>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickStartCard}>
            <View style={styles.quickStartLeft}>
              <Text style={styles.quickStartIcon}>📝</Text>
              <View>
                <Text style={styles.quickStartTitle}>Mock Sınav</Text>
                <Text style={styles.quickStartSubtitle}>Gerçek sınav simülasyonu</Text>
              </View>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Subject Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Temel Bilimler</Text>
          <View style={styles.subjectGrid}>
            {subjects
              .filter((s) => s.category === 'basic')
              .slice(0, 4)
              .map((subject) => {
                const stats = userProgress.stats[subject.id];
                const subjectSuccessRate = stats
                  ? Math.round((stats.correct / stats.total) * 100)
                  : 0;

                return (
                  <TouchableOpacity
                    key={subject.id}
                    style={[styles.subjectCard, { borderLeftColor: subject.color }]}
                  >
                    <Text style={styles.subjectIcon}>{subject.icon}</Text>
                    <Text style={styles.subjectName}>{subject.name}</Text>
                    {stats && (
                      <Text style={styles.subjectStats}>
                        %{subjectSuccessRate} • {stats.total} soru
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Klinik Bilimler</Text>
          <View style={styles.subjectGrid}>
            {subjects
              .filter((s) => s.category === 'clinical')
              .slice(0, 4)
              .map((subject) => {
                const stats = userProgress.stats[subject.id];
                const subjectSuccessRate = stats
                  ? Math.round((stats.correct / stats.total) * 100)
                  : 0;

                return (
                  <TouchableOpacity
                    key={subject.id}
                    style={[styles.subjectCard, { borderLeftColor: subject.color }]}
                  >
                    <Text style={styles.subjectIcon}>{subject.icon}</Text>
                    <Text style={styles.subjectName}>{subject.name}</Text>
                    {stats && (
                      <Text style={styles.subjectStats}>
                        %{subjectSuccessRate} • {stats.total} soru
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
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
  subtitle: {
    fontSize: 16,
    color: '#777777',
  },
  statsCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  statsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statEmoji: {
    fontSize: 32,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F1F1F',
  },
  statLabel: {
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
  goalQuestions: {
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
  subjectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  subjectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
  },
  subjectIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F1F1F',
    marginBottom: 4,
  },
  subjectStats: {
    fontSize: 12,
    color: '#777777',
  },
});
