"use client";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export default function Lesson6() {
  // State to keep track of selected colors.
  const [selectedColors, setSelectedColors] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const colorBgMapping = {
    Red: "bg-red-500",
    Blue: "bg-blue-500",
    Yellow: "bg-yellow-500",
    Green: "bg-green-500",
    Purple: "bg-purple-500",
  };

  // Options include both primary and non-primary colors.
  const colorOptions = [
    { id: 1, name: "Red" },
    { id: 2, name: "Blue" },
    { id: 3, name: "Yellow" },
    { id: 4, name: "Green" },
    { id: 5, name: "Purple" },
  ];

  // Correct primary colors.
  const correctColors = ["Red", "Blue", "Yellow"];

  // Toggle a color selection.
  const toggleColorSelection = (colorName) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter((name) => name !== colorName));
    } else {
      setSelectedColors([...selectedColors, colorName]);
    }
  };

  // Check if the selected colors exactly match the correct primary colors.
  const handleSubmit = () => {
    // Sort both arrays to compare their values.
    const sortedSelected = [...selectedColors].sort();
    const sortedCorrect = [...correctColors].sort();

    const isAnswerCorrect =
      sortedSelected.length === sortedCorrect.length &&
      sortedSelected.every((value, index) => value === sortedCorrect[index]);

    setIsCorrect(isAnswerCorrect);
    setShowResult(true);
  };
  return (
    <>
      <div className="space-y-6">
        {/* Lesson Thumbnail */}
        <img
          src="/module.png"
          alt="Lesson Thumbnail"
          className="w-full h-52 object-cover rounded-lg"
        />

        {/* Lesson Title */}
        <h1 className="text-2xl font-bold">Lesson 6: God's Creation: Colors</h1>

        {/* Categories */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-600">Category:</span>
          <Badge variant="secondary">Creation</Badge>
        </div>

        {/* Estimated Duration */}
        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={16} />
          <span>Estimated Duration:</span>
          <span className="font-medium">6 Minutes</span>
        </div>

        {/* Bible Verse */}
        <div className="bg-green-100 p-4 rounded-md border-l-4 border-green-600">
          <h2 className="font-semibold text-green-700">📖 Memory Verse</h2>
          <p className="text-gray-700 mt-2">
            <strong>"Let there be light,"</strong> and with that light, God
            unveiled a world of vibrant colors that declare His glory. (Genesis
            1:3, NIV)
          </p>
        </div>

        {/* Objectives */}
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="font-semibold text-gray-800">🎯 Lesson Objectives</h2>
          <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
            <li>
              Discover how God's creation of light revealed the beauty of
              colors.
            </li>
            <li>
              Learn about the significance of primary colors in nature and art.
            </li>
            <li>
              Reflect on how the spectrum of colors reminds us of God's
              creativity and love.
            </li>
          </ul>
        </div>

        {/* Lesson Content */}
        <div className="text-gray-700 space-y-3">
          <h2 className="font-semibold text-lg">
            God's Creation: The Beauty of Colors
          </h2>
          <p>
            Have you ever noticed how colors bring life and vibrancy to our
            world? When God created light, it allowed for the appearance of an
            incredible spectrum of colors.
          </p>
          <p>
            Just as primary colors—red, blue, and yellow—mix to create countless
            shades, God's design shows us how the simplest elements can combine
            to form a masterpiece. Every hue in nature reflects His glory and
            creativity.
          </p>
        </div>

        {/* Reflection */}
        <div className="bg-blue-100 p-4 rounded-md border-l-4 border-blue-600">
          <h2 className="font-semibold text-blue-700">🌟 Reflect</h2>
          <p className="text-gray-700 mt-2">
            Consider this: How do the colors in nature remind you of God's
            creativity and love? How can you let His brilliance shine through
            your life?
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            🎮 Activity: Select the Primary Colors
          </h2>
          <p className="text-gray-600">
            Choose all the colors that are considered primary in the color
            spectrum.
          </p>

          <h3 className="text-lg font-medium mt-4">
            Which of the following are primary colors?
          </h3>

          <div className="flex flex-wrap gap-4 mt-4">
            {colorOptions.map((color) => (
              <div
                key={color.id}
                onClick={() => toggleColorSelection(color.name)}
                className={`px-4 py-2 text-white rounded-md cursor-pointer ${
                  selectedColors.includes(color.name)
                    ? colorBgMapping[color.name] // Use full intensity when selected
                    : "bg-slate-600"
                }`}
              >
                {color.name}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit Answer
          </button>

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
                ? "✅ Correct! You have selected all the primary colors!"
                : "❌ Incorrect. Please select the correct primary colors."}
            </div>
          )}
        </div>

        {/* My Moment with God */}
        <div className="bg-yellow-100 p-4 rounded-md border-l-4 border-yellow-600">
          <h2 className="font-semibold text-yellow-700">
            🙏 My Moment with God
          </h2>
          <p className="text-gray-700 mt-2">
            "Heavenly Father, thank You for filling our world with vibrant
            colors that reveal Your creativity and love. Help me see Your beauty
            in every hue and to share Your light with others. Amen."
          </p>
        </div>

        {/* Remember Section */}
        <div className="text-center text-gray-700 font-medium mt-6">
          🌿{" "}
          <em>
            Remember: God's creation is a masterpiece, painted with love and
            care.
          </em>
        </div>
      </div>
    </>
  );
}
