import Image from "./Image";

const CategoryCard = (props) => {
  const { name, imageURL, hand } = props.data;

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/2 p-responsive">
      <div
        className="flex flex-col justify-between items-center w-full h-full py-4 shadow-2xl shadow-gray-300 transition-all cursor-pointer rounded-md border-4 border-white bg-white hover:border-orange-500 hover:-translate-y-3 fade-up"
        onClick={() => props.onClick(props.data)}
      >
        <Image
          alt={name}
          src={imageURL}
          width={128}
          height={128}
        />
        
        <h1 style={{fontSize:"2.5vmin",textAlign:"center"}}>{name}</h1>
        
        <img
          alt="hand"
          src={`/assets/hands/${hand}.png`}
          width={100}
          height={100}
          className="mb-8"
        />
      </div>
    </div>
  )
}

export default CategoryCard;