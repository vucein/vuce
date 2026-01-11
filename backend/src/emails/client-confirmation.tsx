import * as React from 'react';

interface ClientConfirmationProps {
  fullName: string;
  projectGoal: string;
  timeline: string;
}

/**
 * Email template sent to clients after they submit the contact form
 */
export const ClientConfirmationEmail: React.FC<Readonly<ClientConfirmationProps>> = ({
  fullName,
  projectGoal,
  timeline,
}) => (
  <div style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', lineHeight: '1.6', color: '#ededed', backgroundColor: '#000000', margin: '0', padding: '0', width: '100%' }}>
    <table width="100%" border={0} cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#000000' }}>
      <tr>
        <td align="center" style={{ padding: '40px 20px' }}>
          <div style={{ maxWidth: '600px', width: '100%', margin: '0 auto', textAlign: 'left' }}>

            {/* Header / Logo */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <img
                src="https://vuce.in/logo.png"
                alt="Vuce"
                height="40"
                style={{ margin: '0 auto', display: 'block' }}
              />
            </div>

            {/* Main Content */}
            <div style={{ padding: '0px', backgroundColor: '#000000' }}>
              <h2 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '600', marginTop: '0', marginBottom: '24px', letterSpacing: '-0.5px' }}>
                Thank You, {fullName}.
              </h2>

              <p style={{ color: '#a1a1aa', fontSize: '16px', marginBottom: '32px', lineHeight: '1.6' }}>
                We've received your inquiry. Our team is already reviewing your vision and we're excited to see what we can build together.
              </p>

              {/* Details Card */}
              <div style={{ backgroundColor: '#0a0a0a', padding: '24px', borderRadius: '12px', marginBottom: '32px', border: '1px solid #333333' }}>
                <h3 style={{ color: '#ededed', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0', marginBottom: '16px', fontWeight: '600' }}>Project Snapshot</h3>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ color: '#525252', fontSize: '12px', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Goal</p>
                  <p style={{ color: '#ededed', margin: '0', fontSize: '15px' }}>{projectGoal}</p>
                </div>

                <div>
                  <p style={{ color: '#525252', fontSize: '12px', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Timeline</p>
                  <p style={{ color: '#ededed', margin: '0', fontSize: '15px' }}>{timeline}</p>
                </div>
              </div>

              <p style={{ color: '#a1a1aa', fontSize: '16px', marginBottom: '24px' }}>
                Our engineering leads will analyze your requirements and reach out within 24-48 hours with a preliminary roadmap.
              </p>

              <p style={{ color: '#a1a1aa', fontSize: '16px', marginBottom: '40px' }}>
                In the meantime, explore our recent work at <a href="https://vuce.in" style={{ color: '#ffffff', textDecoration: 'underline' }}>vuce.in</a>
              </p>

              {/* Footer */}
              <div style={{ paddingTop: '32px', borderTop: '1px solid #333333' }}>
                <p style={{ color: '#525252', fontSize: '14px', margin: '0' }}>
                  Best regards,<br />
                  <strong style={{ color: '#ededed' }}>The Vuce Team</strong>
                </p>
              </div>
            </div>

            {/* Copyright */}
            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <p style={{ color: '#404040', fontSize: '12px', margin: '0' }}>
                © {new Date().getFullYear()} Vuce. Building powerful digital experiences.
              </p>
            </div>

          </div>
        </td>
      </tr>
    </table>
  </div>
);

export default ClientConfirmationEmail;
