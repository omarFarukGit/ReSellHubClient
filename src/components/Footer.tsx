"use client";

import Link from "next/link";
import { BiEnvelope } from "react-icons/bi";
import { BsFillSendFill } from "react-icons/bs";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // toast.success("Message sent successfully!");
  };

  return (
    <footer className="bg-slate-50 border-t">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              <span className="text-[#F97316]">ReSell</span>Hub
            </h2>

            <p className="mt-4 text-sm text-slate-600 leading-6">
              Resell Hub is a trusted marketplace where users can buy and sell
              quality second-hand products easily, securely, and at affordable
              prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Quick Links</h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 hover:text-blue-600"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 hover:text-blue-600"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/team"
                  className="text-slate-600 hover:text-blue-600"
                >
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Contact Info</h3>

            <div className="space-y-2 text-sm text-slate-600">
              <p>Dhaka, Bangladesh</p>
              <p>support@studynook.com</p>
              <p>+880 1700-000000</p>
            </div>

            {/* Social */}
            <div className="flex gap-4 mt-5">
              <a
                href="#"
                className="text-xl hover:scale-110 transition-transform"
              >
                <FaFacebookF className="text-[#1877F2]" />
              </a>

              <a
                href="#"
                className="text-xl hover:scale-110 transition-transform"
              >
                <RiTwitterXLine />
              </a>

              <a
                href="#"
                className="text-xl hover:scale-110 transition-transform"
              >
                <FaLinkedin className="text-[#0A66C2]" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <textarea
                placeholder="Write your message..."
                className="w-full h-24 rounded-lg border p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="relative">
                <BiEnvelope className="absolute left-3 top-3 text-slate-500" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-[#FF6F00] px-4 py-2 text-white hover:bg-[#E65C00] transition"
              >
                <BsFillSendFill />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2026 ReSellHub. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-blue-600">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-blue-600">
              Terms of Service
            </Link>

            <Link href="/cookies" className="hover:text-blue-600">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
