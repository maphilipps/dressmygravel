export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-8 text-center">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
            DressMyGravel
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Get personalized gravel cycling clothing recommendations based on
            current weather conditions. Perfect gear for every ride.
          </p>
          <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-xl dark:bg-slate-800">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
              Coming Soon
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Weather-based clothing recommendations for gravel cyclists
            </p>
            <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                🚧 Next.js 14 project successfully initialized!
                <br />
                📦 Ready for Shadcn/ui and feature development
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
