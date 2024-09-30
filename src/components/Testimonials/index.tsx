import { Testimonial } from "@/types/testimonial";
import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "John M.",
    designation: "Business Owner",
    headline:"Exceptional Service from Start to Finish!",
    content:
      "We couldn’t be happier with the results of our office renovation. The team was professional, communicated with us throughout the process, and delivered exactly what we envisioned. Their attention to detail and commitment to quality were truly impressive. We highly recommend them for any construction project!",
    image: "/images/testimonials/author-01.png",
    star: 5,
  },
  {
    id: 2,
    name: "Mark T",
    designation: "Property Manager",
    content:
      "We’ve been using their maintenance services for over two years now, and they’ve never let us down. From small repairs to larger updates, they’re always on time, efficient, and ensure our property stays in top shape. Their personalized approach and quick response time make all the difference.",
    image: "/images/testimonials/author-02.png",
    star: 5,
  },
  {
    id: 3,
    name: "Emily & John K",
    designation: "Homeowners",
    content:
      "We hired them for a new home construction, and they delivered beyond what we could have imagined. Not only was the quality outstanding, but they also made the entire process stress-free by keeping us informed and involved at every step. Their team’s expertise and dedication to our project were evident from day one.",
    image: "/images/testimonials/author-03.png",
    star: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-1 py-20 dark:bg-dark-2 md:py-[120px]">
      <div className="container px-4">
        <SectionTitle
          subtitle="Testimonials"
          title="What our Client Say"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          width="640px"
          center
        />

        <div className="mt-[60px] flex flex-wrap lg:mt-20 gap-y-8">
          {testimonialData.map((testimonial, i) => (
            <SingleTestimonial key={i} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
