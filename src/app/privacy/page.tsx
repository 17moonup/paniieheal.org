import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function Privacy() {
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
        Privacy Policy – Paniieheal Truth Store
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
          1. Information We Collect Through Google OAuth
        </h2>
        <p style={{ marginBottom: '16px' }}>
          We use <strong>Google OAuth</strong> as our sole authentication method. When you log in with Google, we collect:
        </p>
        <ul style={{
          listStyle: 'disc',
          paddingLeft: '24px',
          marginBottom: '16px'
        }}>
          <li><strong>Basic profile information:</strong> Your name, email address, and profile picture</li>
          <li><strong>Google Account ID:</strong> A unique identifier for your Google account</li>
          <li><strong>Authentication tokens:</strong> Temporary tokens to verify your identity</li>
        </ul>
        <p style={{
          fontWeight: '600',
          marginBottom: '16px',
          color: '#dc2626'
        }}>
          We never access or collect:
        </p>
        <ul style={{
          listStyle: 'disc',
          paddingLeft: '24px',
          marginBottom: '16px'
        }}>
          <li>Your Google account password</li>
          <li>Your Gmail messages or contacts</li>
          <li>Your Google Drive files</li>
          <li>Your Google Calendar events</li>
          <li>Any other Google services data</li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#1a1a1a'
        }}>
          2. How We Use Your Information
        </h2>
        <div style={{
          overflowX: 'auto',
          marginBottom: '16px'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: '1px solid #e5e7eb'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6' }}>
                <th style={{
                  padding: '12px 16px',
                  border: '1px solid #e5e7eb',
                  textAlign: 'left',
                  fontWeight: '600'
                }}>
                  Purpose
                </th>
                <th style={{
                  padding: '12px 16px',
                  border: '1px solid #e5e7eb',
                  textAlign: 'left',
                  fontWeight: '600'
                }}>
                  Legal Basis
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{
                  padding: '12px 16px',
                  border: '1px solid #e5e7eb'
                }}>
                  Account creation and authentication
                </td>
                <td style={{
                  padding: '12px 16px',
                  border: '1px solid #e5e7eb'
                }}>
                  Contractual necessity
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px 16px',
                  border: '1px solid #e5e7eb'
                }}>
                  Link your Google Calendar to Schedule Page
                </td>
                <td style={{
                  padding: '12px 16px',
                  border: '1px solid #e5e7eb'
                }}>
                  Legitimate interest
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px 16px',
                  border: '1px solid #e5e7eb'
                }}>
                  Security and fraud prevention
                </td>
                <td style={{
                  padding: '12px 16px',
                  border: '1px solid #e5e7eb'
                }}>
                  Legitimate interest
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px 16px',
                  border: '1px solid #e5e7eb'
                }}>
                  Compliance with legal obligations
                </td>
                <td style={{
                  padding: '12px 16px',
                  border: '1px solid #e5e7eb'
                }}>
                  Legal obligation
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#1a1a1a'
        }}>
          3. Data Sharing and Disclosure
        </h2>
        <p style={{ marginBottom: '16px' }}>
          We are committed to protecting your privacy. We do not sell, rent, or trade your personal information to third parties.
        </p>
        <ul style={{
          listStyle: 'disc',
          paddingLeft: '24px',
          marginBottom: '16px'
        }}>
          <li>
            <strong>Google:</strong> We share minimal data with Google as required for OAuth authentication
          </li>
          <li>
            <strong>Service Providers:</strong> We may share data with trusted service providers who help us operate our website
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights
          </li>
        </ul>
        <p style={{
          fontWeight: '600',
          color: '#059669'
        }}>
          We never share your data with advertisers or marketing companies.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#1a1a1a'
        }}>
          4. Your Rights and Choices
        </h2>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            marginBottom: '8px',
            color: '#1a1a1a'
          }}>
            Account Management:
          </h3>
          <ul style={{
            listStyle: 'disc',
            paddingLeft: '24px',
            marginBottom: '16px'
          }}>
            <li>
              <strong>Delete your account:</strong> Email us at{' '}
              <a 
                href="mailto:support@paniieheal.org"
                style={{
                  color: '#2563eb',
                  textDecoration: 'none'
                }}
              >
                support@paniieheal.org
              </a>
            </li>
            <li>
              <strong>Revoke Google access:</strong> Visit your{' '}
              <a 
                href="https://myaccount.google.com/permissions" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: '#2563eb',
                  textDecoration: 'none'
                }}
              >
                Google Account permissions
              </a>
            </li>
            <li>
              <strong>Update your information:</strong> Changes to your Google profile will be reflected in our system
            </li>
          </ul>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            marginBottom: '8px',
            color: '#1a1a1a'
          }}>
            Your Data Rights (GDPR/CCPA):
          </h3>
          <ul style={{
            listStyle: 'disc',
            paddingLeft: '24px'
          }}>
            <li>Right to access your personal data</li>
            <li>Right to rectify inaccurate data</li>
            <li>Right to erase your data</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#1a1a1a'
        }}>
          5. Data Security
        </h2>
        <p style={{ marginBottom: '16px' }}>
          We implement appropriate security measures to protect your personal information:
        </p>
        <ul style={{
          listStyle: 'disc',
          paddingLeft: '24px'
        }}>
          <li>HTTPS encryption for all data transmission</li>
          <li>Secure storage of authentication tokens</li>
          <li>Regular security audits and updates</li>
          <li>Compliance with Google security requirements</li>
          <li>Limited access to personal data on a need-to-know basis</li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#1a1a1a'
        }}>
          6. Data Retention
        </h2>
        <p>
          We retain your personal information only as long as necessary to provide our services and comply with legal obligations. 
          When you delete your account, we will permanently delete your personal data within 30 days, except where we are required 
          to retain it for legal or regulatory purposes.
        </p>
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
          For questions about this Privacy Policy or your personal data, please contact us at:{' '}
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
          <strong>Full Policy:</strong>{' '}
          <Link href="/full-privacy-policy" style={{
            color: '#2563eb',
            textDecoration: 'none'
          }}>
            Link to detailed version
          </Link>
        </p>
      </div>
    </div>
  );
}