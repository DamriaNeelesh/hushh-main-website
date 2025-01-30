import React from "react";

const CoreValues = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6 sm:px-4">
        <div>
          <h1 className="text-5xl sm:text-3xl md:text-5xl font-bold tracking-wide">
            <span className="hushh-gradient">Hushh’s</span> Core Values
          </h1>
          <p className="mt-4 text-lg sm:text-base md:text-xl text-gray-400 max-w-3xl mx-auto">
            Our principles are not just words. They are how we build, innovate, and lead with integrity.
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
              { title: "Data Is Yours", desc: "We treat personal data like sacred ground." },
              { title: "Integrity, Always", desc: "Talk straight, act right. Own mistakes, fix fast." },
              { title: "Stay Curious, Stay Bold", desc: "Push boundaries—even when it feels risky." },
              { title: "Serve the User", desc: "Every feature must deliver real value, or it’s gone." },
              { title: "Win-Win-Win Mindset", desc: "Success must benefit users, the team, and partners." },
              { title: "Execution Over Talk", desc: "Ideas are cheap—execution proves our worth." },
              { title: "Disagree & Commit", desc: "Challenge fiercely, then unify behind decisions." },
            ].map((item, index) => (
              <li key={index} className="text-lg sm:text-base">
                <strong className="text-xl sm:text-lg md:text-xl text-gray-300">{item.title}</strong>
                <p className="text-lg sm:text-base md:text-lg text-gray-500">{item.desc}</p>
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
              { title: "Own the Outcome", desc: "If it’s in your hands, you own the success or failure." },
              { title: "Clarity & Focus", desc: "Complexity is a distraction—simplify and execute." },
              { title: "Data-Driven & Human-Centered", desc: "Numbers guide us, but empathy keeps us honest." },
              { title: "Grow People", desc: "Talent development is key—great products need great teams." },
              { title: "Listen Hard, Then Decide", desc: "Debate passionately, but once decided, move fast." },
              { title: "Earn & Keep Trust", desc: "Trust is earned daily, in every interaction." },
            ].map((item, index) => (
              <li key={index} className="text-lg sm:text-base">
                <strong className="text-xl sm:text-lg md:text-xl text-gray-300">{item.title}</strong>
                <p className="text-lg sm:text-base md:text-lg text-gray-500">{item.desc}</p>
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
              { title: "Respect & Inclusion", desc: "Every individual is valued—no exceptions." },
              { title: "Privacy & Confidentiality", desc: "Data is sacred. Trust is everything." },
              { title: "Lawful & Ethical", desc: "No shortcuts. No gray areas. Full transparency." },
              { title: "Protect hushh’s Reputation", desc: "You represent hushh—act with responsibility." },
              { title: "Disagree & Commit", desc: "Challenge openly, but align behind the final decision." },
            ].map((item, index) => (
              <li key={index} className="text-lg sm:text-base">
                <strong className="text-xl sm:text-lg md:text-xl text-gray-300">{item.title}</strong>
                <p className="text-lg sm:text-base md:text-lg text-gray-500">{item.desc}</p>
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
              { title: "Shared Values", desc: "We partner only with those who respect data sovereignty." },
              { title: "Mutual Gain", desc: "Partnerships must strengthen hushh, partners, and users." },
              { title: "Data Respect", desc: "Partners must uphold our strict data privacy rules." },
              { title: "Innovate Together", desc: "HPC, AI, and privacy-first thinking drive breakthroughs." },
              { title: "Scalable Impact", desc: "We think globally—great ideas should reach everyone." },
            ].map((item, index) => (
              <li key={index} className="text-lg sm:text-base">
                <strong className="text-xl sm:text-lg md:text-xl text-gray-300">{item.title}</strong>
                <p className="text-lg sm:text-base md:text-lg text-gray-500">{item.desc}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-8 text-sm">
        "Your data, your business" isn’t just a tagline—it’s our guiding light.   
      </footer>
    </div>
  );
};

export default CoreValues;
