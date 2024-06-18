import { useTranslation } from 'react-i18next';
import Image from '../product/Image';

const OrderList = (props) => {
  const { name, imageURL, price, size, count } = props.data;
  const [t, i18n] = useTranslation('common');

  return (
    <div className="flex justify-between items-center my-4 pongpong-anim">
      <div className="flex justify-between items-center w-full">
        <Image alt={imageURL} src={imageURL} width={48} height={48} className="rounded-sm" />
        <p className="w-16 text-xs">( {t(`product.sizeModal.size.${size}`)} )</p>

        <span className="text-xs">X</span>
        <span>{count}</span>
        <span>=</span>
      </div>

      <div className="w-1/2 text-right">
        <h1>${(price[size] * count).toFixed(2)}</h1>
      </div>
    </div>
  )
}

export default OrderList;