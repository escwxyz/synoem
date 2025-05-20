import { SimpleInquiryForm } from "~/components/simple-inquiry-form.client";

export default function HomePage() {
  return (
    <>
      <section className="py-20 grid place-items-center">
        {/* <Suspense fallback={<div>Loading</div>}>
          <Testimonials limit={4} />
        </Suspense> */}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-24 px-20">
        <div>
          <h2 className="text-2xl font-bold">Ready to Transform Your Energy Future?</h2>
          <p className="text-sm text-gray-500">
            Join thousands of organizations and homeowners who have revolutionized their energy
            consumption with our innovative solar solutions. Our team of experts is ready to design
            a custom solution for your specific needs.
          </p>
        </div>
        <div className="flex justify-center">
          <SimpleInquiryForm />
        </div>
      </section>
    </>
  );
}
