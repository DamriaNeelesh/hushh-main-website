import { redirect } from 'next/navigation';

export default function InvestorMatchLanding() {
  // Directly redirect to discover, AuthGate will handle login requirement
  redirect('/investor-match/discover');
}
