import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use',
};

export default function Terms() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      lineHeight: '1.6',
      color: '#333'
    }}>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '24px',
        color: '#1a1a1a'
      }}>
        Terms of Use – Paniieheal Truth Store
      </h1>
      
      <p style={{
        fontSize: '0.875rem',
        color: '#666',
        marginBottom: '32px'
      }}>
        Last Updated: {new Date().toLocaleDateString()}
      </p>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#1a1a1a'
        }}>
          1. Acceptance of Terms
        </h2>
        <p>
          By using <strong>Paniieheal Truth Store</strong> (the "Site"), you agree to these Terms of Use ("Terms") and our{' '}
          <Link href="/privacy-policy" style={{
            color: '#2563eb',
            textDecoration: 'none'
          }}>
            Privacy Policy
          </Link>
          . If you disagree, do not use the Site.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#1a1a1a'
        }}>
          2. Account Registration
        </h2>
        <p style={{ marginBottom: '16px' }}>
          <strong>Login Method:</strong> You may sign up via Google OAuth only.
        </p>
        <p style={{ marginBottom: '16px' }}>
          By using Google OAuth to access our service, you must comply with Google's terms of service:
        </p>
        <ul style={{
          listStyle: 'disc',
          paddingLeft: '24px',
          marginBottom: '16px'
        }}>
          <li>
            <a 
              href="https://developers.google.com/terms" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: '#2563eb',
                textDecoration: 'none'
              }}
            >
              Google API Terms of Service
            </a>
          </li>
          <li>
            <a 
              href="https://policies.google.com/terms" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: '#2563eb',
                textDecoration: 'none'
              }}
            >
              Google Terms of Service
            </a>
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#1a1a1a'
        }}>
          3. Google OAuth Integration
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Our service uses Google OAuth for authentication. By logging in with Google, you authorize us to:
        </p>
        <ul style={{
          listStyle: 'disc',
          paddingLeft: '24px',
          marginBottom: '16px'
        }}>
          <li>Access your basic Google profile information (name, email, profile picture)</li>
          <li>Verify your identity through Google's authentication system</li>
          <li>Create and maintain your account on our platform</li>
        </ul>
        <p>
          We do not access any other Google services or data beyond what is necessary for authentication.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#1a1a1a'
        }}>
          4. Prohibited Conduct
        </h2>
        <p style={{ marginBottom: '16px' }}>You may not:</p>
        <ul style={{
          listStyle: 'disc',
          paddingLeft: '24px'
        }}>
          <li>Use the Site for illegal activities</li>
          <li>Impersonate others or create fake accounts</li>
          <li>Bypass Google OAuth security measures</li>
          <li>Attempt to access accounts that do not belong to you</li>
          <li>Abuse or misuse the Google login integration</li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#1a1a1a'
        }}>
          5. Account Termination
        </h2>
        <p>
          We may suspend or terminate accounts that violate these Terms or Google's policies. 
          You may also revoke access to your Google account at any time through your Google Account settings.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#1a1a1a'
        }}>
          6. Limitation of Liability
        </h2>
        <p style={{ marginBottom: '16px' }}>We are not responsible for:</p>
        <ul style={{
          listStyle: 'disc',
          paddingLeft: '24px'
        }}>
          <li>Google OAuth service outages or authentication failures</li>
          <li>Changes to Google's authentication policies</li>
          <li>Issues arising from your Google account settings or restrictions</li>
          <li>User-generated content</li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#1a1a1a'
        }}>
          7. Contact Information
        </h2>
        <p>
          For questions about these Terms, please contact us at:{' '}
          <a 
            href="mailto:support@paniieheal.org"
            style={{
              color: '#2563eb',
              textDecoration: 'none'
            }}
          >
            support@paniieheal.org
          </a>
        </p>
      </section>

      <div style={{
        marginTop: '32px',
        paddingTop: '16px',
        borderTop: '1px solid #e5e7eb'
      }}>
        <p>
          <strong>Full Terms:</strong>{' '}
          <Link href="/full-terms" style={{
            color: '#2563eb',
            textDecoration: 'none'
          }}>
            Link to extended document
          </Link>
        </p>
      </div>
    </div>
  );
}