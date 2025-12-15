import { HashLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center ">
        <HashLoader color="#2563eb" size={60} />
        <p className="text-gray-600 mt-6">Loading...</p>
      </div>
    </div>
  );
}
