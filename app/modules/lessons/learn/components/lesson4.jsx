"use client";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export default function Lesson4() {
  const [selectAnswer, setSelectAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const handleCheck = () => {
    if (selectAnswer === "Light") {
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
        <h1 className="text-2xl font-bold">Lesson 4: First day of creation</h1>

        {/* Categories */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-600">Category:</span>
          <Badge variant="secondary">Introduction</Badge>
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
            <strong>
              “And God said, "Let there be the light" and there was light”
            </strong>{" "}
            (Genesis 1:31, NIV)
          </p>
        </div>

        {/* Objectives */}
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="font-semibold text-gray-800">🎯 Lesson Objectives</h2>
          <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
            <li>Tell the first creation of God.</li>
            <li>Give importance to ligth.</li>
            <li>Appreciate God's love through His creations.</li>
          </ul>
        </div>

        {/* Lesson Content */}
        <div className="text-gray-700 space-y-3">
          <h2 className="font-semibold text-lg">
            The First Creation of God: Light
          </h2>
          <p>
            Have you ever wondered what the very first thing God created was?
            Before the mountains, the oceans, and even the sun and moon, the
            Bible tells us that God created something essential—light.
          </p>
          <p>
            In Genesis 1:3, it says,{" "}
            <strong>
              “And God said, "Let there be light," and there was light.
            </strong>
            "
          </p>
          <p>
            Before this moment, the world was completely dark and formless. But
            with just His words, God brought light into existence. This light
            was not from the sun, moon, or stars—those were created later.
            Instead, it was a special light that came directly from God Himself,
            showing His power over darkness.
          </p>
        </div>

        {/* Reflection */}
        <div className="bg-blue-100 p-4 rounded-md border-l-4 border-blue-600">
          <h2 className="font-semibold text-blue-700">🌟 Reflect</h2>
          <p className="text-gray-700 mt-2">
            Think about this: If God’s first creation was light, what does that
            tell us about His nature? How can we reflect His light in our own
            lives?
          </p>
        </div>

        {/* Activity */}
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            🎮 Activity: God's Creation
          </h2>
          <p className="text-gray-600">Select the first creation of God.</p>

          <h3 className=" text-lg font-medium mt-4">
            What is the first creation of God?
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
                ? "✅ Correct! You know what God first creation!"
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
            "Dear Lord. Thank you for the good light. please guide me as i study
            my lesson today.Bless me and forgive me from all my sins.In jesus
            name i pray, amen."
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
