import { NextResponse } from "next/server"
import { Cashfree } from "cashfree-sdk"

const cashfree = new Cashfree({
  env: "PROD", // Use 'PROD' for production
  appId: process.env.CASHFREE_APP_ID!,
  secretKey: process.env.CASHFREE_SECRET_KEY!,
})

export async function POST(request: Request) {
  const body = await request.json()
  const { orderId, orderAmount, orderCurrency, customerEmail, customerPhone, customerName } = body

  try {
    const paymentLink = await cashfree.paymentLink.create({
      linkId: orderId,
      linkAmount: orderAmount,
      linkCurrency: orderCurrency,
      linkPurpose: "Holi 2025 Event Pass",
      customerDetails: {
        customerId: customerEmail,
        customerEmail,
        customerPhone,
        customerName,
      },
      linkNotify: {
        send: true,
        webhook: {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/cashfree-webhook`,
          method: "POST",
        },
      },
      linkMeta: {
        notifyUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/cashfree-webhook`,
        returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
      },
    })

    return NextResponse.json({ paymentLink: paymentLink.linkUrl })
  } catch (error) {
    console.error("Error creating payment link:", error)
    return NextResponse.json({ error: "Failed to create payment link" }, { status: 500 })
  }
}

