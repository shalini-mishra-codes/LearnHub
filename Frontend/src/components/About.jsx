// import React from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// function About() {
//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-slate-900 dark:to-slate-900 dark:text-white pt-28 px-6 md:px-20">

//         {/* Hero Section */}
//         <div className="text-center max-w-4xl mx-auto">
//           <h1 className="text-5xl font-extrabold">
//             About <span className="text-pink-500">BookStore</span>
//           </h1>
//           <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
//             A modern learning platform where students can explore books,
//             courses and skills in one place.
//           </p>
//         </div>

//         {/* Stats */}
//         <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
//           {[
//             { label: "Students", value: "10k+" },
//             { label: "Books", value: "500+" },
//             { label: "Courses", value: "100+" },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="p-6 rounded-xl shadow-lg bg-white dark:bg-slate-800"
//             >
//               <h2 className="text-4xl font-bold text-pink-500">
//                 {item.value}
//               </h2>
//               <p className="mt-2 text-gray-600 dark:text-gray-300">
//                 {item.label}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Mission */}
//         <div className="mt-20 grid md:grid-cols-2 gap-10 items-center">
//           <div>
//             <h2 className="text-3xl font-bold">Our Mission</h2>
//             <p className="mt-4 text-gray-600 dark:text-gray-300">
//               Our goal is to make learning easy, affordable and enjoyable for everyone.
//               We provide high quality books and courses to help students succeed.
//             </p>
//           </div>

//           <div className="p-8 bg-pink-100 dark:bg-slate-800 rounded-xl shadow-lg">
//             <h3 className="text-2xl font-semibold text-pink-500">We Believe In</h3>
//             <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
//               <li>✔ Smart Learning</li>
//               <li>✔ Student Success</li>
//               <li>✔ Simple Design</li>
//               <li>✔ Trusted Content</li>
//             </ul>
//           </div>
//         </div>

//         {/* What We Offer */}
//         <div className="mt-24">
//           <h2 className="text-3xl font-bold text-center">What We Offer</h2>
//           <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               { title: "📚 Books", desc: "Huge collection of learning books" },
//               { title: "🎓 Courses", desc: "Learn skills with structured courses" },
//               { title: "🤝 Community", desc: "Grow with other learners" },
//             ].map((f, i) => (
//               <div
//                 key={i}
//                 className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:scale-105 transition"
//               >
//                 <h3 className="text-xl font-semibold">{f.title}</h3>
//                 <p className="mt-3 text-gray-600 dark:text-gray-300">
//                   {f.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Team */}
//         <div className="mt-24 text-center">
//           <h2 className="text-3xl font-bold">Our Team</h2>
//           <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               { name: "Shalini", role: "Frontend Developer" },
//               { name: "Rahul", role: "Backend Developer" },
//               { name: "Neha", role: "Content Creator" },
//             ].map((m, i) => (
//               <div
//                 key={i}
//                 className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg"
//               >
//                 <div className="w-20 h-20 mx-auto rounded-full bg-pink-500 flex items-center justify-center text-white text-2xl font-bold">
//                   {m.name[0]}
//                 </div>
//                 <h3 className="mt-4 text-xl font-semibold">{m.name}</h3>
//                 <p className="text-gray-600 dark:text-gray-300">{m.role}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Testimonials */}
//         <div className="mt-24">
//           <h2 className="text-3xl font-bold text-center">What Students Say</h2>
//           <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               "This platform helped me learn React easily!",
//               "Best website for beginners.",
//               "Simple and very useful learning platform.",
//             ].map((t, i) => (
//               <div
//                 key={i}
//                 className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg"
//               >
//                 <p className="text-gray-600 dark:text-gray-300">“{t}”</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Technologies */}
//         <div className="mt-24 text-center">
//           <h2 className="text-3xl font-bold">Built With</h2>
//           <div className="mt-6 flex justify-center gap-4 flex-wrap">
//             {["React", "Node.js", "MongoDB", "Tailwind CSS"].map((tech, i) => (
//               <span
//                 key={i}
//                 className="px-4 py-2 bg-pink-500 text-white rounded-full"
//               >
//                 {tech}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Call to Action */}
//         <div className="mt-24 text-center">
//           <h2 className="text-3xl font-bold">Ready to Start Learning?</h2>
//           <p className="mt-4 text-gray-600 dark:text-gray-300">
//             Explore our courses and start your journey today.
//           </p>
//           <a href="/course">
//             <button className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600">
//               Explore Courses
//             </button>
//           </a>
//         </div>

//         {/* Social */}
//         <div className="mt-24 text-center pb-16">
//           <h2 className="text-3xl font-bold">Connect With Us</h2>
//           <div className="mt-6 flex justify-center gap-6 text-pink-500">
//             <a href="#">GitHub</a>
//             <a href="#">LinkedIn</a>
//             <a href="#">Instagram</a>
//           </div>
//         </div>

//       </div>

//       <Footer />
//     </>
//   );
// }

// export default About;


import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function About() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-slate-900 dark:to-slate-900 dark:text-white pt-28 px-6 md:px-20">

        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold">
            About <span className="text-pink-500">LearnHub</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            A modern learning platform built specially for students who want to grow,
            learn new skills, and achieve their dreams. BookStore brings together books,
            courses, and a supportive community in one simple place.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { label: "Students", value: "10k+" },
            { label: "Books", value: "500+" },
            { label: "Courses", value: "100+" },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-xl shadow-lg bg-white dark:bg-slate-800">
              <h2 className="text-4xl font-bold text-pink-500">{item.value}</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="mt-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              Our mission is to make high-quality education available to everyone.
              We believe that every student deserves access to the right books,
              the right courses, and the right guidance. BookStore is designed to
              remove confusion and make learning simple, enjoyable, and effective.
            </p>
          </div>

          <div className="p-8 bg-pink-100 dark:bg-slate-800 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-pink-500">We Believe In</h3>
            <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>✔ Smart learning</li>
              <li>✔ Student success</li>
              <li>✔ Simple design</li>
              <li>✔ Trusted content</li>
            </ul>
          </div>
        </div>

        {/* What We Offer */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center">What We Offer</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "📚 Books",
                desc: "A carefully curated library of academic, technical, and self-improvement books that help students build strong foundations and deep knowledge."
              },
              {
                title: "🎓 Courses",
                desc: "Well-structured online courses designed to guide students step-by-step from beginner to advanced level in different skills."
              },
              {
                title: "🤝 Community",
                desc: "A friendly learning community where students can ask questions, share ideas, and support each other throughout their journey."
              },
            ].map((f, i) => (
              <div key={i} className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:scale-105 transition">
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="mt-3 text-gray-600 dark:text-gray-300">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold">Our Team</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Shalini", role: "Frontend Developer" },
              { name: "Akhilesh", role: "Backend Developer" },
              { name: "Shivani", role: "Content Creator" },
            ].map((m, i) => (
              <div key={i} className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                <div className="w-20 h-20 mx-auto rounded-full bg-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                  {m.name[0]}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{m.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{m.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center">What Students Say</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "BookStore helped me understand concepts in a very simple way.",
              "I improved my coding skills using the courses here.",
              "This platform made learning enjoyable and stress-free.",
            ].map((t, i) => (
              <div key={i} className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                <p className="text-gray-600 dark:text-gray-300">“{t}”</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold">Built With</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            We use modern technologies to make our platform fast, secure and user-friendly.
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            {["React", "Node.js", "MongoDB", "Tailwind CSS"].map((tech, i) => (
              <span key={i} className="px-4 py-2 bg-pink-500 text-white rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold">Ready to Start Learning?</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Join thousands of students who are already growing with BookStore.
            Start your learning journey today.
          </p>
          <a href="/course">
            <button className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600">
              Explore Courses
            </button>
          </a>
        </div>

        {/* Social */}
        <div className="mt-24 text-center pb-16">
          <h2 className="text-3xl font-bold">Connect With Us</h2>
          <div className="mt-6 flex justify-center gap-6 text-pink-500">
            <a href="#">GitHub</a>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default About;
