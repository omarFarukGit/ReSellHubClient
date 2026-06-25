"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

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
    setForm({ ...form, [e.target.name]: e.target.value });
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

  const inputStyle =
    "w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-700";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-6 py-14">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* LEFT SIDE */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Get in Touch
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mb-10">
            We’re here to help you anytime. Send us a message and we’ll reply as
            soon as possible.
          </p>

          <div className="space-y-5">
            {/* Contact Cards */}
            {[
              {
                icon: <Mail className="text-orange-500" />,
                title: "Email",
                desc: "support@resellhub.com",
              },
              {
                icon: <Phone className="text-orange-500" />,
                title: "Phone",
                desc: "+880 18XXXXXXXX",
              },
              {
                icon: <MapPin className="text-orange-500" />,
                title: "Address",
                desc: "Dhaka, Bangladesh",
              },
              {
                icon: <Clock className="text-orange-500" />,
                title: "Business Hours",
                desc: "Mon - Fri: 9AM - 6PM",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition"
              >
                <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30">
                  {item.icon}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Send a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className={inputStyle}
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              type="email"
              className={inputStyle}
            />

            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className={inputStyle}
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows={5}
              required
              className={inputStyle}
            />

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 active:scale-[0.98] transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
