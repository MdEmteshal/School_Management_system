import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-orange-600 text-white ">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8">

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-2xl font-bold mb-3">ABC Public School</h2>
          <p className="text-sm mb-4 text-orange-100">
            Quality Education for a Better Future
          </p>

          <p className="text-sm text-orange-100">
            📍 New Delhi, India <br />
            📞 +91 98765 43210 <br />
            ✉️ abcschool@gmail.com
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-5">
            <a className="p-2 bg-white text-orange-600 rounded-full hover:bg-orange-200" href="#">
              <FaFacebookF />
            </a>
            <a className="p-2 bg-white text-orange-600 rounded-full hover:bg-orange-200" href="#">
              <FaInstagram />
            </a>
            <a className="p-2 bg-white text-orange-600 rounded-full hover:bg-orange-200" href="#">
              <FaYoutube />
            </a>
            <a className="p-2 bg-white text-orange-600 rounded-full hover:bg-orange-200" href="#">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* RIGHT SIDE - GOOGLE MAP */}
        <div className="w-full h-64 rounded-lg overflow-hidden border-4 border-orange-300">
          <iframe
            title="school-map"
            src="https://www.google.com/maps?q=school&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          ></iframe>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="text-center py-3 bg-orange-700 text-sm text-orange-100">
        © {new Date().getFullYear()} ABC Public School | All Rights Reserved
      </div>
    </footer>
  );
}
