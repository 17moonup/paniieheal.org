import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};
export default function Privacy() {
  return (
    <div className="legal-document max-w-4xl mx-auto p-6">
        <title>Privacy Policy - Paniieheal Truth Store</title>

      <h1 className="text-3xl font-bold mb-6">Privacy Policy – Paniieheal Truth Store</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Data Collected for Login</h2>
        <p className="mb-4">
          We use <strong>OAuth APIs</strong> (Google/GitHub/Twitter/Apple) to authenticate you. Each platform shares:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Basic profile info</strong> (name, email, profile picture)</li>
          <li><strong>Account identifiers</strong> (e.g., Twitter username, GitHub ID)</li>
        </ul>
        <p className="font-semibold">We never access:</p>
        <ul className="list-disc pl-6">
          <li>Passwords</li>
          <li>Private posts/messages</li>
          <li>Payment details</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Data</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b border-gray-200 text-left">Purpose</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Legal Basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b border-gray-200">Account creation & login</td>
                <td className="py-2 px-4 border-b border-gray-200">Contractual necessity</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-200">Security/anti-fraud</td>
                <td className="py-2 px-4 border-b border-gray-200">Legitimate interest</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-200">Compliance with laws</td>
                <td className="py-2 px-4 border-b border-gray-200">Legal obligation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Data Sharing</h2>
        <ul className="list-disc pl-6">
          <li>
            <strong>Third-party APIs:</strong> Only for authentication (per their policies)
          </li>
          <li>
            <strong>No selling/sharing</strong> with advertisers
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Delete account/data:</strong> Email{" "}
            <a href="mailto:support@paniiehealtruthstore.com" className="text-blue-600 hover:underline">
              support@paniiehealtruthstore.com
            </a>
          </li>
          <li>
            <strong>Revoke access:</strong> Via{" "}
            <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Google
            </a>{" "}
            /{" "}
            <a href="https://github.com/settings/applications" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              GitHub
            </a>{" "}
            /{" "}
            <a href="https://twitter.com/settings/applications" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Twitter
            </a>{" "}
            /{" "}
            <a href="https://appleid.apple.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Apple
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Security</h2>
        <ul className="list-disc pl-6">
          <li>Encryption (HTTPS)</li>
          <li>Regular API compliance audits</li>
        </ul>
      </section>

      <div className="mt-8 pt-4 border-t border-gray-200">
        <p>
          <strong>Full Policy:</strong> <Link href="/full-privacy-policy" className="text-blue-600 hover:underline">Link to detailed version</Link>
        </p>
      </div>
    </div>
  );
};
