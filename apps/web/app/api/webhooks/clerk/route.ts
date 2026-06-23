import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { supabase } from '@/lib/supabaseClient'

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  try {
    // Get the raw request body for signature verification
    const body = await request.text()
    
    // Get the required headers for signature verification
    const svixId = request.headers.get('svix-id')
    const svixTimestamp = request.headers.get('svix-timestamp')
    const svixSignature = request.headers.get('svix-signature')

    // If any of the required headers are missing, return 400
    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json(
        { error: 'Missing required headers' },
        { status: 400 }
      )
    }

    // Verify the webhook signature
    const wh = new Webhook(webhookSecret!)
    let event: any

    try {
      event = wh.verify(body, {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      })
    } catch (err) {
      console.error('Webhook verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle the user.created event
    if (event.type === 'user.created') {
      const { id, email_addresses, first_name, last_name } = event.data

      // Get the primary email
      const primaryEmail = email_addresses?.find((email: any) => email.id === event.data.primary_email_address_id)?.email_address

      // Insert user into Supabase
      const { error } = await supabase
        .from('users')
        .insert({
          clerk_id: id,
          email: primaryEmail || '',
          first_name: first_name || '',
          last_name: last_name || '',
          role: 'coach',
        })

      if (error) {
        console.error('Error inserting user into Supabase:', error)
        return NextResponse.json(
          { error: 'Failed to create user record' },
          { status: 500 }
        )
      }

      console.log('User created successfully in Supabase:', id)
    }

    return NextResponse.json({ message: 'Webhook processed' }, { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}