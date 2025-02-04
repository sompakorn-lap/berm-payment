import { createFileRoute } from '@tanstack/react-router'
import { CheckOutForm } from '../../libs/stripe/StripeProvider'

export const Route = createFileRoute('/payment/')({
  component: CheckOutForm,
})
