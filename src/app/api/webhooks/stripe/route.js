import { NextResponse } from 'next/server'
 
export async function POST(req, res) {
  console.log('WEBHOOK: start');
  const event = req.body;

  if (event.type === 'payment_intent.succeeded') {
    console.log('WEBHOOK: payment_intent.succeeded');
  }

  console.log('WEBHOOK: end');
}