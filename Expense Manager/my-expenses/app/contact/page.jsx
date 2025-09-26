import React from 'react';
import Link from 'next/link';

const ICON_SIZE = 28;

const page = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#ddf7d5] via-white to-[#e6fff5] px-4 py-8 text-gray-900 overflow-y-auto">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-opacity-80 backdrop-blur-md mb-8">
        <Link href="/contact" className="text-[#10B981] text-4xl font-extrabold px-3 py-2 rounded hover:text-white hover:bg-[#10B981] transition-all duration-300 shadow-lg">
          Contact.
        </Link>
        <div className="w-full h-1 bg-[#10B981] mt-3 rounded"></div>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Card Section */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          {/* CTA Line */}
          <h3 className="text-[#10B981] text-base italic mb-3">Got a question or just want to say hi? I'm just a click away.</h3>

          {/* Section Heading */}
          <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">Let’s Connect</h2>
          <p className="text-sm leading-relaxed mb-6 text-[#16d495]">
            Feel free to reach out — whether it’s feedback, collaboration, or tech talk. I'm open to opportunities and networking!
          </p>

          {/* Divider */}
          <div className="w-full h-0.5 bg-[#10B981] my-4 rounded"></div>

          {/* Contact Details */}
          <div className="space-y-4 text-base">
            <div className="flex items-center gap-3">
              <span className="font-bold">📧 Email:</span>
              <a
                href="mailto:karanmagham09@gmail.com"
                className="text-[#10B981] font-semibold hover:underline flex items-center gap-2"
              >
                karanmagham09@gmail.com
                {/* Envelope Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#10B981" width={ICON_SIZE} height={ICON_SIZE}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 7.5v9A2.25 2.25 0 0119.5 18.75h-15A2.25 2.25 0 012.25 16.5v-9m19.5 0A2.25 2.25 0 0019.5 5.25h-15A2.25 2.25 0 002.25 7.5m19.5 0v.243a2.25 2.25 0 01-.876 1.797l-7.5 5.625a2.25 2.25 0 01-2.748 0l-7.5-5.625A2.25 2.25 0 012.25 7.743V7.5" />
                </svg>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold">💼 GitHub:</span>
              <a
                href="https://github.com/KaranMagham"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#10B981] font-semibold hover:underline flex items-center gap-2"
              >
                github.com/KaranMagham
                {/* GitHub Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width={ICON_SIZE} height={ICON_SIZE} className="text-[#10B981]">
                  <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.525.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.099 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
                </svg>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold">🔗 LinkedIn:</span>
              <a
                href="https://www.linkedin.com/in/karanmaghamb099/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#10B981] font-semibold hover:underline flex items-center gap-2"
              >
                linkedin.com/in/karanmaghamb099
                {/* LinkedIn Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width={ICON_SIZE} height={ICON_SIZE} className="text-[#10B981]">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.601v5.595z"/>
                </svg>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold">📸 Instagram:</span>
              <a
                href="https://www.instagram.com/king_coder_emp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#10B981] font-semibold hover:underline flex items-center gap-2"
              >
                @karanmagham
                {/* Instagram Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width={ICON_SIZE} height={ICON_SIZE} className="text-[#10B981]">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.974-1.246-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.975 2.242-1.246 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.012-4.947.072-1.276.06-2.687.332-3.682 1.326-.995.995-1.267 2.406-1.326 3.682-.06 1.28-.072 1.688-.072 4.947s.012 3.667.072 4.947c.059 1.276.331 2.687 1.326 3.682.995.995 2.406 1.267 3.682 1.326 1.28.06 1.688.072 4.947.072s3.667-.012 4.947-.072c1.276-.059 2.687-.331 3.682-1.326.995-.995 1.267-2.406 1.326-3.682.06-1.28.072-1.688.072-4.947s-.012-3.667-.072-4.947c-.059-1.276-.331-2.687-1.326-3.682-.995-.995-2.406-1.267-3.682-1.326-1.28-.06-1.688-.072-4.947-.072zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-0.5 bg-[#10B981] my-6 rounded"></div>

          {/* Made By */}
          <div className="text-center text-sm text-[#aaa]">
            <p className="mb-1">🚀 Built with ❤️ using React, Tailwind CSS, and MongoDB</p>
            <p className="text-[#10B981] font-semibold">Made by <span className="text-[#16d495]">Karan Magham</span> © 2025</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default page;
