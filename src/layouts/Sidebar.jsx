import Webcam from "react-webcam";
import { ReactMic } from 'react-mic';
import { useTranslation } from "react-i18next";
import { Box, Fab, Button, Dialog, DialogContent, Tooltip } from "@mui/material";
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

import OrderPaper from "../components/sidebar/OrderPaper";
import ActionButton from "../components/product/ActionButton";

export default function Sidebar(props) {
  const {
    webcamRef,
    camEnable,
    micEnable,
    listening,
    transcript,
    gestureOutput,
    browserSupportsSpeechRecognition,
    toggleCam,
    toggleMic,
    finishDialogOpen,
    handleFinishDialogOpen,
    handleFinishDialogClose,
    confirmOrder
  } = props;

  const [t, i18n] = useTranslation('common');

  return (
    <>
      <Box className="flex flex-col w-96 h-full p-6 bg-primary text-white">
        <h1 className="text-xl mb-2">{t('sidebar.order.title')}:</h1>
        <OrderPaper />

        <div className="relative w-80 h-96 border-2 rounded-md my-4 bg-gray-500 overflow-hidden">
          {
            camEnable && (
              <Webcam
                ref={webcamRef}
                audio={false}
                className="absolute top-0 left-0 w-full"
                mirrored
              />
            )
          }

          {
            micEnable && (
              <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-white text-black">
                { browserSupportsSpeechRecognition ? <ReactMic record={listening} /> : <p className="text-center text-sm">Browser doesn't support speech recognition.</p> }
              </div>
            )
          }

          <h1 className="absolute top-0 left-0 m-2 text-xl font-bold text-cyan-700">{transcript}</h1>

          <div className="flex justify-center items-center absolute bottom-1 left-0 w-full">
            <Tooltip title={camEnable ? t('sidebar.tooltip.video.enable') : t('sidebar.tooltip.video.disable')} placement="top">
              <Fab size="medium" sx={{ margin: 1 }} onClick={toggleCam}>
                {camEnable ? <VideocamIcon /> : <VideocamOffIcon />}
              </Fab>
            </Tooltip>

            <Tooltip title={micEnable ? t('sidebar.tooltip.mic.enable') : t('sidebar.tooltip.mic.disable')} placement="top">
              <Fab size="medium" sx={{ margin: 1 }} onClick={toggleMic}>
                {micEnable ? <MicIcon /> : <MicOffIcon />}
              </Fab>
            </Tooltip>
          </div>
        </div>

        <Button
          color="primary"
          sx={{
            fontSize: 20,
            fontWeight: "bold",
            width: "100%",
            height: "96px",
            border: "1px solid white",
            margin: "8px 0",
            backgroundColor: "white",
            transition: "all 250ms",
            '&:hover': {
              backgroundColor: "white",
              transform: "scale(1.05)",
              animation: "popup_anim 0.5s infinite"
            }
          }}
          onClick={handleFinishDialogOpen}
        >
          <img alt="finish-image" src={'/assets/hands/finish.png'} width={48} height={48} />
          &nbsp;{t('sidebar.finish.button')}
        </Button>
      </Box>

      <Dialog open={finishDialogOpen} onClose={handleFinishDialogClose}>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 600,
            padding: 48
          }}
        >
          <img alt="banner" src={'/assets/finish_order.png'} width={256} height={256} />
          <h1 className="text-2xl text-primary text-center">{t('sidebar.finish.modal.text')}</h1>

          <div className='flex justify-center items-center w-full pt-12 pb-4'>
            <ActionButton
              imageURL={'/assets/hands/yes.png'}
              text={t('sidebar.finish.modal.yes')}
              className='flex flex-col justify-center items-center mx-16 cursor-pointer transition-all hover:-translate-y-2'
              onClick={confirmOrder}
            />

            <ActionButton
              imageURL={'/assets/hands/no.png'}
              text={t('sidebar.finish.modal.no')}
              className='flex flex-col justify-center items-center mx-16 cursor-pointer transition-all hover:translate-y-2'
              onClick={handleFinishDialogClose}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}