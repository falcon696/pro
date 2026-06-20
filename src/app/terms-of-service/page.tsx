'use client';

import Link from 'next/link';

export default function TermsOfService() {
  return (
    <main
      className="relative min-h-screen bg-dark text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/Terms of Service-bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Terms of Service</h1>
            <p className="mt-6 max-w-2xl text-lg text-gray-300">
              Please read these Terms of Service carefully before using the Falcon website. By accessing or using this site, you agree to comply with these terms.
            </p>
            <p className="mt-4 text-sm text-gray-400">
              Last updated: <span className="text-white">May 20, 2024</span>
            </p>
          </div>

          <div className="self-start rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:w-96">
            <h2 className="text-xl font-semibold mb-4">Quick overview</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <strong className="text-white">Acceptance</strong>
                <p className="text-sm text-gray-400 mt-1">Using this website means you agree to these terms.</p>
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <strong className="text-white">Use of content</strong>
                <p className="text-sm text-gray-400 mt-1">Content is for informational purposes only.</p>
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <strong className="text-white">Updates</strong>
                <p className="text-sm text-gray-400 mt-1">Terms may change at any time without notice.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold mb-4">01. Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by these terms and the provisions of this agreement.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold mb-4">02. Use of the Website</h2>
            <p className="text-gray-300 leading-relaxed">
              This website is intended to showcase Falcon's work and services. You agree to use this site only for lawful purposes and in a way that does not infringe on the rights of others.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold mb-4">03. Intellectual Property</h2>
            <p className="text-gray-300 leading-relaxed">
              All content, including text, images, graphics, and design, is the property of Falcon unless otherwise stated. You may not copy, reproduce, or distribute any content without permission.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold mb-4">04. Third-Party Links</h2>
            <p className="text-gray-300 leading-relaxed">
              This website may contain links to third-party websites. Falcon is not responsible for the content or practices of these external sites.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold mb-4">05. Limitation of Liability</h2>
            <p className="text-gray-300 leading-relaxed">
              Falcon is not liable for any direct, indirect, incidental, or consequential damages resulting from your use of the site or inability to use the website.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold mb-4">06. Changes to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              Falcon reserves the right to update or modify these terms at any time without prior notice. Please check this page periodically for changes.
            </p>
          </article>

          <article className="lg:col-span-2 rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold mb-4">07. Contact</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about these Terms of Service, feel free to reach out through the contact form on the site.
            </p>
          </article>
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link href="/" className="btn-outline inline-flex items-center justify-center px-6 py-3">
            ← Back to Home
          </Link>
          <span className="text-sm text-gray-400">Need help? Use the contact page for direct support.</span>
        </div>
      </div>
    </main>
  );
}
