import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
const lesson = {
  title: "UI Design Fundamentals & Best Practice",
  thumbnail: "/module.png",
  categories: ["Fundamental", "Design", "Not Urgent"],
  duration: "1 hour",
  description: `Unlock the secrets to crafting compelling and user-centric digital experiences 
  with our "UI Design Fundamentals & Best Practices" course. Whether you're a beginner eager 
  to dive into UI design or a seasoned professional, this course provides a comprehensive 
  journey through the core principles and industry best practices.`,
  instructions: [
    "There are 10 questions in this quiz.",
    "Each question will present a brief description of UI Design Fundamentals & Best Practice.",
    "Choose the answer that you believe best matches the description.",
    "You have 1 minute to answer each question.",
    "I hope this helps! If you have any more questions or need further assistance, feel free to ask.",
  ],
};

export default function Template() {
  return (
    <div className="space-y-4">
      {/* Lesson Thumbnail */}
      <img
        src={lesson.thumbnail}
        alt="Lesson Thumbnail"
        className="w-full h-52 object-cover rounded-lg"
      />

      {/* Lesson Title */}
      <h1 className="text-2xl font-bold">{lesson.title}</h1>

      {/* Categories */}
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-600">Category</span>
        {lesson.categories.map((category, index) => (
          <Badge key={index} variant="secondary">
            {category}
          </Badge>
        ))}
      </div>

      {/* Estimated Duration */}
      <div className="flex items-center gap-2 text-gray-600">
        <Clock size={16} />
        <span>Estimate duration</span>
        <span className="font-medium">{lesson.duration}</span>
      </div>

      {/* Lesson Description */}
      <p className="text-gray-700 leading-relaxed">{lesson.description}</p>

      {/* Instructions */}
      <div>
        <h2 className="text-lg font-semibold">Instructions:</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {lesson.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
