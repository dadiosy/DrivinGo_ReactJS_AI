import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Divider } from '@mui/material';
import OrderList from "./OrderItem";

const OrderPaper = () => {
  const { list, total } = useSelector(({ orderlist }) => orderlist);
  const [t, i18n] = useTranslation('common');

  return (
    <div
      className="w-full h-full border rounded-md p-2 text-black overflow-auto"
      style={{ backgroundImage: "url(/assets/order_paper.jpg)" }}
    >
      {
        list.length > 0 ? (
          <div className="flex flex-col w-full h-full p-4">
            <div className="w-full">
              {
                list.map((item) => (
                  <OrderList key={item.id} data={item} />
                ))
              }
            </div>

            <Divider />
            <h1 className="text-right text-xl mt-2 pb-4">{t('sidebar.order.total')}: ${total.toFixed(2)}</h1>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <h1 className="text-2xl text-gray-400">{t('sidebar.order.placeholder')}</h1>
          </div>
        )
      }
    </div>
  )
}

export default OrderPaper;