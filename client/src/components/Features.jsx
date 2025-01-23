import React from "react";

const Features = () => (
  <section
    id="features"
    className=" text-white py-16 px-6 md:px-12 lg:px-24"
  >
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
      Why Choose ReadAround?
    </h2>
    <div className="feature-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="card bg-white bg-opacity-10 hover:bg-opacity-20 transition rounded-lg p-6 flex flex-col items-center text-center shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Personalized Recommendations</h3>
        <p className="text-sm md:text-base">
          Find books tailored to your unique preferences.
        </p>
      </div>
      <div className="card bg-white bg-opacity-10 hover:bg-opacity-20 transition rounded-lg p-6 flex flex-col items-center text-center shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Verified Reviews</h3>
        <p className="text-sm md:text-base">
          Read honest reviews from real readers.
        </p>
      </div>
      <div className="card bg-white bg-opacity-10 hover:bg-opacity-20 transition rounded-lg p-6 flex flex-col items-center text-center shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Community Engagement</h3>
        <p className="text-sm md:text-base">
          Join discussions and connect with fellow book lovers.
        </p>
      </div>
    </div>
  </section>
);

export default Features;

