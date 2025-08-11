import React from 'react';
import diet1 from '../assets/diet1.png';
import diet2 from '../assets/diet2.png';
import diet3 from '../assets/diet3.png';
import training1 from '../assets/training1.jpg';
import training2 from '../assets/training2.jpg';
import training3 from '../assets/training3.jpg';
import member1 from '../assets/member1.jpg';
import member2 from '../assets/member2.jpg';

const Journey = () => {
  return (
    <div className="px-6 py-12 max-w-7xl mx-auto space-y-16">

      {/* Pricing Plans */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Basic', price: 'PKR 3,000/month', features: ['🏋️ Gym Access', '🧘 Group Classes'] },
            { title: 'Pro', price: 'PKR 5,000/month', features: ['🏋️ Gym Access', '🍎 Diet Plan', '🏅 Personal Trainer'] },
            { title: 'Elite', price: 'PKR 8,000/month', features: ['🏋️ Gym + Trainer', '🍎 Diet Plan', '🤝 1-on-1 Coaching', '💊 Supplements'] }
          ].map((plan, index) => (
            <div key={index} className="border rounded-xl shadow-md p-6 text-center bg-white">
              <h3 className="text-xl font-semibold text-red-600">{plan.title}</h3>
              <p className="text-2xl font-bold text-gray-800 my-4">{plan.price}</p>
              <ul className="text-gray-600 space-y-2">
                {plan.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Diet Plans */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Diet Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[diet1, diet2, diet3].map((img, i) => (
            <img key={i} src={img} alt={`Diet ${i + 1}`} className="rounded-lg shadow-lg w-full h-64 object-cover" />
          ))}
        </div>
      </section>

      {/* Training Types */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Training Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[training1, training2, training3].map((img, i) => (
            <img key={i} src={img} alt={`Training ${i + 1}`} className="rounded-lg shadow-lg w-full h-64 object-cover" />
          ))}
        </div>
      </section>

      {/* Member Gallery */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Member Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {[member1, member2].map((img, i) => (
            <img key={i} src={img} alt={`Member ${i + 1}`} className="rounded-lg w-full h-64 object-cover shadow-md" />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Journey;
