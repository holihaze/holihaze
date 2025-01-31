import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function Payment() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-md mx-auto bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Complete Your Payment</CardTitle>
          <CardDescription>Secure payment gateway</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Please complete your payment to confirm your registration for Holi 2025.</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Pay Now</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

