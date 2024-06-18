import { useTranslation } from 'react-i18next';
import Image from './Image';
import { PRODUCT_SIZE } from "../../utils/enums";

const ProductCard = (props) => {
  const { name, imageURL, price, hand } = props.data;
  const [t, i18n] = useTranslation('common');

  return (
    <div className="w-full xl:w-1/2 h-1/3 p-responsive">
      <div
        className="flex justify-between items-center w-full h-full px-6 py-4 shadow-2xl shadow-gray-300 transition-all cursor-pointer rounded-md border-4 border-white bg-white hover:border-orange-500 hover:-translate-y-3 fade-up"
        onClick={() => props.onClick(props.data)}
      >
        <Image
          alt={name}
          src={imageURL}
          width={164}
          height={164}
        />
        
        <div className="flex flex-col justify-center items-center">
          <h1 style={{fontSize:"3vmin",textAlign:"center"}}>{name}</h1>
          <p style={{fontFamily:"cursive", fontSize:"2vmin", fontWeight:500, marginTop:12}}>{t('product.from')} ${price[PRODUCT_SIZE.SMALL]}</p>
        </div>
        
        <img
          alt="hand"
          src={`/assets/hands/${hand}.png`}
          width={100}
          height={100}
          className="my-8"
        />
      </div>
    </div>
  )
}

export default ProductCard;