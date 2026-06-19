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
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* TOP GRID */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              <span className="text-orange-500">ReSell</span>Hub
            </h2>

            <p className="mt-4 text-sm text-slate-600 leading-6">
              A trusted marketplace where users buy and sell quality second-hand
              products safely and easily.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Quick Links</h3>

            <ul className="space-y-3 text-sm">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/team", label: "Our Team" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-600 hover:text-orange-500 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Contact Info</h3>

            <div className="space-y-2 text-sm text-slate-600">
              <p>📍 Dhaka, Bangladesh</p>
              <p>📧 support@resellhub.com</p>
              <p>📞 +880 1700-000000</p>
            </div>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-5">
              <a className="hover:scale-110 transition">
                <FaFacebookF className="text-[#1877F2]" />
              </a>

              <a className="hover:scale-110 transition">
                <RiTwitterXLine />
              </a>

              <a className="hover:scale-110 transition">
                <FaLinkedin className="text-[#0A66C2]" />
              </a>
            </div>
          </div>

          {/* MESSAGE BOX */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Send Message</h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <textarea
                placeholder="Write your message..."
                className="w-full h-24 rounded-xl border border-slate-200 p-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />

              <div className="relative">
                <BiEnvelope className="absolute left-3 top-3 text-slate-400" />

                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 transition"
              >
                <BsFillSendFill />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2026 ReSellHub. All rights reserved.</p>

          <div className="flex gap-6">
            <Link className="hover:text-orange-500 transition" href="/privacy">
              Privacy
            </Link>

            <Link className="hover:text-orange-500 transition" href="/terms">
              Terms
            </Link>

            <Link className="hover:text-orange-500 transition" href="/cookies">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
