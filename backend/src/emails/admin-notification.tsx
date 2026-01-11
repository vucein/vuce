import * as React from 'react';

interface ContactFormData {
  fullName: string;
  email: string;
  linkedin?: string;
  github?: string;
  country: string;
  phone: string;
  phonePrefix: string;
  projectGoal: string;
  blocker: string;
  vision?: string;
  timeline: string;
  engagementScale: string;
  origin: string;
}

/**
 * Email template sent to admin/business owner when a new contact form is submitted
 */
export const AdminNotificationEmail: React.FC<Readonly<ContactFormData>> = ({
  fullName,
  email,
  linkedin,
  github,
  country,
  phone,
  phonePrefix,
  projectGoal,
  blocker,
  vision,
  timeline,
  engagementScale,
  origin,
}) => (
  <div style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', lineHeight: '1.6', color: '#ededed', backgroundColor: '#000000', margin: '0', padding: '0', width: '100%' }}>
    <table width="100%" border={0} cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#000000' }}>
      <tr>
        <td align="center" style={{ padding: '40px 20px' }}>
          <div style={{ maxWidth: '700px', width: '100%', margin: '0 auto', textAlign: 'left' }}>

            {/* Header */}
            <div style={{ borderBottom: '1px solid #333333', paddingBottom: '24px', marginBottom: '32px' }}>
              <h1 style={{ color: '#ffffff', margin: '0', fontSize: '24px', letterSpacing: '-0.5px', fontWeight: '700' }}>
                New Submission
              </h1>
              <p style={{ color: '#525252', fontSize: '14px', margin: '8px 0 0 0' }}>
                {new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
              </p>
            </div>

            {/* Quick Actions Card */}
            <div style={{ backgroundColor: '#111111', padding: '20px', borderRadius: '8px', marginBottom: '40px', border: '1px solid #333333' }}>
              <table width="100%" border={0} cellPadding="0" cellSpacing="0">
                <tr>
                  <td>
                    <p style={{ margin: '0', fontSize: '14px', color: '#a1a1aa' }}>
                      <strong>From:</strong> {fullName}
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#a1a1aa' }}>
                      <strong>Goal:</strong> {projectGoal}
                    </p>
                  </td>
                  <td align="right" style={{ verticalAlign: 'middle' }}>
                    <a href={`mailto:${email}?subject=Re: Your Project Inquiry - ${projectGoal}`} style={{ backgroundColor: '#ffffff', color: '#000000', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none', fontSize: '13px', fontWeight: '600', display: 'inline-block' }}>Reply Now</a>
                  </td>
                </tr>
              </table>
            </div>

            {/* Contact Info Section */}
            <h2 style={{ color: '#ffffff', fontSize: '18px', marginTop: '0', marginBottom: '20px', letterSpacing: '-0.5px' }}>
              Contact Profile
            </h2>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#6d6d6d', fontSize: '14px', width: '30%' }}>Name</td>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#ededed', fontSize: '15px' }}>{fullName}</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#6d6d6d', fontSize: '14px' }}>Email</td>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#ededed', fontSize: '15px' }}>
                    <a href={`mailto:${email}`} style={{ color: '#ededed', textDecoration: 'underline' }}>{email}</a>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#6d6d6d', fontSize: '14px' }}>Phone</td>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#ededed', fontSize: '15px' }}>
                    <a href={`tel:${phonePrefix}${phone}`} style={{ color: '#ededed', textDecoration: 'none' }}>{phonePrefix} {phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#6d6d6d', fontSize: '14px' }}>Country</td>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#ededed', fontSize: '15px' }}>{country}</td>
                </tr>
                {linkedin && (
                  <tr>
                    <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#6d6d6d', fontSize: '14px' }}>LinkedIn</td>
                    <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#ededed', fontSize: '15px' }}>
                      <a href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: '#888888', textDecoration: 'underline' }}>View Profile</a>
                    </td>
                  </tr>
                )}
                {github && (
                  <tr>
                    <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#6d6d6d', fontSize: '14px' }}>GitHub</td>
                    <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#ededed', fontSize: '15px' }}>
                      <a href={github.startsWith('http') ? github : `https://${github}`} target="_blank" rel="noopener noreferrer" style={{ color: '#888888', textDecoration: 'underline' }}>View Profile</a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Project Details Section */}
            <h2 style={{ color: '#ffffff', fontSize: '18px', marginTop: '0', marginBottom: '20px', letterSpacing: '-0.5px' }}>
              Project Intelligence
            </h2>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#6d6d6d', fontSize: '14px', width: '30%', verticalAlign: 'top' }}>Goal</td>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#ffffff', fontSize: '15px', lineHeight: '1.5' }}><strong>{projectGoal}</strong></td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#6d6d6d', fontSize: '14px', verticalAlign: 'top' }}>Blocker</td>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#ededed', fontSize: '15px', lineHeight: '1.5' }}>{blocker}</td>
                </tr>
                {vision && (
                  <tr>
                    <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#6d6d6d', fontSize: '14px', verticalAlign: 'top' }}>Vision</td>
                    <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#ededed', fontSize: '15px', lineHeight: '1.5' }}>{vision}</td>
                  </tr>
                )}
                <tr>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#6d6d6d', fontSize: '14px' }}>Timeline</td>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#ededed', fontSize: '15px' }}>{timeline}</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#6d6d6d', fontSize: '14px' }}>Scale</td>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#ededed', fontSize: '15px' }}>{engagementScale}</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#6d6d6d', fontSize: '14px' }}>Origin</td>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #222222', color: '#ededed', fontSize: '15px' }}>{origin}</td>
                </tr>
              </tbody>
            </table>

            {/* Footer */}
            <div style={{ paddingTop: '30px', textAlign: 'center' }}>
              <p style={{ color: '#404040', fontSize: '11px', margin: '0' }}>
                Secure Message via Vuce Studio
              </p>
            </div>

          </div>
        </td>
      </tr>
    </table>
  </div>
);

export default AdminNotificationEmail;
