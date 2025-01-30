import React from "react";

const CoreValues = () => {
  return (
    <div className="min-h-screen bg-black text-white font-figtree">
      {/* Hero Section */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6 sm:px-4">
        <div>
          <h1 className="text-5xl sm:text-3xl md:text-5xl font-bold tracking-wide">
            <span className="hushh-gradient">Hushh’s</span> Core Values
          </h1>
          <p className="mt-4 text-lg sm:text-base md:text-xl text-gray-400 max-w-3xl mx-auto">
            Below is a Steve Jobs–style rewrite of hushh’s guiding principles. It’s sharper, bolder, and leaves no room for misinterpretation—just like Jobs’s famous candor.
          </p>
        </div>
      </div>

      {/* Section Container */}
      <div className="max-w-5xl mx-auto px-6 sm:px-4 py-12 sm:py-8">
        {/* Core Values */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-3xl font-semibold border-b border-gray-700 pb-4">
            Core Values
          </h2>
          <ul className="mt-6 space-y-6 sm:space-y-4">
            {[
              { title: "Data Is Yours", desc: "No excuses, no shortcuts. We treat personal data like sacred ground." },
              { title: "Integrity, Always", desc: "Talk straight, act right. If you mess up, own it and fix it fast." },
              { title: "Stay Curious, Stay Bold", desc: "Ask why until you can’t anymore. Push boundaries—even if it feels risky." },
              { title: "Serve the User", desc: "Every product feature and design choice must deliver real value or it’s gone." },
              { title: "Win-Win-Win Mindset", desc: "Our successes should lift everyone: the user, the team, and the partners." },
              { title: "Execution Over Talk", desc: "Ideas are cheap. Execution is where we prove our worth." },
              { title: "Disagree & Commit", desc: "Challenge ideas fiercely, then unify behind the final call—no second-guessing." },
            ].map((item, index) => (
              <li key={index} className="text-base sm:text-sm">
  <strong className="text-lg sm:text-base md:text-xl text-gray-300">{item.title}</strong>
  <p className="text-base sm:text-sm md:text-lg text-gray-500">{item.desc}</p>
</li>
            ))}
          </ul>
        </section>

        {/* Leadership Principles */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-3xl font-semibold border-b border-gray-700 pb-4">
            Leadership Principles
          </h2>
          <ul className="mt-6 space-y-6 sm:space-y-4">
            {[
              { title: "Own the Outcome", desc: "If it’s in your hands, you’re responsible for making it succeed or pivoting fast." },
              { title: "Clarity & Focus", desc: "Complexity is a distraction. Strip away noise, then execute." },
              { title: "Data-Driven & Human-Centered", desc: "Numbers guide us, but empathy keeps us honest." },
              { title: "Grow People", desc: "Develop talent obsessively. Great products come from great teams." },
              { title: "Listen Hard, Then Decide", desc: "Debate passionately, but once we have direction, we charge as one." },
              { title: "Earn & Keep Trust", desc: "Trust isn’t asked for—it’s earned every day, in every interaction." },
            ].map((item, index) => (
              <li key={index} className="text-base sm:text-sm">
  <strong className="text-lg sm:text-base md:text-xl text-gray-300">{item.title}</strong>
  <p className="text-base sm:text-sm md:text-lg text-gray-500">{item.desc}</p>
</li>
            ))}
          </ul>
        </section>

        {/* Code of Conduct */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-3xl font-semibold border-b border-gray-700 pb-4">
            Code of Conduct & Ethics
          </h2>
          <ul className="mt-6 space-y-6 sm:space-y-4">
            {[
              { title: "Respect & Inclusion", desc: "Treat everyone like they matter, because they do." },
              { title: "Privacy & Confidentiality", desc: "“Your data, your business” isn’t a slogan—it’s a commandment." },
              { title: "Lawful & Ethical", desc: "If it’s shady, we won’t do it. Zero tolerance for shortcuts on ethics." },
              { title: "Honesty & Transparency", desc: "Share the truth, especially when it’s uncomfortable." },
              { title: "Protect hushh’s Reputation", desc: "You’re hushh’s face wherever you go—act like it." },
              { title: "Demand Quality", desc: "If it’s not your best, fix it or scrap it. Mediocrity is a sin." },
              { title: "Disagree & Commit", desc: "Hammer out issues openly—then stand united behind the path chosen." },
            ].map((item, index) => (
              <li key={index} className="text-base sm:text-sm">
  <strong className="text-lg sm:text-base md:text-xl text-gray-300">{item.title}</strong>
  <p className="text-base sm:text-sm md:text-lg text-gray-500">{item.desc}</p>
</li>
            ))}
          </ul>
        </section>

        {/* Business Partnerships */}
        <section>
          <h2 className="text-3xl sm:text-3xl font-semibold border-b border-gray-700 pb-4">
            Business Partnerships Focus
          </h2>
          <ul className="mt-6 space-y-6 sm:space-y-4">
            {[
              { title: "Shared Values", desc: "We only partner with those who respect data and believe in ethical innovation." },
              { title: "Mutual Gain", desc: "Deals must make everyone stronger: hushh, the partner, and the users." },
              { title: "Data Respect", desc: "Partners follow our rules on data privacy—no negotiation on user trust." },
              { title: "Innovate Together", desc: "We combine strengths—HPC, AI, privacy-forward mindsets—to push the world forward." },
              { title: "Scalable Impact", desc: "We think global from day one. Good ideas shouldn’t stay small." },
            ].map((item, index) => (
              <li key={index} className="text-base sm:text-sm">
  <strong className="text-lg sm:text-base md:text-xl text-gray-300">{item.title}</strong>
  <p className="text-base sm:text-sm md:text-lg text-gray-500">{item.desc}</p>
</li>
            ))}
          </ul>
        </section>

        {/* Final Conclusion */}
        <section className="mt-12 text-left text-gray-400 text-md sm:text-base md:text-lg">
          <p>
            <span className="hushh-gradient" style={{fontWeight:'700'}}>“Your data, your business” </span> isn’t just a tagline; it’s our guiding light. These Core Values, Leadership Principles, Code of Conduct & Ethics, and Partnership Guidelines frame how we work, innovate, and grow—always with a win-win-win mindset.
          </p>
          <p className="mt-4">
            By living these principles daily, we ensure hushh remains a beacon of trust, excellence, and data sovereignty in everything we do.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CoreValues;
