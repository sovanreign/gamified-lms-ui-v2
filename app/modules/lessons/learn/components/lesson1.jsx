"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Lesson1() {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const creations = [
    { id: 1, name: "Sun" },
    { id: 2, name: "Tree" },
    { id: 3, name: "Fish" },
    { id: 4, name: "Bird" },
  ];

  const categories = ["Sky", "Land", "Water"];

  const handleDrop = (category, item) => {
    setAnswers((prev) => ({ ...prev, [item.id]: category }));
  };

  const handleSubmit = () => {
    const correctAnswers = {
      1: "Sky",
      2: "Land",
      3: "Water",
      4: "Sky",
    };
    setIsCorrect(JSON.stringify(answers) === JSON.stringify(correctAnswers));
    setShowResult(true);
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
      <h1 className="text-2xl font-bold">
        Lesson 1: In the Beginning God Created the World
      </h1>

      {/* Categories */}
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-600">Category:</span>
        <Badge variant="secondary">Introduction</Badge>
      </div>

      {/* Estimated Duration */}
      <div className="flex items-center gap-2 text-gray-600">
        <Clock size={16} />
        <span>Estimated Duration:</span>
        <span className="font-medium">5 Minutes</span>
      </div>

      {/* Bible Verse */}
      <div className="bg-green-100 p-4 rounded-md border-l-4 border-green-600">
        <h2 className="font-semibold text-green-700">📖 Memory Verse</h2>
        <p className="text-gray-700 mt-2">
          <strong>“God saw all that he had made, and it was very good.”</strong>{" "}
          (Genesis 1:31, NIV)
        </p>
      </div>

      {/* Objectives */}
      <div className="bg-gray-100 p-4 rounded-md">
        <h2 className="font-semibold text-gray-800">🎯 Lesson Objectives</h2>
        <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
          <li>Recognize that God created everything.</li>
          <li>Understand the order of creation.</li>
          <li>Appreciate God's love through His creations.</li>
          <li>Identify where different creations belong (sky, land, water).</li>
        </ul>
      </div>

      {/* Lesson Content */}
      <div className="text-gray-700 space-y-3">
        <h2 className="font-semibold text-lg">🌍 How Did the World Begin?</h2>
        <p>
          Have you ever thought about how everything in the world began? The
          flowers in the garden, the birds in the sky, and the fish in the sea?
        </p>
        <p>
          People have tried to explain how the world came to be, but the Bible
          tells us the real truth. In Genesis 1:1, it says, **“In the beginning,
          God created the heavens and the earth.”**
        </p>
        <p>
          God made everything from nothing. He made the **light, sky, land,
          plants, sun, moon, stars, fish, birds, and animals** before creating
          humans in His image.
        </p>
      </div>

      {/* Reflection */}
      <div className="bg-blue-100 p-4 rounded-md border-l-4 border-blue-600">
        <h2 className="font-semibold text-blue-700">💭 Reflect</h2>
        <p className="text-gray-700 mt-2">
          Think about this: If God created everything, what does that say about
          His power and love for us? How can we show gratitude for His
          creations?
        </p>
      </div>

      {/* Activity */}
      <div className="bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">
          🎮 Activity: Match God's Creation
        </h2>
        <p className="text-gray-600">
          Drag each creation to its correct place.
        </p>

        {/* Drag Items */}
        <div className="flex flex-wrap gap-4 mt-4">
          {creations.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData("item", JSON.stringify(item))
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
            >
              {item.name}
            </div>
          ))}
        </div>

        {/* Drop Zones */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {categories.map((category) => (
            <div
              key={category}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const item = JSON.parse(e.dataTransfer.getData("item"));
                handleDrop(category, item);
              }}
              className="p-4 border-2 border-dashed rounded-md text-center bg-white"
            >
              <h3 className="font-semibold">{category}</h3>
              {Object.keys(answers)
                .filter((key) => answers[key] === category)
                .map((key) => (
                  <p key={key} className="text-gray-700">
                    {creations.find((c) => c.id == key)?.name}
                  </p>
                ))}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <Button onClick={handleSubmit} className="mt-4 bg-green-600 text-white">
          Submit Answers
        </Button>

        {/* Result */}
        {showResult && (
          <div
            className={`mt-4 p-4 rounded ${
              isCorrect
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isCorrect
              ? "✅ Correct! You matched everything correctly."
              : "❌ Some answers are incorrect. Try again!"}
          </div>
        )}
      </div>

      {/* My Moment with God */}
      <div className="bg-yellow-100 p-4 rounded-md border-l-4 border-yellow-600">
        <h2 className="font-semibold text-yellow-700">🙏 My Moment with God</h2>
        <p className="text-gray-700 mt-2">
          "Dear God, I am in awe of what You have created. Thank You for making
          this world beautiful. Help me to take care of Your creations and love
          others as You love me. Amen."
        </p>
      </div>

      {/* Remember Section */}
      <div className="text-center text-gray-700 font-medium mt-6">
        🌿 <em>Remember: God created this world because He loves us.</em>
      </div>
    </div>
  );
}
