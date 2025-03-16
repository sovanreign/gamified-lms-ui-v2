"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaCheck, FaTimes } from "react-icons/fa";

// Food choices
const foodItems = [
  { name: "Apple", type: "healthy", image: "/apple.png" },
  { name: "Burger", type: "unhealthy", image: "/burger.png" },
  { name: "Broccoli", type: "healthy", image: "/broccoli.png" },
  { name: "Pizza", type: "unhealthy", image: "/pizza.png" },
  { name: "Carrot", type: "healthy", image: "/carrot.png" },
  { name: "Fries", type: "unhealthy", image: "/fries.png" },
];

export default function Lesson3() {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [result, setResult] = useState(null);

  // Handle selecting food
  const handleSelectFood = (food) => {
    if (selectedFoods.length < 3) {
      setSelectedFoods([...selectedFoods, food]);
    }
  };

  // Check answers
  const checkAnswers = () => {
    const allHealthy = selectedFoods.every((food) => food.type === "healthy");
    setResult(allHealthy);
  };

  // Reset the game
  const resetGame = () => {
    setSelectedFoods([]);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Lesson Thumbnail */}
      <img
        src="/module.png"
        alt="Lesson Thumbnail"
        className="w-full h-52 object-cover rounded-lg"
      />

      {/* Lesson Title */}
      <h1 className="text-2xl font-bold">Lesson 3: My Favorite Foods</h1>

      {/* Categories */}
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-600">Category</span>
        <Badge variant="secondary">Health & Nutrition</Badge>
      </div>

      {/* Estimated Duration */}
      <div className="flex items-center gap-2 text-gray-600">
        <Clock size={16} />
        <span>Estimated Duration</span>
        <span className="font-medium">5 Minutes</span>
      </div>

      {/* Bible Memory Verse */}
      <div className="p-4 bg-green-100 border-l-4 border-green-500 rounded-lg">
        <p className="font-semibold">📖 Memory Gem</p>
        <p className="italic">
          "So whether you eat or drink or whatever you do, do it all for the
          glory of God."
        </p>
        <p className="text-right font-semibold">— 1 Corinthians 10:31</p>
      </div>

      {/* Objectives */}
      <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
        <p className="font-semibold">🎯 Objectives</p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Identify different types of food.</li>
          <li>Understand the importance of eating healthy foods.</li>
          <li>
            Recognize which foods are best for growing strong and staying
            healthy.
          </li>
          <li>Learn to make choices that honor God with our bodies.</li>
        </ul>
      </div>

      {/* Bible Reflection */}
      <p className="text-gray-700 leading-relaxed">
        God has given us a variety of foods to enjoy. Some foods help our bodies
        grow strong, while others are just for fun. We must learn to make
        healthy choices because our bodies are gifts from God. Think about this:
        <strong> What is your favorite food?</strong> How can you make sure to
        eat a balanced meal every day?
      </p>

      {/* Interactive Activity: Build a Healthy Meal */}
      <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
        <p className="font-semibold">🍽️ Activity: Build a Healthy Meal</p>
        <p>
          Select **3 foods** to add to your plate. Try to make **a healthy
          meal**!
        </p>
      </div>

      {/* Available Food Choices */}
      <div className="grid grid-cols-3 gap-4">
        {foodItems.map((food, index) => (
          <button
            key={index}
            onClick={() => handleSelectFood(food)}
            disabled={selectedFoods.includes(food)}
            className="flex flex-col items-center bg-white shadow rounded-lg p-2"
          >
            <img src={food.image} alt={food.name} className="w-16 h-16" />
            <p className="text-sm font-medium">{food.name}</p>
          </button>
        ))}
      </div>

      {/* Selected Food Tray */}
      <div className="p-4 border rounded-lg bg-gray-100">
        <p className="font-semibold">Your Plate</p>
        <div className="grid grid-cols-3 gap-4 mt-2">
          {selectedFoods.map((food, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={food.image} alt={food.name} className="w-16 h-16" />
              <p className="text-sm">{food.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Check Answers */}
      <div className="flex gap-2">
        <Button onClick={checkAnswers} disabled={selectedFoods.length < 3}>
          Submit Meal
        </Button>
        <Button variant="outline" onClick={resetGame}>
          Reset
        </Button>
      </div>

      {/* Results */}
      {result !== null && (
        <div
          className={`p-4 rounded-lg text-center ${
            result
              ? "bg-green-100 border-green-500"
              : "bg-red-100 border-red-500"
          }`}
        >
          <p className="font-semibold">
            {result ? (
              <>
                <FaCheck className="inline-block text-green-600 mr-2" /> Good
                job! You picked a **healthy meal**! 🍏
              </>
            ) : (
              <>
                <FaTimes className="inline-block text-red-600 mr-2" /> Oops! Try
                again to pick **only healthy foods**.
              </>
            )}
          </p>
        </div>
      )}

      {/* My Moment with God */}
      <div className="p-4 bg-purple-100 border-l-4 border-purple-500 rounded-lg">
        <p className="font-semibold">🙏 My Moment with God</p>
        <p className="italic">
          "Dear God, thank You for giving us delicious and healthy foods. Help
          me to make wise choices so I can grow strong and take care of my body,
          which is a gift from You. Amen."
        </p>
      </div>
    </div>
  );
}
