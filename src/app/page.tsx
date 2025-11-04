export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-500 mb-4">
            Turning Point Consulting
          </h1>
          <p className="text-xl text-gray-600">
            Professional consulting services for your business needs
          </p>
        </header>
        
        <section className="text-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-primary-600 mb-4">
              Welcome to Your New Website
            </h2>
            <p className="text-gray-700 mb-6">
              This is the foundation of your Next.js 14 application with TypeScript, 
              Tailwind CSS, and Payload CMS. The basic structure is now in place.
            </p>
            <div className="bg-secondary-500 text-white p-4 rounded">
              <p className="font-medium">
                🚀 Your project is ready for development!
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
