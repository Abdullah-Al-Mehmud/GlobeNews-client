import { useEffect, useState } from "react";

const AllArticles = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("articles.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const approved = data.filter((item) => item?.status === "approved");
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
        {approved?.map((item, idx) => (
          <div key={idx} className="card card-compact  bg-base-100 shadow-xl">
            <figure>
              <img
                src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <p>{item?.publisher}</p>
              <h2 className="card-title">{item?.title}</h2>
              <p>
                {item?.description.length > 100
                  ? item?.description.slice(0, 100)
                  : item?.description}
                ......
              </p>
              <span>
                {item?.tags?.map((t, index) => (
                  <p key={index}>{t}</p>
                ))}
              </span>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArticles;
