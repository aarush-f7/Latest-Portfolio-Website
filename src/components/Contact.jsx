import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple mock submission since no actual EmailJS keys are provided
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(""), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
      <div className="mb-16 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-bold font-space uppercase mb-4 text-glow">Initiate Connection</h2>
        <p className="text-gray-400 max-w-2xl font-inter">
          Currently open for new opportunities. Whether you have a question or just want to say hi,
          I'll try my best to get back to you!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          <div className="glass-effect p-8 rounded-xl border border-white/5 flex flex-col gap-6">
            <h3 className="text-2xl font-space font-bold border-b border-white/10 pb-4">Contact Info</h3>

            <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#00f5ff] text-xl">
                <FaEnvelope />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-space text-gray-500 uppercase uppercase">Email</span>
                <a href="mailto:rajakaarush627@gmail.com" className="font-inter">rajakaarush627@gmail.com</a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#7c3aed] text-xl">
                <FaPhoneAlt />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-space text-gray-500 uppercase">Phone</span>
                <a href="tel:7489336575" className="font-inter">7489336575</a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#00f5ff] text-xl">
                <FaMapMarkerAlt />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-space text-gray-500 uppercase">Location</span>
                <span className="font-inter">Jabalpur, India</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <a href="https://github.com/aarush-f7" className="w-14 h-14 glass-effect flex items-center justify-center rounded-xl text-2xl hover:bg-[#00f5ff]/10 hover:text-[#00f5ff] hover:border-[#00f5ff]/50 transition-all">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/aarushrajak77/" className="w-14 h-14 glass-effect flex items-center justify-center rounded-xl text-2xl hover:bg-[#7c3aed]/10 hover:text-[#7c3aed] hover:border-[#7c3aed]/50 transition-all">
              <FaLinkedin />
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="glass-effect p-8 rounded-xl border border-white/5 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-space text-gray-400">YOUR NAME</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-black/50 border border-white/10 rounded-lg p-3 text-white font-inter focus:outline-none focus:border-[#00f5ff] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-space text-gray-400">YOUR EMAIL</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-black/50 border border-white/10 rounded-lg p-3 text-white font-inter focus:outline-none focus:border-[#7c3aed] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-space text-gray-400">MESSAGE</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="bg-black/50 border border-white/10 rounded-lg p-3 text-white font-inter focus:outline-none focus:border-[#00f5ff] transition-colors resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 group relative py-4 bg-white text-black font-space font-bold uppercase tracking-wider overflow-hidden hover:scale-[1.02] transition-transform w-full rounded-lg"
          >
            <span className="relative z-10">
              {status === "sending" ? "Transmitting..." : status === "success" ? "Message Received" : "Send Message"}
            </span>
            <div className="absolute inset-0 bg-[#00f5ff] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-in-out z-0"></div>
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
