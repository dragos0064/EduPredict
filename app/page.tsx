import Link from "next/link"
import { GraduationCap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-green-800 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8" />
            <h1 className="text-2xl font-bold">EduPredict</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-green-200 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-green-200 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/students" className="hover:text-green-200 transition-colors">
                  Students
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 bg-gradient-to-b from-green-50 to-white">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-5xl font-bold text-green-800 mb-6 animate-fadeIn">Predict Student Success</h1>
            <p className="text-xl text-brown-700 max-w-3xl mx-auto mb-10 animate-slideUp">
              Use advanced machine learning to identify at-risk students and take proactive measures to ensure their
              academic success.
            </p>
            <div className="flex justify-center space-x-4 animate-fadeIn animation-delay-300">
              <Link
                href="/dashboard"
                className="px-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors shadow-lg"
              >
                View Dashboard
              </Link>
              <Link
                href="/students/new"
                className="px-8 py-3 bg-brown-600 text-white rounded-lg hover:bg-brown-700 transition-colors shadow-lg"
              >
                Add New Student
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-fadeIn">
                <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                  1
                </div>
                <h3 className="text-xl font-semibold text-brown-800 mb-3 text-center">Data Collection</h3>
                <p className="text-brown-600">
                  Gather comprehensive student data including grades, attendance, and behavioral metrics.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-fadeIn animation-delay-150">
                <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                  2
                </div>
                <h3 className="text-xl font-semibold text-brown-800 mb-3 text-center">AI Analysis</h3>
                <p className="text-brown-600">
                  Our machine learning model analyzes patterns and predicts academic outcomes with high accuracy.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-fadeIn animation-delay-300">
                <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                  3
                </div>
                <h3 className="text-xl font-semibold text-brown-800 mb-3 text-center">Actionable Insights</h3>
                <p className="text-brown-600">
                  Receive clear recommendations to help at-risk students improve their performance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-brown-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2025 EduPredict. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/about" className="hover:text-green-200 transition-colors">
                About
              </Link>
              <Link href="/privacy" className="hover:text-green-200 transition-colors">
                Privacy
              </Link>
              <Link href="/contact" className="hover:text-green-200 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
