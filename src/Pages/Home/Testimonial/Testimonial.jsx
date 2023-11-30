import Heading from "../../../Components/Heading";

const Testimonial = () => {
  const testimonialsData = [
    {
      text: "I've been using Premium Individual for months and it's fantastic! Highly recommend.",
      author: "Alice Johnson",
    },
    {
      text: "The Premium Family plan is a great value for my whole family. Loving the special content!",
      author: "Bob Smith",
    },
    {
      text: "Premium Duo has exceeded my expectations. The access to premium batches is a game-changer.",
      author: "Eva Williams",
    },
    {
      text: "The free trial of Premium Individual convinced me to become a long-term subscriber.",
      author: "Chris Miller",
    },
    {
      text: "Premium Family is perfect for our family movie nights. Great variety of content!",
      author: "Olivia Davis",
    },
  ];

  return (
    <div>
      <div className="py-10 mt-20 bg-green-100 rounded-xl">
        <div className="container mx-auto">
          <Heading heading={`Testimonial`}></Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center lg:grid-cols-3 md:px-10 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-main-blue-700 text-main-blue-50 rounded-md shadow-md border-2 border-main-blue-500 ">
                <p className="text-black text-lg font-bold mb-4">
                  {testimonial.text}
                </p>
                <p className="font-bold">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
