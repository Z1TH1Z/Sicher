import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Shield className="h-8 w-8 text-primary" />
              <span>Sicher Tech</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your trusted partner in advanced security solutions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#featured-products" className="text-muted-foreground hover:text-foreground">Cameras</Link></li>
              <li><Link href="/#featured-products" className="text-muted-foreground hover:text-foreground">Access Control</Link></li>
              <li><Link href="/#featured-products" className="text-muted-foreground hover:text-foreground">Alarm Systems</Link></li>
              <li><Link href="/#featured-products" className="text-muted-foreground hover:text-foreground">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/track-order" className="text-muted-foreground hover:text-foreground">Track Order</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">FAQs</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sicher Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
