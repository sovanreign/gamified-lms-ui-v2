"use client";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export default function Lesson7() {
  const [selectAnswer, setSelectAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const handleCheck = () => {
    if (selectAnswer === "Sky") {
      setIsCorrect(true);
    }
  };
  const creations = [
    {
      id: 1,
      name: "Light",
    },
    {
      id: 2,
      name: "Sea",
    },
    {
      id: 3,
      name: "Land",
    },
    {
      id: 4,
      name: "Sky",
    },
  ];
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
        <h1 className="text-2xl font-bold">Lesson 7: Second day of creation</h1>

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
          <h2 className="font-semibold text-green-700">📖 My Memory Gem</h2>
          <p className="text-gray-700 mt-2">
            <strong>
              “The heavens declare the glory of God the skies proclaim the work
              of his hand”
            </strong>{" "}
            (Psalm 19:1)
          </p>
        </div>

        {/* Objectives */}
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="font-semibold text-gray-800">🎯 Lesson Objectives</h2>
          <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
            <li>Identify God's creation on the second day.</li>
            <li>Realize the beauty of God's creation on the second day.</li>
          </ul>
        </div>

        {/* Lesson Content */}
        <div className="text-gray-700 space-y-3">
          <h2 className="font-semibold text-lg">
            The Second Day of Creation: The Sky
          </h2>
          <p>
            Have you ever looked up at the sky and wondered how it came to be?
            The Bible tells us that on the second day of creation, God created
            the sky by separating the waters above from the waters below.
          </p>
          <p>
            In Genesis 1:6-8, it says,{" "}
            <strong>
              “And God said, ‘Let there be a vault between the waters to
              separate water from water.’ So God made the vault and separated
              the water under the vault from the water above it. And it was so.
              God called the vault ‘sky.’ And there was evening, and there was
              morning—the second day.”
            </strong>
          </p>
          <p>
            This moment reveals God's order and wisdom in shaping the world. The
            sky provides air for us to breathe, clouds that bring rain, and a
            beautiful view of the sun, moon, and stars. Every time we look up,
            we are reminded of God's greatness and His care for all creation.
          </p>
        </div>

        {/* Reflection */}
        <div className="bg-blue-100 p-4 rounded-md border-l-4 border-blue-600">
          <h2 className="font-semibold text-blue-700">🌟 Reflect</h2>
          <p className="text-gray-700 mt-2">
            Think about this: The sky is always above us, providing protection
            and beauty. How does this remind you of God's constant presence and
            care in your life? How can you appreciate and take care of His
            creation?
          </p>
        </div>

        {/* Activity */}
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            🎮 Activity: God's Creation
          </h2>
          <p className="text-gray-600">Select the creation of God.</p>

          <h3 className=" text-lg font-medium mt-4">
            What God create on the second day?
          </h3>

          <div className="flex flex-wrap gap-4 mt-4">
            {creations.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectAnswer(item.name)}
                className={`px-4 py-2 text-white rounded-md cursor-pointer ${
                  selectAnswer === item.name ? "bg-green-500" : "bg-blue-500"
                }`}
              >
                {item.name}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <Button
            className="mt-4 bg-green-600 text-white"
            onClick={() => {
              setShowResult(true);
              handleCheck();
            }}
          >
            Submit Answer
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
                ? "✅ Correct! You know what God create on the second day!"
                : "❌ incorrect. Try again!"}
            </div>
          )}
        </div>

        {/* My Moment with God */}
        <div className="bg-yellow-100 p-4 rounded-md border-l-4 border-yellow-600">
          <h2 className="font-semibold text-yellow-700">
            🙏 My Moment with God
          </h2>
          <p className="text-gray-700 mt-2">
            "Dear God. Thank you for making water and air. Thank you too for
            your love and care. In jesus name, I pray, Amen,"
          </p>
        </div>

        {/* Remember Section */}
        <div className="text-center text-gray-700 font-medium mt-6">
          🌿 <em>Remember: God created this world because He loves us.</em>
        </div>
      </div>
    </>
  );
}
