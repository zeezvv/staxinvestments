const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const resendApiKey = Deno.env.get('RESEND_API_KEY')
  if (!resendApiKey) {
    return new Response(JSON.stringify({ error: 'Missing RESEND_API_KEY' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const { fullName, email, phone, propertyAddress, message } = body

  if (!fullName || !email || !phone || !propertyAddress) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const htmlContent = `
    <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 520px; padding: 24px 28px;">
      <h1 style="font-size: 22px; font-weight: 700; color: #1a2b1a; margin: 0 0 16px;">New Lead Submitted</h1>
      <p style="font-size: 14px; color: #55575d; line-height: 1.6; margin: 0 0 20px;">
        A new lead just came in through your website. Here are the details:
      </p>
      <div style="background-color: #f8f6f2; border-radius: 12px; padding: 20px 24px; margin: 0 0 20px;">
        <p style="font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 2px;">Full Name</p>
        <p style="font-size: 15px; color: #1a2b1a; margin: 0 0 12px; line-height: 1.4;">${fullName}</p>
        <p style="font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 2px;">Email</p>
        <p style="font-size: 15px; color: #1a2b1a; margin: 0 0 12px; line-height: 1.4;">${email}</p>
        <p style="font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 2px;">Phone</p>
        <p style="font-size: 15px; color: #1a2b1a; margin: 0 0 12px; line-height: 1.4;">${phone}</p>
        <p style="font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 2px;">Property Address</p>
        <p style="font-size: 15px; color: #1a2b1a; margin: 0 0 4px; line-height: 1.4;">${propertyAddress}</p>
        ${message ? `
          <p style="font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin: 12px 0 2px;">Additional Details</p>
          <p style="font-size: 15px; color: #1a2b1a; margin: 0 0 4px; line-height: 1.4;">${message}</p>
        ` : ''}
      </div>
      <hr style="border-color: #e8e4dc; margin: 20px 0;" />
      <p style="font-size: 12px; color: #999; margin: 0;">
        This is an automated notification from Stax Investments. The lead has also been saved to your database.
      </p>
    </div>
  `

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Stax Investments <leads@staxhomebuyers.com>',
        to: ['lutsiv42@gmail.com', 'staxxentine@gmail.com'],
        subject: `New Lead: ${fullName} — ${propertyAddress}`,
        html: htmlContent,
      }),
    })

    const result = await res.json()

    if (!res.ok) {
      console.error('Resend API error:', result)
      return new Response(JSON.stringify({ error: 'Failed to send email', details: result }), {
        status: res.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, id: result.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Email send error:', err)
    return new Response(JSON.stringify({ error: 'Internal error sending email' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
