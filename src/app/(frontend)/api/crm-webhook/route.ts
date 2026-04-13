import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const crmUrl = process.env.CRM_WEBHOOK_URL

    if (!crmUrl) {
      console.log('[CRM Webhook] No CRM_WEBHOOK_URL configured, skipping.')
      return NextResponse.json({ message: 'No CRM URL configured' }, { status: 200 })
    }

    const payload = {
      source: 'veteran-road-website',
      timestamp: new Date().toISOString(),
      ...data,
    }

    const response = await fetch(crmUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error('[CRM Webhook] Failed to forward:', response.status)
      return NextResponse.json({ error: 'CRM webhook failed' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[CRM Webhook] Error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
