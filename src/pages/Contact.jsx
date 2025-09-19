import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [success, setSuccess] = useState("");

  const onSubmit = (data) => {
    setSuccess(`✅ Thank you, ${data.name}! We received your message.`);
    reset();
    setTimeout(() => setSuccess(""), 4000); 
  };

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-teal-700 mb-12">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
        {/* Left: Contact Info */}
        <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6 text-teal-700">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions or need help? Reach out to us anytime. Our team is here
            to assist you.
          </p>
          <div className="space-y-5">
            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-teal-600 text-xl" />
              <span className="text-gray-700">+92 300 1234567</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-teal-600 text-xl" />
              <span className="text-gray-700">support@comforty.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-teal-600 text-xl" />
              <span className="text-gray-700">Lahore, Pakistan</span>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 bg-white p-8 rounded-2xl shadow-lg"
        >
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Your Name"
            className="border-2 border-teal-300 p-3 rounded-lg focus:outline-none focus:border-teal-600 transition"
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}

          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
            })}
            placeholder="Your Email"
            className="border-2 border-teal-300 p-3 rounded-lg focus:outline-none focus:border-teal-600 transition"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}

          <textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Your Message"
            rows="5"
            className="border-2 border-teal-300 p-3 rounded-lg focus:outline-none focus:border-teal-600 transition"
          />
          {errors.message && <span className="text-red-500">{errors.message.message}</span>}

          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition"
          >
            Send Message
          </button>

          {/* Success Message */}
          {success && (
            <p className="text-green-600 font-medium text-center mt-2">{success}</p>
          )}
        </form>
      </div>

      {/* Google Map Lahore */}
      <div className="w-full max-w-5xl mt-12">
        <iframe
          title="Lahore Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27222.51192674979!2d74.3091977!3d31.5203696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190c4d45b5a6f1%3A0xf1d3dbed1f7f1c2c!2sLahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000"
          width="100%"
          height="350"
          allowFullScreen=""
          loading="lazy"
          className="rounded-2xl shadow-lg"
        ></iframe>
      </div>
    </div>
  );
}

