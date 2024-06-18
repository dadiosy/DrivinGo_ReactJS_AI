import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogTitle, Divider, LinearProgress } from '@mui/material';
import CategoryCard from '../components/product/CategoryCard';
import ActionButton from '../components/product/ActionButton';
import Image from '../components/product/Image';
import Footer from '../layouts/Footer';
import { getCategoryList, setCategoryConfirmProcess, setCategorySelectProcess, setProductSelectProcess } from '../store/actions/category.action';

export default function Category(props) {
  const {
    categoryDialogOpen,
    setCategoryDialogOpen,
    categoryDialogContent,
    setCategoryDialogContent
  } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, category } = useSelector(({ category }) => category);
  const { language } = useSelector(({ environment }) => environment);
  const [t, i18n] = useTranslation('common');

  const handleDialogOpen = (data) => {
    setCategoryDialogContent(data);
    setCategoryDialogOpen(true);
    dispatch(setCategoryConfirmProcess());
  }

  const handleDialogClose = () => {
    setCategoryDialogOpen(false);
    dispatch(setCategorySelectProcess());
  }

  const openCategory = () => {
    setCategoryDialogOpen(false);
    dispatch(setProductSelectProcess());
    navigate(`/category/${categoryDialogContent.id}`);
  }

  useEffect(() => {
    dispatch(getCategoryList(language));
    dispatch(setCategorySelectProcess());
  }, [dispatch, language]);

  return (
    <>
      {
        isLoading ? (
          <main className='flex justify-center items-center w-full h-full'>
            <LinearProgress className="w-48" />
          </main>
        ) : category.length > 0 ? (
          <main className={'flex flex-col w-full h-full overflow-hidden fade'}>
            <h1 className='font-bold text-5xl px-12 pt-8'>{t('category.title')}</h1>

            <div className='flex flex-wrap w-full h-full p-4'>
              {
                category.map((item) => (
                  <CategoryCard
                    key={item.id}
                    data={item}
                    onClick={handleDialogOpen}
                  />
                ))
              }
            </div>
          </main>
        ) : (
          <main className='flex justify-center items-center w-full h-full'>
            <h1 className='w-full my-8 text-2xl text-center text-gray-400 fade'>{t('category.placeholder')}</h1>
          </main>
        )
      }

      <Dialog open={categoryDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          <p className='font-primary text-primary text-center text-3xl py-4'>{t('category.modal.title')}</p>
        </DialogTitle>

        <DialogContent className='flex flex-col justify-center items-center p-8'>
          <Image
            alt='preview'
            src={categoryDialogContent.imageURL}
            width={320}
            height={320}
          />

          <div className='flex flex-col justify-center items-center w-96'>
            <h1 className='text-2xl mb-2'>{categoryDialogContent.name}</h1>

            <Divider sx={{
              width: "100%",
              height: "1px",
              margin: "12px 0",
              backgroundColor: "silver"
            }} />

            <div className='flex justify-between items-center w-full px-16 py-4'>
              <ActionButton
                imageURL={'/assets/hands/yes.png'}
                text={t('category.modal.yes')}
                className='flex flex-col justify-center items-center cursor-pointer transition-all hover:-translate-y-2'
                onClick={openCategory}
              />

              <ActionButton
                imageURL={'/assets/hands/no.png'}
                text={t('category.modal.no')}
                className='flex flex-col justify-center items-center cursor-pointer transition-all hover:translate-y-2'
                onClick={handleDialogClose}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
