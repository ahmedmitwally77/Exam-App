import { BookOpenCheck, Brain, RectangleEllipsis } from "lucide-react";
import LogoHeading from "../logo-heading";

const features = [
  {
    icon: Brain,
    title: "Tailored Diplomas",
    description:
      "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
  },
  {
    icon: BookOpenCheck,
    title: "Focused Exams",
    description:
      "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
  },
  {
    icon: RectangleEllipsis,
    title: "Smart Multi-Step Forms",
    description:
      "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
  },
];

export default function AuthAside() {
  return (
    <aside className="relative overflow-hidden py-12 lg:py-[7.2rem] min-h-screen px-4">
      <div className="max-w-md font-geistMono mx-auto mb-16 lg:mb-32">
        <LogoHeading />
      </div>

      <div className="flex flex-col max-w-[29rem] mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold text-black mb-8 lg:mb-14">
          Empower your learning journey with our smart exam platform.
        </h1>

        <div className="flex flex-col font-geistMono gap-6 lg:gap-9">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-4 lg:gap-5">
              <div className="flex-shrink-0 w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center border-[1.5px] border-blue-600">
                <feature.icon className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <div className="flex flex-col gap-1 lg:gap-2">
                <h3 className="text-lg lg:text-xl font-semibold text-blue-600">
                  {feature.title}
                </h3>
                <p className="text-base lg:text-lg text-gray-700">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-40 -z-10">
        <div className="absolute rounded-full top-[-3rem] right-[-5rem] w-[30rem] h-[30rem] bg-blue-400 blur-[140px]" />
        <div className="absolute rounded-full bottom-[-5rem] left-[-5rem] w-[30rem] h-[30rem] bg-blue-400 blur-[140px]" />
      </div>
    </aside>
  );
}
