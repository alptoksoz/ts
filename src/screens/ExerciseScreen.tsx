import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Button, ProgressBar } from '../components';
import { units } from '../data/mockData';
import { Exercise } from '../types';

type ExerciseRouteProp = RouteProp<RootStackParamList, 'Exercise'>;

export default function ExerciseScreen() {
  const route = useRoute<ExerciseRouteProp>();
  const navigation = useNavigation();
  const { lessonId } = route.params;

  // Find lesson
  const lesson = units
    .flatMap((unit) => unit.lessons)
    .find((l) => l.id === lessonId);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [matchedPairs, setMatchedPairs] = useState<{ [key: string]: string }>({});
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Ders bulunamadı</Text>
      </SafeAreaView>
    );
  }

  const currentExercise = lesson.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / lesson.exercises.length) * 100;

  const handleCheck = () => {
    let correct = false;

    if (currentExercise.type === 'select') {
      correct = selectedAnswer === currentExercise.answer;
    } else if (currentExercise.type === 'translate') {
      const userAnswer = selectedAnswer.toLowerCase().trim();
      const correctAnswer = currentExercise.answer.toLowerCase().trim();
      correct = userAnswer === correctAnswer;
    } else if (currentExercise.type === 'match') {
      const pairs = currentExercise.pairs || [];
      correct = pairs.every(
        (pair) => matchedPairs[pair.word] === pair.translation
      );
    }

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setSelectedAnswer('');
      setMatchedPairs({});
      setSelectedWord('');
      setShowResult(false);
      setIsCorrect(false);
    } else {
      // Lesson completed
      const earnedXP = Math.round((score / lesson.exercises.length) * lesson.xp);
      Alert.alert(
        'Tebrikler! 🎉',
        `Dersi tamamladın!\n\nDoğru: ${score}/${lesson.exercises.length}\n+${earnedXP} XP kazandın!`,
        [
          {
            text: 'Harika!',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  };

  const handleMatchSelect = (item: string, type: 'word' | 'translation') => {
    if (type === 'word') {
      setSelectedWord(item);
    } else if (selectedWord) {
      setMatchedPairs({ ...matchedPairs, [selectedWord]: item });
      setSelectedWord('');
    }
  };

  const renderExercise = () => {
    switch (currentExercise.type) {
      case 'select':
        return (
          <View style={styles.exerciseContainer}>
            <Text style={styles.question}>{currentExercise.question}</Text>
            <View style={styles.optionsContainer}>
              {currentExercise.options?.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    selectedAnswer === option && styles.optionSelected,
                    showResult &&
                      option === currentExercise.answer &&
                      styles.optionCorrect,
                    showResult &&
                      selectedAnswer === option &&
                      !isCorrect &&
                      styles.optionWrong,
                  ]}
                  onPress={() => !showResult && setSelectedAnswer(option)}
                  disabled={showResult}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedAnswer === option && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'translate':
        return (
          <View style={styles.exerciseContainer}>
            <Text style={styles.question}>{currentExercise.question}</Text>
            <TextInput
              style={styles.input}
              placeholder="Çevirini yaz..."
              value={selectedAnswer}
              onChangeText={setSelectedAnswer}
              editable={!showResult}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {showResult && (
              <View style={styles.answerFeedback}>
                <Text style={styles.correctAnswer}>
                  Doğru cevap: {currentExercise.answer}
                </Text>
              </View>
            )}
          </View>
        );

      case 'match':
        const pairs = currentExercise.pairs || [];
        const words = pairs.map((p) => p.word);
        const translations = pairs
          .map((p) => p.translation)
          .sort(() => Math.random() - 0.5);

        return (
          <View style={styles.exerciseContainer}>
            <Text style={styles.question}>{currentExercise.question}</Text>
            <View style={styles.matchContainer}>
              <View style={styles.matchColumn}>
                {words.map((word) => (
                  <TouchableOpacity
                    key={word}
                    style={[
                      styles.matchItem,
                      selectedWord === word && styles.matchItemSelected,
                      matchedPairs[word] && styles.matchItemMatched,
                    ]}
                    onPress={() => !showResult && handleMatchSelect(word, 'word')}
                    disabled={showResult || !!matchedPairs[word]}
                  >
                    <Text style={styles.matchText}>{word}</Text>
                    {matchedPairs[word] && (
                      <Text style={styles.matchedWith}>→ {matchedPairs[word]}</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.matchColumn}>
                {translations.map((translation) => {
                  const isMatched = Object.values(matchedPairs).includes(translation);
                  return (
                    <TouchableOpacity
                      key={translation}
                      style={[
                        styles.matchItem,
                        isMatched && styles.matchItemMatched,
                      ]}
                      onPress={() =>
                        !showResult && handleMatchSelect(translation, 'translation')
                      }
                      disabled={showResult || isMatched}
                    >
                      <Text style={styles.matchText}>{translation}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        );

      default:
        return <Text>Bilinmeyen egzersiz tipi</Text>;
    }
  };

  const canCheck = () => {
    if (currentExercise.type === 'match') {
      return Object.keys(matchedPairs).length === (currentExercise.pairs?.length || 0);
    }
    return selectedAnswer.length > 0;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressContainer}>
        <ProgressBar progress={progress} height={8} />
      </View>

      <View style={styles.content}>{renderExercise()}</View>

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
                {isCorrect ? '✓ Doğru!' : '✗ Yanlış'}
              </Text>
            </View>
            <Button
              title={
                currentExerciseIndex < lesson.exercises.length - 1
                  ? 'Devam Et'
                  : 'Bitir'
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
            disabled={!canCheck()}
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
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  exerciseContainer: {
    flex: 1,
  },
  question: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F1F1F',
    marginBottom: 32,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
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
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F1F1F',
  },
  optionTextSelected: {
    color: '#1CB0F6',
  },
  input: {
    backgroundColor: '#F7F7F7',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 20,
    fontSize: 18,
    fontWeight: '600',
  },
  answerFeedback: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#E8F7E4',
    borderRadius: 12,
  },
  correctAnswer: {
    fontSize: 16,
    color: '#58CC02',
    fontWeight: '600',
    textAlign: 'center',
  },
  matchContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  matchColumn: {
    flex: 1,
    gap: 12,
  },
  matchItem: {
    backgroundColor: '#F7F7F7',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  matchItemSelected: {
    borderColor: '#1CB0F6',
    backgroundColor: '#E7F5FE',
  },
  matchItemMatched: {
    borderColor: '#58CC02',
    backgroundColor: '#E8F7E4',
  },
  matchText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F',
  },
  matchedWith: {
    fontSize: 12,
    color: '#58CC02',
    marginTop: 4,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
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
});
