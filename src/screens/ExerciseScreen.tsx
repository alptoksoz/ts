import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Button, ProgressBar, Card } from '../components';
import { subjectGroups } from '../data/mockData';
import { Question } from '../types';

type ExerciseRouteProp = RouteProp<RootStackParamList, 'Exercise'>;

export default function ExerciseScreen() {
  const route = useRoute<ExerciseRouteProp>();
  const navigation = useNavigation();
  const { lessonId } = route.params;

  // Find topic
  const topic = subjectGroups
    .flatMap((group) => group.topics)
    .find((t) => t.id === lessonId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  if (!topic) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Konu bulunamadı</Text>
      </SafeAreaView>
    );
  }

  const currentQuestion = topic.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / topic.questions.length) * 100;

  const handleCheck = () => {
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < topic.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowResult(false);
      setIsCorrect(false);
    } else {
      // Topic completed
      const successRate = Math.round((score / topic.questions.length) * 100);
      Alert.alert(
        'Konu Tamamlandı! 🎉',
        `${topic.title}\n\nDoğru: ${score}/${topic.questions.length}\nBaşarı Oranı: %${successRate}`,
        [
          {
            text: 'Harika!',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressContainer}>
        <ProgressBar progress={progress} height={8} />
        <Text style={styles.questionCounter}>
          Soru {currentQuestionIndex + 1}/{topic.questions.length}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{currentQuestion.question}</Text>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => {
              const optionLetter = String.fromCharCode(65 + index); // A, B, C, D, E
              const isSelected = selectedAnswer === option;
              const isCorrectAnswer = option === currentQuestion.correctAnswer;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    isSelected && !showResult && styles.optionSelected,
                    showResult && isCorrectAnswer && styles.optionCorrect,
                    showResult && isSelected && !isCorrect && styles.optionWrong,
                  ]}
                  onPress={() => !showResult && setSelectedAnswer(option)}
                  disabled={showResult}
                  activeOpacity={0.7}
                >
                  <View style={styles.optionContent}>
                    <View
                      style={[
                        styles.optionLetter,
                        isSelected && !showResult && styles.optionLetterSelected,
                        showResult && isCorrectAnswer && styles.optionLetterCorrect,
                        showResult && isSelected && !isCorrect && styles.optionLetterWrong,
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionLetterText,
                          (isSelected || (showResult && isCorrectAnswer)) &&
                            styles.optionLetterTextSelected,
                        ]}
                      >
                        {optionLetter}
                      </Text>
                    </View>
                    <Text style={styles.optionText}>{option}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {showResult && currentQuestion.explanation && (
            <Card style={styles.explanationCard}>
              <View style={styles.explanationHeader}>
                <Text style={styles.explanationIcon}>
                  {isCorrect ? '✅' : 'ℹ️'}
                </Text>
                <Text style={styles.explanationTitle}>Açıklama</Text>
              </View>
              <Text style={styles.explanationText}>
                {currentQuestion.explanation}
              </Text>
            </Card>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {showResult ? (
          <View style={styles.resultContainer}>
            <View
              style={[
                styles.resultBanner,
                isCorrect ? styles.correctBanner : styles.wrongBanner,
              ]}
            >
              <Text style={styles.resultText}>
                {isCorrect ? '✓ Doğru Cevap!' : '✗ Yanlış Cevap'}
              </Text>
              {!isCorrect && (
                <Text style={styles.correctAnswerText}>
                  Doğru cevap: {currentQuestion.correctAnswer}
                </Text>
              )}
            </View>
            <Button
              title={
                currentQuestionIndex < topic.questions.length - 1
                  ? 'Sonraki Soru'
                  : 'Konuyu Bitir'
              }
              onPress={handleNext}
              variant="success"
              size="large"
              style={styles.button}
            />
          </View>
        ) : (
          <Button
            title="Kontrol Et"
            onPress={handleCheck}
            disabled={!selectedAnswer}
            variant="primary"
            size="large"
            style={styles.button}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  questionCounter: {
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  questionContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F1F1F',
    marginBottom: 24,
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
  },
  optionSelected: {
    borderColor: '#1CB0F6',
    backgroundColor: '#E7F5FE',
  },
  optionCorrect: {
    borderColor: '#58CC02',
    backgroundColor: '#E8F7E4',
  },
  optionWrong: {
    borderColor: '#FF4B4B',
    backgroundColor: '#FFE8E8',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  optionLetterSelected: {
    backgroundColor: '#1CB0F6',
    borderColor: '#1CB0F6',
  },
  optionLetterCorrect: {
    backgroundColor: '#58CC02',
    borderColor: '#58CC02',
  },
  optionLetterWrong: {
    backgroundColor: '#FF4B4B',
    borderColor: '#FF4B4B',
  },
  optionLetterText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#777777',
  },
  optionLetterTextSelected: {
    color: '#FFFFFF',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#1F1F1F',
    lineHeight: 22,
  },
  explanationCard: {
    marginTop: 20,
    backgroundColor: '#F9FAFB',
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  explanationIcon: {
    fontSize: 20,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F1F1F',
  },
  explanationText: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  button: {
    width: '100%',
  },
  resultContainer: {
    gap: 12,
  },
  resultBanner: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  correctBanner: {
    backgroundColor: '#E8F7E4',
  },
  wrongBanner: {
    backgroundColor: '#FFE8E8',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F1F1F',
  },
  correctAnswerText: {
    fontSize: 14,
    color: '#777777',
    marginTop: 4,
  },
});
