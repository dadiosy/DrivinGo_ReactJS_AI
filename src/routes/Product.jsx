import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle, Divider, Table, TableBody, TableCell, TableRow, LinearProgress, Button } from '@mui/material';
import ProductCard from '../components/product/ProductCard';
import ActionButton from '../components/product/ActionButton';
import Image from '../components/product/Image';
import Footer from '../layouts/Footer';
import { addOrder } from '../store/actions/orderlist.action';
import { getCategoryById, setCategorySelectProcess, setCountSelectProcess, setProductConfirmProcess, setProductSelectProcess, setSizeSelectProcess } from '../store/actions/category.action';
import { PRODUCT_SIZE } from '../utils/enums';

export default function Product(props) {
  const {
    sizeDialogOpen,
    setSizeDialogOpen,
    countDialogOpen,
    setCountDialogOpen,
    confirmDialogOpen,
    setConfirmDialogOpen,
    product,
    setProduct,
    order,
    setOrder
  } = props;

  const dispatch = useDispatch();
  const { isLoading, products } = useSelector(({ category }) => category);
  const { language } = useSelector(({ environment }) => environment);

  const { id } = useParams();
  const navigate = useNavigate();
  const [t, i18n] = useTranslation('common');

  const handleSizeDialogOpen = (data) => {
    setProduct(data);
    setSizeDialogOpen(true);
    dispatch(setSizeSelectProcess());
  }

  const handleSizeDialogClose = () => {
    setSizeDialogOpen(false);
    dispatch(setProductSelectProcess());
  }

  const handleCountDialogClose = () => {
    setCountDialogOpen(false);
    dispatch(setProductSelectProcess());
  }

  const handleConfirmDialogClose = () => {
    setOrder({ ...order, count: 0 });
    setConfirmDialogOpen(false);
    setCountDialogOpen(true);
    dispatch(setCountSelectProcess());
  }

  const selectSize = (size) => {
    setOrder({
      ...order,
      ...product,
      size
    });

    setSizeDialogOpen(false);
    setCountDialogOpen(true);
    dispatch(setCountSelectProcess());
  }

  const selectCount = (count) => {
    setOrder({ ...order, count });
    setCountDialogOpen(false);
    setConfirmDialogOpen(true);
    dispatch(setProductConfirmProcess());
  }

  const addOrderlist = () => {
    dispatch(addOrder(order));
    dispatch(setCategorySelectProcess());
    setConfirmDialogOpen(false);
    navigate('/');
  }

  useEffect(() => {
    dispatch(getCategoryById(language, id));
    dispatch(setProductSelectProcess());
  }, [dispatch, id, language]);

  return (
    <>
      {
        isLoading ? (
          <main className='flex justify-center items-center w-full h-full'>
            <LinearProgress className='w-48' />
          </main>
        ) : products.length > 0 ? (
          <main className={'flex flex-col w-full h-full overflow-hidden fade'}>
            <div className='flex justify-between items-center px-12 pt-8'>
              <h1 className='font-bold text-5xl'>{t('product.title')}</h1>
              <Button color='primary' variant='outlined' sx={{ fontWeight: 'bold', fontSize: 20 }} onClick={() => navigate('/')}>
                <img src={'/assets/hands/back.png'} width={48} height={48} />
                <p className='ml-2'>Back</p>
              </Button>
            </div>

            <div className='flex flex-wrap w-full h-full p-4'>
              {
                products.map((item) => (
                  <ProductCard
                    key={item.id}
                    data={item}
                    onClick={handleSizeDialogOpen}
                  />
                ))
              }

              {
                products.length < 6 && Array.from({ length: 6 - products.length }, (_, index) => (
                  <div key={index} className="w-full xl:w-1/2 h-1/3 p-4"></div>
                ))
              }
            </div>
          </main>
        ) : (
          <main className='flex justify-center items-center w-full h-full'>
            <h1 className='w-full my-8 text-2xl text-center text-gray-400 fade'>{t('product.placeholder')}</h1>
          </main>
        )
      }

      <Dialog open={sizeDialogOpen} onClose={handleSizeDialogClose}>
        <DialogTitle>
          <p className='font-primary text-primary text-center text-3xl py-4'>{t('product.sizeModal.title')}</p>
        </DialogTitle>

        <DialogContent className='flex flex-col justify-center items-center p-8'>
          <Image
            alt='preview'
            src={product.imageURL}
            width={320}
            height={320}
          />

          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-2xl mb-2'>{product.name}</h1>

            <Divider sx={{
              width: "100%",
              height: "1px",
              margin: "12px 0",
              backgroundColor: "silver"
            }} />

            <div className='flex justify-between items-center w-full px-4 py-4'>
              <ActionButton
                imageURL={'/assets/hands/size_small.png'}
                text={`${t('product.sizeModal.size.small')} ($${product.price[PRODUCT_SIZE.SMALL]})`}
                className='flex flex-col justify-center items-center cursor-pointer mx-8 transition-all hover:scale-110'
                onClick={() => selectSize(PRODUCT_SIZE.SMALL)}
              />

              <ActionButton
                imageURL={'/assets/hands/size_medium.png'}
                text={`${t('product.sizeModal.size.medium')} ($${product.price[PRODUCT_SIZE.MEDIUM]})`}
                className='flex flex-col justify-center items-center cursor-pointer mx-8 transition-all hover:scale-110'
                onClick={() => selectSize(PRODUCT_SIZE.MEDIUM)}
              />

              <ActionButton
                imageURL={'/assets/hands/size_large.png'}
                text={`${t('product.sizeModal.size.large')} ($${product.price[PRODUCT_SIZE.LARGE]})`}
                className='flex flex-col justify-center items-center cursor-pointer mx-8 transition-all hover:scale-110'
                onClick={() => selectSize(PRODUCT_SIZE.LARGE)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={countDialogOpen} onClose={handleCountDialogClose}>
        <DialogTitle>
          <p className='font-primary text-primary text-center text-3xl py-4'>{t('product.countModal.title')}</p>
        </DialogTitle>

        <DialogContent className='flex justify-center items-center p-8'>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            width: 600
          }}>
            {
              Array.from({ length: 9 }, (_, index) => (
                <div key={index} className='flex justify-center items-center basis-1/3 py-4'>
                  <ActionButton
                    imageURL={`/assets/hands/${index + 1}.png`}
                    text={index + 1}
                    className='flex flex-col justify-center items-center cursor-pointer transition-all hover:scale-110'
                    onClick={() => selectCount(index + 1)}
                  />
                </div>
              ))
            }
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
        <DialogTitle>
          <p className='font-primary text-primary text-center text-3xl py-4'>{t('product.confirmModal.title')}</p>
        </DialogTitle>

        <DialogContent className='flex justify-center items-center p-8'>
          <div className='flex flex-col justify-center items-center w-96 p-4'>
            <Image
              alt={order.imageURL}
              src={order.imageURL}
              width={320}
              height={320}
            />

            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>{t('product.confirmModal.table.cell1')}</TableCell>
                  <TableCell>{order.name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>{t('product.confirmModal.table.cell2')}</TableCell>
                  <TableCell>{t(`product.sizeModal.size.${order.size}`)}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>{t('product.confirmModal.table.cell3')}</TableCell>
                  <TableCell>${order.price[order.size]}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>{t('product.confirmModal.table.cell4')}</TableCell>
                  <TableCell>{order.count}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>{t('product.confirmModal.table.cell5')}</TableCell>
                  <TableCell>${(order.price[order.size] * order.count).toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <Divider orientation='vertical' className='mx-4' flexItem />

          <div className='flex flex-col justify-center items-center p-8'>
            <ActionButton
              imageURL={'/assets/hands/yes.png'}
              text={t('product.confirmModal.yes')}
              className='flex flex-col justify-center items-center my-12 cursor-pointer transition-all hover:-translate-y-2'
              onClick={addOrderlist}
            />

            <ActionButton
              imageURL={'/assets/hands/no.png'}
              text={t('product.confirmModal.no')}
              className='flex flex-col justify-center items-center my-12 cursor-pointer transition-all hover:translate-y-2'
              onClick={handleConfirmDialogClose}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
