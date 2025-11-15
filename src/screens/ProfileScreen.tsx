import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Card, ProgressBar } from '../components';
import { mockUser, userProgress, subjects } from '../data/mockData';

export default function ProfileScreen() {
  const successRate =
    mockUser.totalQuestions > 0
      ? Math.round((mockUser.correctAnswers / mockUser.totalQuestions) * 100)
      : 0;

  const achievements = [
    {
      id: '1',
      emoji: '🔥',
      title: 'Kararlı',
      description: '10 günlük seri',
      unlocked: mockUser.currentStreak >= 10,
    },
    {
      id: '2',
      emoji: '⭐',
      title: 'Başarılı',
      description: '500 soru çöz',
      unlocked: mockUser.totalQuestions >= 500,
    },
    {
      id: '3',
      emoji: '🏆',
      title: 'Mükemmel',
      description: '%80 başarı oranı',
      unlocked: successRate >= 80,
    },
    {
      id: '4',
      emoji: '📚',
      title: 'Bilge',
      description: '1000 soru çöz',
      unlocked: mockUser.totalQuestions >= 1000,
    },
    {
      id: '5',
      emoji: '💯',
      title: 'Uzman',
      description: '5 konuda %90+',
      unlocked: false,
    },
    {
      id: '6',
      emoji: '🎯',
      title: 'Disiplinli',
      description: '30 günlük seri',
      unlocked: false,
    },
  ];

  const stats = [
    {
      label: 'Çözülen Soru',
      value: mockUser.totalQuestions,
      emoji: '📝',
    },
    {
      label: 'Doğru Cevap',
      value: mockUser.correctAnswers,
      emoji: '✅',
    },
    {
      label: 'Günlük Seri',
      value: mockUser.currentStreak,
      emoji: '🔥',
    },
    {
      label: 'En Uzun Seri',
      value: mockUser.longestStreak,
      emoji: '🏅',
    },
  ];

  // Get top and weak subjects
  const subjectStats = Object.entries(userProgress.stats).map(
    ([subjectId, stats]) => {
      const subject = subjects.find((s) => s.id === subjectId);
      const successRate = Math.round((stats.correct / stats.total) * 100);
      return {
        ...subject,
        ...stats,
        successRate,
      };
    }
  );

  const topSubjects = subjectStats
    .sort((a, b) => b.successRate - a.successRate)
    .slice(0, 3);
  const weakSubjects = subjectStats
    .sort((a, b) => a.successRate - b.successRate)
    .slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {mockUser.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </Text>
          </View>
          <Text style={styles.name}>{mockUser.name}</Text>
          <Text style={styles.email}>{mockUser.email}</Text>
        </View>

        {/* Success Rate Card */}
        <Card style={styles.successCard}>
          <View style={styles.successHeader}>
            <View>
              <Text style={styles.successLabel}>Genel Başarı Oranı</Text>
              <Text style={styles.successRate}>%{successRate}</Text>
            </View>
            <Text style={styles.successEmoji}>
              {successRate >= 80 ? '🎉' : successRate >= 60 ? '📈' : '💪'}
            </Text>
          </View>
          <ProgressBar progress={successRate} height={12} color="#58CC02" />
          <Text style={styles.successText}>
            {mockUser.correctAnswers} / {mockUser.totalQuestions} soru doğru
          </Text>
        </Card>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>İstatistikler</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat) => (
              <Card key={stat.label} style={styles.statCard} padding={16}>
                <Text style={styles.statEmoji}>{stat.emoji}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </Card>
            ))}
          </View>
        </View>

        {/* Top Subjects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>En İyi Konular</Text>
          {topSubjects.map((subject) => (
            <View key={subject.id} style={styles.subjectRow}>
              <Text style={styles.subjectIcon}>{subject.icon}</Text>
              <View style={styles.subjectInfo}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <Text style={styles.subjectStats}>
                  {subject.correct}/{subject.total} doğru
                </Text>
              </View>
              <View
                style={[
                  styles.successBadge,
                  { backgroundColor: subject.color },
                ]}
              >
                <Text style={styles.successBadgeText}>
                  %{subject.successRate}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Weak Subjects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Geliştirilmesi Gereken</Text>
          {weakSubjects.map((subject) => (
            <View key={subject.id} style={styles.subjectRow}>
              <Text style={styles.subjectIcon}>{subject.icon}</Text>
              <View style={styles.subjectInfo}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <Text style={styles.subjectStats}>
                  {subject.correct}/{subject.total} doğru
                </Text>
              </View>
              <View
                style={[
                  styles.successBadge,
                  {
                    backgroundColor:
                      subject.successRate >= 70
                        ? '#58CC02'
                        : subject.successRate >= 50
                        ? '#FF9600'
                        : '#FF4B4B',
                  },
                ]}
              >
                <Text style={styles.successBadgeText}>
                  %{subject.successRate}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Başarılar</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <TouchableOpacity
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  !achievement.unlocked && styles.achievementLocked,
                ]}
              >
                <Text
                  style={[
                    styles.achievementEmoji,
                    !achievement.unlocked && styles.achievementEmojiLocked,
                  ]}
                >
                  {achievement.unlocked ? achievement.emoji : '🔒'}
                </Text>
                <Text
                  style={[
                    styles.achievementTitle,
                    !achievement.unlocked && styles.achievementTextLocked,
                  ]}
                >
                  {achievement.title}
                </Text>
                <Text
                  style={[
                    styles.achievementDescription,
                    !achievement.unlocked && styles.achievementTextLocked,
                  ]}
                >
                  {achievement.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ayarlar</Text>
          <Card style={styles.settingsCard} padding={0}>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingText}>🔔 Bildirimler</Text>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.settingDivider} />
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingText}>🎯 Günlük Hedef</Text>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.settingDivider} />
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingText}>📊 İstatistikleri Sıfırla</Text>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.settingDivider} />
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingText}>ℹ️ Hakkında</Text>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
          </Card>
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
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#58CC02',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F1F1F',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#777777',
  },
  successCard: {
    margin: 20,
    marginBottom: 8,
  },
  successHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  successLabel: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 4,
  },
  successRate: {
    fontSize: 32,
    fontWeight: '700',
    color: '#58CC02',
  },
  successEmoji: {
    fontSize: 48,
  },
  successText: {
    fontSize: 12,
    color: '#777777',
    textAlign: 'center',
    marginTop: 8,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: 'calc(50% - 6px)',
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F1F1F',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#777777',
    textAlign: 'center',
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  subjectIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F',
    marginBottom: 2,
  },
  subjectStats: {
    fontSize: 12,
    color: '#777777',
  },
  successBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  successBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: 'calc(50% - 6px)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  achievementEmojiLocked: {
    opacity: 0.5,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F1F1F',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#777777',
    textAlign: 'center',
  },
  achievementTextLocked: {
    color: '#CCCCCC',
  },
  settingsCard: {
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  settingText: {
    fontSize: 16,
    color: '#1F1F1F',
  },
  settingArrow: {
    fontSize: 18,
    color: '#CCCCCC',
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginLeft: 16,
  },
});
