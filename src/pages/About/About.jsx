import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer/Footer";

const About = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://picsum.photos/600/400"
                alt="About us"
                className="w-full h-auto"
              />
            </div>
            {/* <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://picsum.photos/600/401"
              alt="Our team"
              className="w-full h-auto"
            />
          </div> */}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-gray-600">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                At our company, we strive to deliver exceptional value and
                innovative solutions to our customers. Our commitment to quality
                and customer satisfaction drives everything we do. We believe in
                creating lasting relationships and making a positive impact in
                everything we undertake.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
