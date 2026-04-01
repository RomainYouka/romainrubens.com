export default function GooglePlayOnIOSPage() {
  return (
    <div className="w-screen min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-5xl font-bold mb-6">Google Play on iOS in the EU</h1>
        <p className="text-lg text-gray-600 mb-8">
          A comprehensive case study on App Store alternative distribution for iOS in European Union markets.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-8 text-left">
          <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
          <p className="text-gray-700 mb-4">
            This project explores the DMA requirements for alternative app distribution on iOS in the EU, 
            including design guidelines for app marketplaces and developer documentation.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Key Features</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Alternative app marketplace guidelines</li>
            <li>iPhone safe zone documentation</li>
            <li>Web distribution API documentation</li>
            <li>Developer onboarding flows</li>
          </ul>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Design assets and interactive components are being optimized for Next.js compatibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
