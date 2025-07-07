"use client";

import React from "react";
import { useSets } from "../hooks/useSets";
import Link from "next/link";
import Image from "next/image";
import { FaRegClock, FaPlay, FaDumbbell } from "react-icons/fa";

interface SetListProps {
  categoryId?: string;
  subcategoryId?: string;
}

const SetList: React.FC<SetListProps> = ({ categoryId, subcategoryId }) => {
  const { sets, loading, error } = useSets({ categoryId, subcategoryId });

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-2">შეცდომა სეტების ჩატვირთვაში</p>
        <p className="text-gray-500 text-sm">{error}</p>
      </div>
    );
  }

  if (!sets.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">სეტები ვერ მოიძებნა</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {sets.map((set) => (
        <div
          key={set._id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          {/* სეტის მთავარი სურათი */}
          <div className="relative h-48 bg-gray-200">
            {set.exercises[0]?.video?.thumbnailUrl ? (
              <Image
                src={set.exercises[0].video.thumbnailUrl}
                alt={set.name}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-purple-100">
                <FaPlay className="w-12 h-12 text-purple-500" />
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{set.name}</h3>
            <p className="text-gray-600 mb-4">{set.description}</p>
            
            {/* გამოწერის გეგმები */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">გამოწერის გეგმები:</h4>
              <div className="space-y-2">
                {set.subscriptionPlans.map((plan, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{plan.period} თვე</span>
                    <span className="font-medium">{plan.price} ₾</span>
                  </div>
                ))}
              </div>
            </div>

            {/* სავარჯიშოების სია */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">სავარჯიშოები ({set.exercises.length}):</h4>
              <ul className="space-y-3">
                {set.exercises.slice(0, 3).map((exercise, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    {/* ვიდეოს მინიატურა */}
                    <div className="relative w-20 h-12 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                      {exercise.video?.thumbnailUrl ? (
                        <Image
                          src={exercise.video.thumbnailUrl}
                          alt={exercise.video.title || exercise.video.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FaPlay className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    {/* სავარჯიშოს ინფორმაცია */}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 line-clamp-1">
                        {exercise.video?.title || exercise.video?.name || `სავარჯიშო ${index + 1}`}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <FaDumbbell className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {exercise.sets}x{exercise.repetitions}
                          </span>
                        </div>
                        {exercise.video?.duration && (
                          <div className="flex items-center space-x-1">
                            <FaRegClock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {Math.floor(exercise.video.duration / 60)}:
                              {(exercise.video.duration % 60).toString().padStart(2, '0')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
                {set.exercises.length > 3 && (
                  <li className="text-sm text-purple-600 font-medium">
                    +{set.exercises.length - 3} მეტი სავარჯიშო...
                  </li>
                )}
              </ul>
            </div>

            {/* დეტალების ნახვის ღილაკი */}
            <Link
              href={`/sets/${set._id}`}
              className="block w-full text-center bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors duration-300"
            >
              დეტალურად ნახვა
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SetList; 