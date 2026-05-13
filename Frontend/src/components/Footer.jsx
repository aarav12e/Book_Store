import React from "react";
import { BookOpen, X, Globe, Rss, Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <>
      {/* About Section */}
      <section id="about" className="py-20 px-4 md:px-20 bg-gradient-to-br from-pink-50 to-violet-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">BookStore</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12 text-lg">
            We are passionate about making knowledge accessible to everyone. Since 1992, we've been curating the best books on technology, business, and personal development to help you grow.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "📚", title: "10,000+ Books", desc: "A vast collection across all genres and categories" },
              { icon: "🎓", title: "Expert Curation", desc: "Hand-picked by industry professionals and educators" },
              { icon: "🌍", title: "Global Reach", desc: "Serving readers in over 50 countries worldwide" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/50 dark:border-slate-700 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-20 bg-white dark:bg-[#0f172a]">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Get in <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">Have questions? We'd love to hear from you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: <Mail size={24} />, label: "Email", value: "hello@bookstore.com" },
              { icon: <Phone size={24} />, label: "Phone", value: "+1 (555) 000-0000" },
              { icon: <MapPin size={24} />, label: "Address", value: "123 Library Lane, NY" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-6 rounded-2xl glassmorphism hover:shadow-xl transition-all duration-300">
                <div className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white">{item.icon}</div>
                <p className="font-semibold dark:text-white">{item.label}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Bottom */}
      <hr className="border-t border-slate-200 dark:border-slate-800" />
      <footer className="footer p-10 bg-slate-50 text-slate-700 dark:bg-[#0f172a] dark:text-slate-300">
        <aside>
          <div className="flex items-center gap-2">
            <BookOpen size={36} className="text-pink-500" />
            <div>
              <p className="text-lg font-bold">BookStore Ltd.</p>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Reliable knowledge since 1992</span>
            </div>
          </div>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover hover:text-pink-500 transition-colors duration-200">Branding</a>
          <a className="link link-hover hover:text-pink-500 transition-colors duration-200">Design</a>
          <a className="link link-hover hover:text-pink-500 transition-colors duration-200">Marketing</a>
          <a className="link link-hover hover:text-pink-500 transition-colors duration-200">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a href="#about" className="link link-hover hover:text-pink-500 transition-colors duration-200">About us</a>
          <a href="#contact" className="link link-hover hover:text-pink-500 transition-colors duration-200">Contact</a>
          <a className="link link-hover hover:text-pink-500 transition-colors duration-200">Jobs</a>
          <a className="link link-hover hover:text-pink-500 transition-colors duration-200">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover hover:text-pink-500 transition-colors duration-200">Terms of use</a>
          <a className="link link-hover hover:text-pink-500 transition-colors duration-200">Privacy policy</a>
          <a className="link link-hover hover:text-pink-500 transition-colors duration-200">Cookie policy</a>
        </nav>
      </footer>
      <footer className="footer px-10 py-6 border-t border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-[#0f172a] dark:text-slate-400">
        <aside className="items-center grid-flow-col">
          <p>© {new Date().getFullYear()} BookStore Industries Ltd. All rights reserved.</p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a className="hover:text-pink-500 transition-colors duration-200 cursor-pointer"><X size={22} /></a>
            <a className="hover:text-pink-500 transition-colors duration-200 cursor-pointer"><Globe size={22} /></a>
            <a className="hover:text-pink-500 transition-colors duration-200 cursor-pointer"><Rss size={22} /></a>
          </div>
        </nav>
      </footer>
    </>
  );
}

export default Footer;


