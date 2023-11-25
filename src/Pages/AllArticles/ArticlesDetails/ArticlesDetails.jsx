import { useLoaderData } from "react-router-dom";

const ArticlesDetails = () => {
  const articles = useLoaderData();
  const { title, publisher, description, image, hashtags } = articles;
  return (
    <div className="max-w-6xl mx-auto py-10">
      <div>
        <h1 className="text-center font-bold text-4xl">{title}</h1>
      </div>
      <div className="flex justify-center mt-16">
        <img src={image} className="rounded-xl" alt="" />
      </div>
      <div className="flex justify-evenly gap-5 mt-10">
        <div>
          <p className="font-bold text-lg"> Publisher : {publisher}</p>
        </div>
        <div>
          <p className="font-bold flex gap-3 text-lg">
            {hashtags?.map((tag, idx) => (
              <p key={idx}>{tag}</p>
            ))}
          </p>
        </div>
      </div>
      <div className="mt-10">
        <p className="font-bold text-xl">{description}</p>
      </div>
    </div>
  );
};

export default ArticlesDetails;
