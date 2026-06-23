import type { JSX } from "react"
import Image from "next/image"
import Link from "next/link"

export function Footer(): JSX.Element {
  return (
    <footer className="bg-[#1A1A1A] text-white border-t border-border/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="relative block h-14 w-[1.8rem] shrink-0">
                <Image
                  src="/rbihf-logo.png"
                  alt="RBIHF logo"
                  fill
                  sizes="29px"
                  className="object-contain object-center"
                />
              </span>
              <h3 className="text-lg font-semibold">RBIHF Development Hub</h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              The Royal Belgian Ice Hockey Federation platform for club-led development guidance, Talent Pool pathway communication, national-team updates, and parent-facing information.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/academy" className="text-white/60 hover:text-white transition-colors">
                  RBIHF Academy
                </Link>
              </li>
              <li>
                <Link href="/club-development" className="text-white/60 hover:text-white transition-colors">
                  Club Development
                </Link>
              </li>
              <li>
                <Link href="/talent-pool" className="text-white/60 hover:text-white transition-colors">
                  Talent Pool
                </Link>
              </li>
              <li>
                <Link href="/national-teams" className="text-white/60 hover:text-white transition-colors">
                  National Teams
                </Link>
              </li>
              <li>
                <Link href="/clubs" className="text-white/60 hover:text-white transition-colors">
                  Find a Club
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div id="contact" className="space-y-4 scroll-mt-24">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Email: office@rbihf.be</li>
              <li>Phone: +32 (0)3 547 01 42</li>
              <li>Eugeen Coolsstraat 2, bus 5</li>
              <li>3460 Bekkevoort, Belgium</li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal & Social</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li className="flex space-x-4 pt-2">
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/60">
              © 2026 RBIHF Development Hub. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-white/60 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-white/60 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="text-sm text-white/60 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}