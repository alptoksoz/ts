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
import { mockUser, userProgress, languages } from '../data/mockData';

export default function ProfileScreen() {
  const currentLanguage = languages.find((l) => l.id === userProgress.languageId);
  const levelProgress = (mockUser.totalXP % 100); // Simulated level progress

  const achievements = [
    { id: '1', emoji: '🔥', title: 'Ateşli', description: '7 günlük seri', unlocked: true },
    { id: '2', emoji: '⭐', title: 'Yıldız Öğrenci', description: '1000 XP kazan', unlocked: true },
    { id: '3', emoji: '🏆', title: 'Şampiyon', description: 'Seviye 10\'a ulaş', unlocked: true },
    { id: '4', emoji: '📚', title: 'Kitap Kurdu', description: '10 ders tamamla', unlocked: false },
    { id: '5', emoji: '💯', title: 'Mükemmel', description: '5 dersi %100 ile bitir', unlocked: false },
    { id: '6', emoji: '🎯', title: 'Hedef Odaklı', description: '30 gün hedef tamamla', unlocked: false },
  ];

  const stats = [
    { label: 'Toplam Ders', value: userProgress.completedLessons.length, emoji: '📖' },
    { label: 'Toplam XP', value: mockUser.totalXP, emoji: '⭐' },
    { label: 'Güncel Seri', value: mockUser.currentStreak, emoji: '🔥' },
    { label: 'En Uzun Seri', value: mockUser.longestStreak, emoji: '🏅' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {mockUser.name.split(' ').map((n) => n[0]).join('')}
            </Text>
          </View>
          <Text style={styles.name}>{mockUser.name}</Text>
          <Text style={styles.email}>{mockUser.email}</Text>
        </View>

        {/* Level Card */}
        <Card style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <View>
              <Text style={styles.levelLabel}>Seviye</Text>
              <Text style={styles.levelNumber}>{mockUser.level}</Text>
            </View>
            <View style={styles.languageBadge}>
              <Text style={styles.languageFlag}>{currentLanguage?.flag}</Text>
              <Text style={styles.languageName}>{currentLanguage?.name}</Text>
            </View>
          </View>
          <View style={styles.levelProgress}>
            <ProgressBar progress={levelProgress} height={12} showLabel />
            <Text style={styles.levelProgressText}>
              {100 - levelProgress} XP sonraki seviyeye
            </Text>
          </View>
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
              <Text style={styles.settingText}>🌍 Dil Değiştir</Text>
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
  levelCard: {
    margin: 20,
    marginBottom: 8,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelLabel: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 4,
  },
  levelNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#58CC02',
  },
  languageBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  languageFlag: {
    fontSize: 24,
  },
  languageName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F1F1F',
  },
  levelProgress: {
    gap: 8,
  },
  levelProgressText: {
    fontSize: 12,
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
