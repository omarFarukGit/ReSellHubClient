"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    desc: "support@resellhub.com",
  },
  {
    icon: Phone,
    title: "Phone",
    desc: "+880 18XXXXXXXX",
  },
  {
    icon: MapPin,
    title: "Address",
    desc: "Dhaka, Bangladesh",
  },
  {
    icon: Clock,
    title: "Business Hours",
    desc: "Mon - Fri: 9AM - 6PM",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(form);

    toast.success("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const inputStyle = `
    w-full
    rounded-xl
    border
    border-gray-200
    bg-white
    px-4 py-3
    text-sm
    text-gray-900
    outline-none
    transition-all duration-200

    placeholder:text-gray-400

    hover:border-gray-300

    focus:border-orange-500
    focus:ring-2
    focus:ring-orange-500/20

    dark:border-gray-700
    dark:bg-gray-800
    dark:text-white
    dark:placeholder:text-gray-500
    dark:hover:border-gray-600
    dark:focus:border-orange-500
    dark:focus:ring-orange-500/20
  `;

  return (
    <div
      className="
        min-h-screen
        bg-gray-50
        px-6 py-14
        transition-colors duration-300

        dark:bg-gray-950
      "
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        {/* LEFT SIDE */}
        <div>
          {/* Heading */}
          <div className="mb-10">
            <span
              className="
                text-sm
                font-semibold
                uppercase
                tracking-wider
                text-orange-500
                dark:text-orange-400
              "
            >
              Contact Us
            </span>

            <h1
              className="
                mt-2
                mb-3
                text-4xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              Get in Touch
            </h1>

            <p
              className="
                max-w-xl
                text-gray-500
                dark:text-gray-400
              "
            >
              We’re here to help you anytime. Send us a message and we’ll
              reply as soon as possible.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="space-y-5">
            {contactInfo.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    group
                    flex
                    gap-4
                    rounded-2xl
                    border
                    border-gray-100
                    bg-white
                    p-5
                    shadow-sm
                    transition-all duration-300

                    hover:-translate-y-1
                    hover:border-orange-200
                    hover:shadow-md

                    dark:border-gray-800
                    dark:bg-gray-900
                    dark:hover:border-orange-500/30
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-orange-100
                      transition-all duration-300

                      group-hover:scale-110

                      dark:bg-orange-500/10
                    "
                  >
                    <Icon
                      className="
                        h-5
                        w-5
                        text-orange-500
                        dark:text-orange-400
                      "
                    />
                  </div>

                  {/* Info */}
                  <div>
                    <h3
                      className="
                        font-semibold
                        text-gray-900
                        dark:text-white
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div
          className="
            rounded-2xl
            border
            border-gray-100
            bg-white
            p-6
            shadow-md
            transition-colors duration-300

            dark:border-gray-800
            dark:bg-gray-900

            md:p-8
          "
        >
          <div className="mb-6">
            <span
              className="
                text-sm
                font-semibold
                text-orange-500
                dark:text-orange-400
              "
            >
              Have a question?
            </span>

            <h2
              className="
                mt-1
                text-2xl
                font-semibold
                text-gray-900
                dark:text-white
              "
            >
              Send a Message
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className={inputStyle}
            />

            {/* Email */}
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              type="email"
              className={inputStyle}
            />

            {/* Subject */}
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className={inputStyle}
            />

            {/* Message */}
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows={5}
              required
              className={`${inputStyle} resize-none`}
            />

            {/* Submit */}
            <button
              type="submit"
              className="
                w-full
                rounded-xl
                bg-orange-500
                py-3
                font-semibold
                text-white
                shadow-sm
                transition-all duration-300

                hover:-translate-y-0.5
                hover:bg-orange-600
                hover:shadow-md

                active:scale-[0.98]

                dark:bg-orange-600
                dark:hover:bg-orange-500
              "
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}