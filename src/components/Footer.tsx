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
    <footer
      className="
        bg-white
        dark:bg-slate-950
        border-t
        border-slate-200
        dark:border-slate-800
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* TOP GRID */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              <span className="text-orange-500">ReSell</span>Hub
            </h2>

            <p
              className="
                mt-4
                text-sm
                leading-6
                text-slate-600
                dark:text-slate-400
              "
            >
              A trusted marketplace where users buy and sell quality second-hand
              products safely and easily.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3
              className="
                font-semibold
                mb-4
                text-slate-900
                dark:text-white
              "
            >
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/team", label: "Our Team" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="
                      text-slate-600
                      dark:text-slate-400
                      hover:text-orange-500
                      dark:hover:text-orange-400
                      transition-colors
                    "
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3
              className="
                font-semibold
                mb-4
                text-slate-900
                dark:text-white
              "
            >
              Contact Info
            </h3>

            <div
              className="
                space-y-2
                text-sm
                text-slate-600
                dark:text-slate-400
              "
            >
              <p>📍 Dhaka, Bangladesh</p>
              <p>📧 support@resellhub.com</p>
              <p>📞 +880 1700-000000</p>
            </div>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-5">
              <a
                href="#"
                aria-label="Facebook"
                className="
                  text-[#1877F2]
                  hover:scale-110
                  transition-transform
                "
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="
                  text-slate-700
                  dark:text-slate-300
                  hover:text-orange-500
                  dark:hover:text-orange-400
                  hover:scale-110
                  transition-all
                "
              >
                <RiTwitterXLine />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="
                  text-[#0A66C2]
                  hover:scale-110
                  transition-transform
                "
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* MESSAGE BOX */}
          <div>
            <h3
              className="
                font-semibold
                mb-4
                text-slate-900
                dark:text-white
              "
            >
              Send Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* MESSAGE */}
              <textarea
                placeholder="Write your message..."
                className="
                  w-full
                  h-24
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-900
                  placeholder:text-slate-400
                  p-3
                  text-sm
                  outline-none
                  resize-none

                  focus:ring-2
                  focus:ring-orange-500
                  focus:border-orange-500

                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-white
                  dark:placeholder:text-slate-500
                "
              />

              {/* EMAIL */}
              <div className="relative">
                <BiEnvelope
                  className="
                    absolute
                    left-3
                    top-3
                    text-slate-400
                    dark:text-slate-500
                  "
                />

                <input
                  type="email"
                  placeholder="Your email"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    text-slate-900
                    placeholder:text-slate-400
                    pl-10
                    pr-3
                    py-2
                    text-sm
                    outline-none

                    focus:ring-2
                    focus:ring-orange-500
                    focus:border-orange-500

                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                    dark:placeholder:text-slate-500
                  "
                />
              </div>

              {/* SEND BUTTON */}
              <button
                type="submit"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  w-full
                  rounded-xl
                  bg-orange-500
                  px-4
                  py-2
                  text-white
                  hover:bg-orange-600
                  active:scale-[0.98]
                  transition-all
                "
              >
                <BsFillSendFill />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM */}
        <div
          className="
            mt-12
            border-t
            pt-6
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-4
            text-sm

            border-slate-200
            dark:border-slate-800

            text-slate-500
            dark:text-slate-500
          "
        >
          <p>© 2026 ReSellHub. All rights reserved.</p>

          <div className="flex gap-6">
            <Link
              className="
                hover:text-orange-500
                dark:hover:text-orange-400
                transition-colors
              "
              href="/privacy"
            >
              Privacy
            </Link>

            <Link
              className="
                hover:text-orange-500
                dark:hover:text-orange-400
                transition-colors
              "
              href="/terms"
            >
              Terms
            </Link>

            <Link
              className="
                hover:text-orange-500
                dark:hover:text-orange-400
                transition-colors
              "
              href="/cookies"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
