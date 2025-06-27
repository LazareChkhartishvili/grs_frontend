"use client";

import { useState, useEffect } from 'react';
import { Complex, Exercise, BackendComplex, BackendExercise } from '../../types/exercise';

interface UseComplexesReturn {
  complexes: Complex[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

function transformExercise(backendExercise: BackendExercise): Exercise {
  return {
    id: parseInt(backendExercise._id.slice(-8), 16),
    title: backendExercise.name,
    description: backendExercise.description,
    difficulty: backendExercise.difficulty,
    duration: backendExercise.duration,
    sets: `${backendExercise.repetitions}x${backendExercise.sets}`,
    image: backendExercise.images?.[0] || '/assets/images/workMan.png',
    category: backendExercise.categoryId?.name,
    instructions: backendExercise.instructions ? [backendExercise.instructions] : [],
    equipment: []
  };
}

function transformComplex(backendComplex: BackendComplex): Complex {
  // Map stage values
  let stage: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
  if (backendComplex.stage === 'advanced') stage = 'advanced';
  else if (backendComplex.stage === 'mid') stage = 'intermediate';
  else if (backendComplex.stage === 'intermediate') stage = 'intermediate';

  return {
    id: parseInt(backendComplex._id.slice(-8), 16),
    name: backendComplex.name,
    price: backendComplex.price,
    currency: "₾", // Default currency
    difficulty: backendComplex.difficulty,
    stage: stage,
    exercisesCount: backendComplex.exerciseCount,
    exercises: backendComplex.exercises?.map(transformExercise) || [],
    description: backendComplex.description,
    image: '/assets/images/workMan.png',
    totalDuration: backendComplex.totalDuration,
    isActive: backendComplex.isActive
  };
}

function getFallbackComplexes(): Complex[] {
  return [
    {
      id: 1,
      name: "ორთოპედიული კომპლექსი",
      price: 12500,
      currency: "₾",
      difficulty: "hard",
      stage: "advanced",
      exercisesCount: 4,
      exercises: [
        {
          id: 101,
          title: "ბევრი სავარჯიშოები საკმაოდ",
          difficulty: "easy",
          duration: 301,
          sets: "10x5",
          image: "/assets/images/workMan.png"
        },
        {
          id: 102,
          title: "მუხლის სახსარი ბევრი სავარჯიშოები საკმაოდ",
          difficulty: "hard",
          duration: 30,
          sets: "10x3",
          image: "/assets/images/workMan.png"
        },
        {
          id: 103,
          title: "ნევროლოგია1234",
          difficulty: "hard",
          duration: 30,
          sets: "10x3",
          image: "/assets/images/workMan.png"
        },
        {
          id: 104,
          title: "ტესტური სავარჯიშო",
          difficulty: "medium",
          duration: 15,
          sets: "12x3",
          image: "/assets/images/workMan.png"
        }
      ],
      isActive: true
    }
  ];
}

export function useComplexes(): UseComplexesReturn {
  const [complexes, setComplexes] = useState<Complex[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComplexes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔗 Fetching complexes from: http://localhost:4000/api/complexes');
      
      const response = await fetch('http://localhost:4000/api/complexes');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const backendComplexes: BackendComplex[] = await response.json();
      
      console.log('📊 Received complexes:', backendComplexes);

      // Check if it's an array
      if (!Array.isArray(backendComplexes)) {
        throw new Error('API response is not an array');
      }
      
      // Transform data to match frontend interface
      const transformedComplexes: Complex[] = backendComplexes
        .filter(complex => complex.isActive)
        .map(transformComplex);
      
      console.log('✅ Transformed complexes:', transformedComplexes);
      
      // Log detailed information about each complex
      transformedComplexes.forEach(complex => {
        console.log(`📋 კომპლექსის ინფორმაცია:`);
        console.log(`სახელი: ${complex.name}`);
        console.log(`ფასი: ${complex.price}${complex.currency}`);
        console.log(`სირთულე: ${complex.difficulty}`);
        console.log(`სტადია: ${complex.stage}`);
        console.log(`სავარჯიშოების რაოდენობა: ${complex.exercisesCount}`);
        console.log(`სავარჯიშოები კომპლექსში:`);
        complex.exercises.forEach(exercise => {
          console.log(`  ${exercise.title} - ${exercise.difficulty}, ${exercise.duration} წუთი, ${exercise.sets} სეტი`);
        });
        console.log('---');
      });
      
      setComplexes(transformedComplexes);
    } catch (err) {
      console.error('❌ Error fetching complexes:', err);
      // Use fallback complexes on error
      const fallbackComplexes = getFallbackComplexes();
      setComplexes(fallbackComplexes);
      
      setError(err instanceof Error ? err.message : 'API Error - using fallback data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplexes();
  }, []);

  return {
    complexes,
    loading,
    error,
    refetch: fetchComplexes
  };
} 