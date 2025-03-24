import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function Lesson5() {
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
        <h1 className="text-2xl font-bold">
          Lesson 5: God Provision for Our Needs
        </h1>

        {/* Categories */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-600">Category:</span>
          <Badge variant="secondary">Provide</Badge>
        </div>

        {/* Estimated Duration */}
        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={16} />
          <span>Estimated Duration:</span>
          <span className="font-medium">4 Minutes</span>
        </div>

        {/* Bible Verse */}
        <div className="bg-green-100 p-4 rounded-md border-l-4 border-green-600">
          <h2 className="font-semibold text-green-700">📖 Memory Verse</h2>
          <p className="text-gray-700 mt-2">
            <strong>
              "And my God will meet all your needs according to the riches of
              his glory in Christ Jesus."
            </strong>
            (Philippians 4:19, NIV)
          </p>
        </div>

        {/* Objectives */}
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="font-semibold text-gray-800">🎯 Lesson Objectives</h2>
          <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
            <li>Recognize God as the source of all our needs.</li>
            <li>Understand the importance of trusting in His provisions.</li>
            <li> Show gratitude for God's care in our daily lives.</li>
          </ul>
        </div>

        {/* Lesson Content */}
        <div className="text-gray-700 space-y-3">
          <h2 className="font-semibold text-lg">🌍 God Provision for Life</h2>
          <p>God designed the world to sustain life. He provided:</p>
          <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
            <li>Light ☀️ to guide and sustain life.</li>
            <li>Water 💧 to refresh and nourish us.</li>
            <li> Food 🌾 to strengthen our bodies.</li>
            <li> Shelter 🏡 for safety and comfort.</li>
            <li> Love and Care ❤️ through family and relationships.</li>
          </ul>
          <p>
            Just as He provided these physical needs, He also gives us spiritual
            nourishment through His Word and presence.
          </p>
        </div>

        {/* Reflection */}
        <div className="bg-blue-100 p-4 rounded-md border-l-4 border-blue-600">
          <h2 className="font-semibold text-blue-700">🌟 Reflect</h2>
          <p className="text-gray-700 mt-2">
            Think about this: How has God provided for you today? How can we
            trust Him more in our daily needs?
          </p>
        </div>

        {/* My Moment with God */}
        <div className="bg-yellow-100 p-4 rounded-md border-l-4 border-yellow-600">
          <h2 className="font-semibold text-yellow-700">
            🙏 My Moment with God
          </h2>
          <p className="text-gray-700 mt-2">
            "Dear Lord, thank You for providing everything I need. Help me to
            trust You in all things and to always be grateful for Your love and
            care. Amen."
          </p>
        </div>

        {/* Remember Section */}
        <div className="text-center text-gray-700 font-medium mt-6">
          🌿{" "}
          <em>
            Remember: God created and provides for us because He loves us!
          </em>
        </div>
      </div>
    </>
  );
}
