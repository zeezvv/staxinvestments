import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Stax Investments"

interface LeadNotificationProps {
  fullName?: string
  email?: string
  phone?: string
  propertyAddress?: string
  message?: string
}

const LeadNotificationEmail = ({ fullName, email, phone, propertyAddress, message }: LeadNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New lead from {fullName || 'a visitor'} on {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Lead Submitted</Heading>
        <Text style={intro}>
          A new lead just came in through your website. Here are the details:
        </Text>

        <Section style={detailsBox}>
          <Text style={label}>Full Name</Text>
          <Text style={value}>{fullName || 'Not provided'}</Text>

          <Text style={label}>Email</Text>
          <Text style={value}>{email || 'Not provided'}</Text>

          <Text style={label}>Phone</Text>
          <Text style={value}>{phone || 'Not provided'}</Text>

          <Text style={label}>Property Address</Text>
          <Text style={value}>{propertyAddress || 'Not provided'}</Text>

          {message && (
            <>
              <Text style={label}>Additional Details</Text>
              <Text style={value}>{message}</Text>
            </>
          )}
        </Section>

        <Hr style={hr} />

        <Text style={footer}>
          This is an automated notification from {SITE_NAME}. The lead has also been saved to your database.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: LeadNotificationEmail,
  subject: (data: Record<string, any>) => `New Lead: ${data.fullName || 'Unknown'} — ${data.propertyAddress || 'No address'}`,
  displayName: 'Lead notification',
  to: 'lutsiv42@gmail.com',
  previewData: {
    fullName: 'John Smith',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    propertyAddress: '123 Main St, Columbus, OH',
    message: 'Looking to sell quickly, house needs some work.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'DM Sans', Arial, sans-serif" }
const container = { padding: '24px 28px', maxWidth: '520px' }
const h1 = { fontSize: '22px', fontWeight: '700' as const, color: '#1a2b1a', margin: '0 0 16px' }
const intro = { fontSize: '14px', color: '#55575d', lineHeight: '1.6', margin: '0 0 20px' }
const detailsBox = {
  backgroundColor: '#f8f6f2',
  borderRadius: '12px',
  padding: '20px 24px',
  margin: '0 0 20px',
}
const label = { fontSize: '11px', fontWeight: '600' as const, color: '#888', textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '12px 0 2px' }
const value = { fontSize: '15px', color: '#1a2b1a', margin: '0 0 4px', lineHeight: '1.4' }
const hr = { borderColor: '#e8e4dc', margin: '20px 0' }
const footer = { fontSize: '12px', color: '#999', margin: '0' }
