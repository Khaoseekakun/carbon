import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Carbon Footprint Calculator',
    description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                    Privacy Policy
                </h1>

                <div className="prose dark:prose-invert max-w-none">
                    <p className="lead mb-8">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                        <p className="mb-4">
                            We collect information that you provide directly to us, including:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Name and contact information</li>
                            <li>Account credentials</li>
                            <li>Carbon footprint calculation data</li>
                            <li>Usage data and preferences</li>
                            <li>Communication preferences</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                        <p className="mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Provide and maintain our services</li>
                            <li>Calculate and track your carbon footprint</li>
                            <li>Personalize your experience</li>
                            <li>Communicate with you about our services</li>
                            <li>Improve our services and develop new features</li>
                            <li>Protect against fraud and abuse</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
                        <p className="mb-4">
                            We do not sell your personal information. We may share your information:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>With your consent</li>
                            <li>To comply with legal obligations</li>
                            <li>To protect our rights and safety</li>
                            <li>With service providers who assist in our operations</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                        <p className="mb-4">
                            We implement appropriate technical and organizational measures to protect your personal information, including:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Encryption of data in transit and at rest</li>
                            <li>Regular security assessments</li>
                            <li>Access controls and authentication</li>
                            <li>Employee training on data protection</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
                        <p className="mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Access your personal information</li>
                            <li>Correct inaccurate information</li>
                            <li>Request deletion of your information</li>
                            <li>Object to processing of your information</li>
                            <li>Withdraw consent</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">6. Cookies and Tracking</h2>
                        <p className="mb-4">
                            We use cookies and similar technologies to:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Remember your preferences</li>
                            <li>Understand how you use our services</li>
                            <li>Improve our services</li>
                            <li>Provide personalized content</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">7. Changes to This Policy</h2>
                        <p className="mb-4">
                            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
                        <p className="mb-4">
                            If you have any questions about this privacy policy, please contact us at:
                        </p>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                            <p>Email: privacy@carboncalc.com</p>
                            <p>Phone: +1 (555) 123-4567</p>
                            <p>Address: 123 Green Street, Eco City, EC 12345</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}