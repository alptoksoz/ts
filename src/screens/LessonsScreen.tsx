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
import { units } from '../data/mockData';
import { Lesson } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LessonsScreen() {
  const navigation = useNavigation<NavigationProp>();

  const getLessonIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'lesson':
        return '📖';
      case 'practice':
        return '🎯';
      case 'story':
        return '📚';
      case 'test':
        return '🏆';
      default:
        return '📝';
    }
  };

  const getLessonColor = (lesson: Lesson) => {
    if (lesson.locked) return '#CCCCCC';
    if (lesson.completed) return '#58CC02';
    return '#1CB0F6';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dil Öğrenme Yolu</Text>
        <Text style={styles.subtitle}>Her gün pratik yaparak ilerle!</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {units.map((unit, unitIndex) => (
          <View key={unit.id} style={styles.unitContainer}>
            {/* Unit Header */}
            <View style={styles.unitHeader}>
              <View
                style={[
                  styles.unitBadge,
                  { backgroundColor: unit.unlocked ? '#FFD900' : '#E5E5E5' },
                ]}
              >
                <Text style={styles.unitBadgeText}>
                  {unit.unlocked ? '🌟' : '🔒'}
                </Text>
              </View>
              <View style={styles.unitInfo}>
                <Text style={styles.unitTitle}>{unit.title}</Text>
                <Text style={styles.unitDescription}>{unit.description}</Text>
              </View>
            </View>

            {/* Lessons Path */}
            <View style={styles.lessonsPath}>
              {unit.lessons.map((lesson, lessonIndex) => {
                const isEven = lessonIndex % 2 === 0;
                const lessonColor = getLessonColor(lesson);

                return (
                  <View key={lesson.id} style={styles.lessonRow}>
                    {/* Path line */}
                    {lessonIndex > 0 && (
                      <View
                        style={[
                          styles.pathLine,
                          {
                            left: isEven ? '25%' : '75%',
                            backgroundColor: lesson.locked ? '#E5E5E5' : '#CCCCCC',
                          },
                        ]}
                      />
                    )}

                    <TouchableOpacity
                      style={[
                        styles.lessonButton,
                        {
                          alignSelf: isEven ? 'flex-start' : 'flex-end',
                          backgroundColor: lessonColor,
                        },
                      ]}
                      onPress={() => {
                        if (!lesson.locked) {
                          navigation.navigate('Exercise', { lessonId: lesson.id });
                        }
                      }}
                      disabled={lesson.locked}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.lessonIcon}>
                        {lesson.locked ? '🔒' : getLessonIcon(lesson.type)}
                      </Text>
                      {lesson.completed && (
                        <View style={styles.completedBadge}>
                          <Text style={styles.completedCheck}>✓</Text>
                        </View>
                      )}
                    </TouchableOpacity>

                    <View
                      style={[
                        styles.lessonInfo,
                        {
                          alignItems: isEven ? 'flex-start' : 'flex-end',
                        },
                      ]}
                    >
                      <Text style={styles.lessonTitle}>{lesson.title}</Text>
                      <Text style={styles.lessonXP}>+{lesson.xp} XP</Text>
                    </View>
                  </View>
                );
              })}
            </View>

            {/* Spacer between units */}
            {unitIndex < units.length - 1 && <View style={styles.unitSpacer} />}
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
  unitContainer: {
    paddingHorizontal: 20,
  },
  unitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  unitBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitBadgeText: {
    fontSize: 28,
  },
  unitInfo: {
    flex: 1,
  },
  unitTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F1F1F',
    marginBottom: 2,
  },
  unitDescription: {
    fontSize: 14,
    color: '#777777',
  },
  lessonsPath: {
    position: 'relative',
  },
  lessonRow: {
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
  lessonButton: {
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
  lessonIcon: {
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
  lessonInfo: {
    marginTop: 8,
    width: '50%',
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F',
  },
  lessonXP: {
    fontSize: 14,
    color: '#58CC02',
    fontWeight: '600',
    marginTop: 2,
  },
  unitSpacer: {
    height: 40,
    borderLeftWidth: 4,
    borderLeftColor: '#E5E5E5',
    marginLeft: '50%',
    transform: [{ translateX: -2 }],
  },
});
