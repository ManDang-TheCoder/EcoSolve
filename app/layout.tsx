import { Metadata } from 'next';
import { ClientLayout } from './client-layout';

export const metadata: Metadata = {
  title: "Local Eco Solve",
  description: "A platform for reporting and tracking local environmental issues and creating sustainable solutions",
  keywords: ["environment", "sustainability", "community", "local", "eco", "solve"],
  authors: [{ name: "Local Eco Solve Team" }],
  creator: "Local Eco Solve",
  publisher: "Local Eco Solve",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
