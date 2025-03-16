"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { FaCheck, FaTimes } from "react-icons/fa";

/* List of foods for activity */
const foodOptions = [
  { name: "Burger", image: "/burger.png", isHealthy: false },
  { name: "Lollipop", image: "/lollipop.png", isHealthy: false },
  { name: "Apple", image: "/apple.png", isHealthy: true },
];

export default function Lesson2() {
  const [selectedFood, setSelectedFood] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleFoodSelection = (food) => {
    setSelectedFood(food.name);
    setIsCorrect(food.isHealthy);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Lesson Thumbnail */}
      <img
        src="/module.png"
        alt="Lesson Thumbnail"
        className="w-full h-52 object-cover rounded-lg"
      />

      {/* Lesson Title */}
      <h1 className="text-2xl font-bold">
        Lesson 2: God Created Boys and Girls
      </h1>

      {/* Categories */}
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-600">Category</span>
        <Badge variant="secondary">Creation</Badge>
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
          "So God created mankind in His own image, in the image of God He
          created them; male and female He created them."
        </p>
        <p className="text-right font-semibold">— Genesis 1:27</p>
      </div>

      {/* Objectives */}
      <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
        <p className="font-semibold">🎯 Objectives</p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Understand that God created boys and girls in His own image.</li>
          <li>Recognize that everyone is special and loved by God.</li>
          <li>
            Appreciate differences and similarities between boys and girls.
          </li>
          <li>Learn to make healthy food choices as part of God’s creation.</li>
        </ul>
      </div>

      {/* Bible Reflection */}
      <p className="text-gray-700 leading-relaxed">
        God made boys and girls as part of His beautiful creation. We are all
        special because we are made in His image. He loves us and wants us to be
        kind, respectful, and take care of our bodies. Think about this:
        <strong> What makes you special?</strong> How can you show kindness to
        others who are different from you?
      </p>

      {/* Coloring Activity */}
      <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
        <p className="font-semibold">
          🎨 Enrichment Activity: Who Did God Create?
        </p>
        <p>
          🖍 If you are a <strong>boy</strong>, color the boy. If you are a{" "}
          <strong>girl</strong>, color the girl.
        </p>
        <img
          src="/coloring-activity.png"
          alt="Coloring Activity"
          className="w-full rounded-lg"
        />
      </div>

      {/* Healthy Choices Activity */}
      <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
        <p className="font-semibold">🍎 Choose the Healthy Food</p>
        <p>
          Our health depends on the food we eat.{" "}
          <strong>Fruits, vegetables, and grains</strong> are good for us.{" "}
          <strong> God is happy</strong> when we choose to eat the right and
          healthy food.
        </p>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {foodOptions.map((food, index) => (
            <button
              key={index}
              className="p-2 border rounded-lg bg-white hover:bg-gray-100 transition"
              onClick={() => handleFoodSelection(food)}
            >
              <img src={food.image} alt={food.name} className="w-24 mx-auto" />
            </button>
          ))}
        </div>

        {/* Show Feedback */}
        {selectedFood && (
          <div className="mt-4 text-lg font-semibold">
            {isCorrect ? (
              <p className="text-green-600 flex items-center gap-2">
                <FaCheck className="text-green-600" /> Correct! Healthy choice:{" "}
                {selectedFood}
              </p>
            ) : (
              <p className="text-red-600 flex items-center gap-2">
                <FaTimes className="text-red-600" /> Wrong! Try again.
              </p>
            )}
          </div>
        )}
      </div>

      {/* My Moment with God */}
      <div className="p-4 bg-purple-100 border-l-4 border-purple-500 rounded-lg">
        <p className="font-semibold">🙏 My Moment with God</p>
        <p className="italic">
          "Dear God, thank You for creating boys and girls in Your image. Help
          me to be kind, love others, and take care of my body. Thank You for
          the food that keeps me healthy. Amen."
        </p>
      </div>
    </div>
  );
}
