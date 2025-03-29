import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use',
};

export default function Terms () {
  return (
    <div className="legal-document max-w-4xl mx-auto p-6">
        <title>Terms of Use - Paniieheal Truth Store</title>

      <h1 className="text-3xl font-bold mb-6">Terms of Use – Paniieheal Truth Store</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p>
         By using <strong>Paniieheal Truth Store</strong> (the 'Site'), you agree to these Terms of Use ('Terms') and our <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>. If you disagree, do not use the Site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Account Registration</h2>
        <p className="mb-4">
          <strong>Login Methods:</strong> You may sign up via:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Google</li>
          <li>GitHub</li>
          <li>Twitter (X)</li>
          <li>Apple</li>
        </ul>
        <p>
          You must comply with each platform's terms:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><a href="https://developers.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google API Terms</a></li>
          <li><a href="https://docs.github.com/en/site-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub Terms</a></li>
          <li><a href="https://developer.twitter.com/en/developer-terms/agreement" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Twitter Developer Agreement</a></li>
          <li><a href="https://developer.apple.com/terms/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Apple Terms</a></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Prohibited Conduct</h2>
        <p>You may not:</p>
        <ul className="list-disc pl-6">
          <li>Use the Site for illegal activities.</li>
          <li>Impersonate others or create fake accounts.</li>
          <li>Bypass API rate limits or misuse login integrations.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Termination</h2>
        <p>We may suspend accounts violating these Terms or third-party policies.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
        <p>We are not responsible for:</p>
        <ul className="list-disc pl-6">
          <li>Third-party API outages (e.g., Twitter/Google login failures).</li>
          <li>User-generated content.</li>
        </ul>
      </section>

      <div className="mt-8 pt-4 border-t border-gray-200">
        <p>
          <strong>Full Terms:</strong> <Link href="/full-terms" className="text-blue-600 hover:underline">Link to extended document</Link>
        </p>
      </div>
    </div>
  );
};
