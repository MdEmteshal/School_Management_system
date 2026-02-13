import React, { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import axios from "axios";
import { backendUrl } from "../App";

export default function ContactUs() {


  // ContactUs Forms



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    msg: "",

  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        backendUrl + "/api/admission/contactus",
        formData
      );
      setMessage(res.data.message);
      setFormData({ name: "", email: "", msg: "" });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <div className="bg-orange-500 text-white py-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
        <p className="mt-2 text-orange-100">
          We’d love to hear from you. Get in touch anytime 🙂
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-orange-600 mb-6">
            Our Details
          </h2>

          <div className="flex items-center gap-4 mb-4">
            <Phone className="text-orange-500" />
            <span className="text-gray-700">+91 98765 43210</span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <Mail className="text-orange-500" />
            <span className="text-gray-700">school@email.com</span>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="text-orange-500 mt-1" />
            <span className="text-gray-700">
              ABC School, Main Road,<br />
              Your City, Your State
            </span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-orange-600 mb-6">
            Send a Message
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-orange-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-orange-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <textarea
              rows="4"
              name="msg"
              placeholder="Your Message"
              value={formData.msg}
              onChange={handleChange}
              className="w-full border border-orange-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition"
            >
              {loading ? "Send Message..." : "Send Message"}

            </button>
            {message && (
              <p className="text-center text-sm mt-3 text-red-500">
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
