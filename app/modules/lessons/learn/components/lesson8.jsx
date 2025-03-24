"use client";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export default function Lesson8() {
  const [selectedSkyItems, setSelectedSkyItems] = useState([]);
  const [showSkyResult, setShowSkyResult] = useState(false);
  const [isSkyCorrect, setIsSkyCorrect] = useState(false);

  const items = [
    { id: 1, name: "Clouds", emoji: "☁️" },
    { id: 2, name: "Stars", emoji: "⭐" },
    { id: 3, name: "Birds", emoji: "🐦" },
    { id: 4, name: "Mountains", emoji: "⛰️" },
    { id: 5, name: "Ocean", emoji: "🌊" },
  ];

  const correctSkyItems = ["Clouds", "Birds"];

  const toggleSkyItem = (itemName) => {
    if (selectedSkyItems.includes(itemName)) {
      setSelectedSkyItems(selectedSkyItems.filter((name) => name !== itemName));
    } else {
      setSelectedSkyItems([...selectedSkyItems, itemName]);
    }
  };

  const checkSkyItems = () => {
    const sortedSelected = [...selectedSkyItems].sort();
    const sortedCorrect = [...correctSkyItems].sort();

    const isAnswerCorrect =
      sortedSelected.length === sortedCorrect.length &&
      sortedSelected.every((value, index) => value === sortedCorrect[index]);

    setIsSkyCorrect(isAnswerCorrect);
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
        Lesson 8: God's Creation of the Sky
      </h1>

      {/* Short Description */}
      <p className="text-gray-700">
        Explore the second day of creation and discover how God formed the sky,
        providing order and beauty to the earth.
      </p>

      {/* Categories */}
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-600">Category:</span>
        <Badge variant="secondary">Creation</Badge>
      </div>

      {/* Estimated Duration */}
      <div className="flex items-center gap-2 text-gray-600">
        <Clock size={16} />
        <span>Estimated Duration:</span>
        <span className="font-medium">7 Minutes</span>
      </div>

      {/* Bible Verse */}
      <div className="bg-green-100 p-4 rounded-md border-l-4 border-green-600">
        <h2 className="font-semibold text-green-700">📖 Memory Verse</h2>
        <p className="text-gray-700 mt-2">
          <strong>
            “And God said, ‘Let there be a vault between the waters to separate
            water from water.’”
          </strong>{" "}
          (Genesis 1:6-7, NIV)
        </p>
      </div>

      {/* Objectives */}
      <div className="bg-gray-100 p-4 rounded-md">
        <h2 className="font-semibold text-gray-800">🎯 Lesson Objectives</h2>
        <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
          <li>Identify how God separated the waters to create the sky.</li>
          <li>
            Appreciate the beauty and order of God's design in the heavens.
          </li>
        </ul>
      </div>

      {/* Lesson Content */}
      <div className="text-gray-700 space-y-3">
        <h2 className="font-semibold text-lg">
          The Second Day of Creation: The Sky
        </h2>
        <p>
          Have you ever looked up and marveled at the vast sky above? On the
          second day, God separated the waters, forming a magnificent canopy
          that covers the earth.
        </p>
        <p>
          In Genesis 1:6-8, God said,{" "}
          <strong>
            “Let there be a vault between the waters to separate water from
            water.”
          </strong>{" "}
          And so, the sky was created—providing a home for clouds, birds, and
          the promise of new beginnings.
        </p>
        <p>
          The formation of the sky demonstrates God's wisdom and the perfect
          order in His creation. Every glance upward is a reminder of His
          constant protection and the beauty of His works.
        </p>
      </div>

      {/* Reflection */}
      <div className="bg-blue-100 p-4 rounded-md border-l-4 border-blue-600">
        <h2 className="font-semibold text-blue-700">🌟 Reflect</h2>
        <p className="text-gray-700 mt-2">
          Consider the sky above you—its endless expanse, its beauty, and its
          order. How does the sky remind you of God's care and the structure He
          brings to our lives?
        </p>
      </div>

      {/* Activity Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">
          🎮 Activity: Match the Elements of the Sky
        </h2>
        <p className="text-gray-600">
          Click the items that belong to God's creation on the second day.
          (Hint: Think about what naturally belongs in the sky.)
        </p>

        <h3 className="text-lg font-medium mt-4">
          Which of the following belong to the sky?
        </h3>

        <div className="flex flex-wrap gap-4 mt-4">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleSkyItem(item.name)}
              className={`p-10 text-5xl rounded-md cursor-pointer ${
                selectedSkyItems.includes(item.name)
                  ? "bg-green-500"
                  : "bg-gray-500"
              }`}
            >
              {item.emoji}
            </div>
          ))}
        </div>

        <Button
          className="mt-4 bg-green-600 text-white"
          onClick={() => {
            setShowSkyResult(true);
            checkSkyItems();
          }}
        >
          Submit Answer
        </Button>

        {showSkyResult && (
          <div
            className={`mt-4 p-4 rounded ${
              isSkyCorrect
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isSkyCorrect
              ? "✅ Correct! You have selected the correct sky elements!"
              : "❌ Incorrect. Please select only the items that belong in the sky."}
          </div>
        )}
      </div>

      {/* My Moment with God */}
      <div className="bg-yellow-100 p-4 rounded-md border-l-4 border-yellow-600">
        <h2 className="font-semibold text-yellow-700">🙏 My Moment with God</h2>
        <p className="text-gray-700 mt-2">
          "Dear Lord, thank You for creating the beautiful sky that surrounds
          us. Help me to remember Your order and care in my daily life, and to
          always seek Your guidance in all I do. Amen."
        </p>
      </div>

      {/* Remember Section */}
      <div className="text-center text-gray-700 font-medium mt-6">
        🌿{" "}
        <em>
          Remember: The sky is a constant reminder of God's creative order and
          unwavering protection.
        </em>
      </div>
    </div>
  );
}
