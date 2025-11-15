import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { subjectGroups, subjects } from '../data/mockData';
import { Topic } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LessonsScreen() {
  const navigation = useNavigation<NavigationProp>();

  const getTopicIcon = (type: Topic['type']) => {
    switch (type) {
      case 'theory':
        return '📖';
      case 'practice':
        return '🎯';
      case 'mixed':
        return '📝';
      case 'exam':
        return '🏆';
      default:
        return '📋';
    }
  };

  const getTopicColor = (topic: Topic) => {
    if (topic.locked) return '#CCCCCC';
    if (topic.completed) return '#58CC02';

    const subject = subjects.find(s => s.id === topic.subjectId);
    return subject?.color || '#1CB0F6';
  };

  const getDifficultyColor = (difficulty: Topic['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return '#58CC02';
      case 'medium':
        return '#FF9600';
      case 'hard':
        return '#FF4B4B';
      default:
        return '#CCCCCC';
    }
  };

  const getDifficultyLabel = (difficulty: Topic['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'Kolay';
      case 'medium':
        return 'Orta';
      case 'hard':
        return 'Zor';
      default:
        return '';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Konu Yolculuğu</Text>
        <Text style={styles.subtitle}>TUS'a adım adım hazırlan!</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {subjectGroups.map((group, groupIndex) => (
          <View key={group.id} style={styles.groupContainer}>
            {/* Group Header */}
            <View style={styles.groupHeader}>
              <View
                style={[
                  styles.groupBadge,
                  { backgroundColor: group.unlocked ? (group.category === 'basic' ? '#4ECDC4' : '#A8E6CF') : '#E5E5E5' },
                ]}
              >
                <Text style={styles.groupBadgeText}>
                  {group.unlocked ? (group.category === 'basic' ? '🧬' : '🏥') : '🔒'}
                </Text>
              </View>
              <View style={styles.groupInfo}>
                <Text style={styles.groupTitle}>{group.title}</Text>
                <Text style={styles.groupDescription}>{group.description}</Text>
              </View>
            </View>

            {/* Topics Path */}
            <View style={styles.topicsPath}>
              {group.topics.map((topic, topicIndex) => {
                const isEven = topicIndex % 2 === 0;
                const topicColor = getTopicColor(topic);
                const subject = subjects.find(s => s.id === topic.subjectId);

                return (
                  <View key={topic.id} style={styles.topicRow}>
                    {/* Path line */}
                    {topicIndex > 0 && (
                      <View
                        style={[
                          styles.pathLine,
                          {
                            left: isEven ? '25%' : '75%',
                            backgroundColor: topic.locked ? '#E5E5E5' : '#CCCCCC',
                          },
                        ]}
                      />
                    )}

                    <TouchableOpacity
                      style={[
                        styles.topicButton,
                        {
                          alignSelf: isEven ? 'flex-start' : 'flex-end',
                          backgroundColor: topicColor,
                        },
                      ]}
                      onPress={() => {
                        if (!topic.locked) {
                          navigation.navigate('Exercise', { lessonId: topic.id });
                        }
                      }}
                      disabled={topic.locked}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.topicIcon}>
                        {topic.locked ? '🔒' : subject?.icon || getTopicIcon(topic.type)}
                      </Text>
                      {topic.completed && (
                        <View style={styles.completedBadge}>
                          <Text style={styles.completedCheck}>✓</Text>
                        </View>
                      )}
                      {!topic.locked && !topic.completed && (
                        <View
                          style={[
                            styles.difficultyBadge,
                            { backgroundColor: getDifficultyColor(topic.difficulty) },
                          ]}
                        >
                          <Text style={styles.difficultyText}>
                            {getDifficultyLabel(topic.difficulty)[0]}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>

                    <View
                      style={[
                        styles.topicInfo,
                        {
                          alignItems: isEven ? 'flex-start' : 'flex-end',
                        },
                      ]}
                    >
                      <Text style={styles.topicTitle}>{topic.title}</Text>
                      <Text style={styles.topicSubject}>{subject?.name}</Text>
                      <Text style={styles.topicQuestions}>
                        {topic.questionCount} soru
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            {/* Spacer between groups */}
            {groupIndex < subjectGroups.length - 1 && (
              <View style={styles.groupSpacer} />
            )}
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F1F1F',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#777777',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
  },
  groupContainer: {
    paddingHorizontal: 20,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  groupBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupBadgeText: {
    fontSize: 28,
  },
  groupInfo: {
    flex: 1,
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F1F1F',
    marginBottom: 2,
  },
  groupDescription: {
    fontSize: 14,
    color: '#777777',
  },
  topicsPath: {
    position: 'relative',
  },
  topicRow: {
    marginBottom: 40,
    position: 'relative',
  },
  pathLine: {
    position: 'absolute',
    top: -40,
    width: 4,
    height: 40,
    transform: [{ translateX: -2 }],
  },
  topicButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    position: 'relative',
  },
  topicIcon: {
    fontSize: 36,
  },
  completedBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFD900',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  completedCheck: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  difficultyBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  topicInfo: {
    marginTop: 8,
    width: '50%',
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F',
    marginBottom: 2,
  },
  topicSubject: {
    fontSize: 12,
    color: '#777777',
    marginBottom: 2,
  },
  topicQuestions: {
    fontSize: 14,
    color: '#58CC02',
    fontWeight: '600',
  },
  groupSpacer: {
    height: 40,
    borderLeftWidth: 4,
    borderLeftColor: '#E5E5E5',
    marginLeft: '50%',
    transform: [{ translateX: -2 }],
  },
});
