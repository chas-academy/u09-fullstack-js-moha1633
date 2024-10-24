import React from 'react';

const About = () => {
  return (
    <div className="px-4 lg:px-12 py-12 bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-center text-gray-900">
          About Our Book Buying and Selling Platform
        </h1>
        <p className="text-xl mb-8 text-center">
          Welcome to <strong className="text-indigo-600">Buy and Sell Your Books for the Best Prices!</strong>
        </p>

        <section className="mb-12">
          <p className="text-lg leading-relaxed mb-6">
            At our platform, we believe in the power of books to inspire, educate, and entertain. Our mission is to connect book lovers with the best prices on new and used books while providing a seamless experience for those looking to sell their own titles.
          </p>

          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Our Vision</h2>
          <p className="text-lg leading-relaxed mb-6">
            To create a vibrant community where readers can easily buy and sell books, fostering a love for literature and sustainable reading practices.
          </p>

          <h2 className="text-3xl font-semibold mb-4 text-gray-800">What We Offer</h2>
          <ul className="list-disc list-inside mb-8 text-lg leading-relaxed">
            <li><strong>Diverse Selection of Books:</strong> Browse through a vast array of genres, including Fiction, Non-Fiction, Mystery, Science Fiction, Fantasy, and more.</li>
            <li><strong>User-Friendly Selling Platform:</strong> Easily list your used books for sale in just a few clicks.</li>
            <li><strong>Secure Transactions:</strong> We prioritize your safety with secure payment options and a reliable transaction process.</li>
            <li><strong>Community Engagement:</strong> Join a community of fellow book lovers, share recommendations, and participate in discussions.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Join Us Today!</h2>
          <p className="text-lg leading-relaxed mb-6">
            Whether you're looking to expand your personal library, sell your used books, or connect with like-minded individuals, we are here to help. Start your book journey with us and discover the joys of reading and sharing!
          </p>
          <p className="text-lg leading-relaxed mb-6">
            For more information, please feel free to reach out to our support team or explore our website.
          </p>
          <p className="text-xl font-semibold text-indigo-600">
            Thank you for choosing us as your trusted platform for buying and selling books!
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
