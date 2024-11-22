export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      <p className="text-gray-900 text-xl font-semibold mt-4">Loading...</p>
    </div>
  );
}
