import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen w-full relative bg-white">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `radial-gradient(circle at top center, rgba(70, 130, 180, 0.5), transparent 70%)`,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10">
        <section className="mx-auto max-w-4xl px-4 py-28 lg:pt-44 lg:pb-32">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <h1>Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: November 1, 2025
            </p>

            <p>
              This Privacy Policy describes our policies and procedures on the
              collection, use and disclosure of your information when you use
              the Service and tells you about your privacy rights and how the
              law protects you.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul>
              <li>Name and contact information</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process and complete transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>
                Send you marketing communications (with your consent where
                required)
              </li>
              <li>Monitor and analyze trends, usage, and activities</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We may share your information in the following circumstances:
            </p>
            <ul>
              <li>
                With service providers who perform services on our behalf
              </li>
              <li>
                When we believe disclosure is necessary to comply with the law
              </li>
              <li>
                To protect the rights, property, and safety of our company,
                users, and others
              </li>
              <li>
                In connection with a merger, sale, or acquisition of all or a
                portion of our business
              </li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information. However, no method of
              transmission over the internet or electronic storage is 100%
              secure.
            </p>

            <h2>Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to or restrict processing of your information</li>
              <li>Data portability</li>
            </ul>

            <h2>Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to track activity
              on our service and store certain information. You can instruct
              your browser to refuse all cookies or to indicate when a cookie is
              being sent.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our service is not intended for children under 13 years of age. We
              do not knowingly collect personal information from children under
              13.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us through our contact page or at:
            </p>
            <p>
              <strong>Email:</strong> privacy@example.com
            </p>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Page;
