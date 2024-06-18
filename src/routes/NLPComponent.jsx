import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";
import Swal from 'sweetalert2';

import Sidebar from "../layouts/Sidebar";
import Navbar from '../layouts/Navbar';
import Category from './Category';
import Product from "./Product";

import LetterModel from '../utils/gesture_recognizer.task';
import { PROCESS, PRODUCT_SIZE, SIZE_GESTURE } from "../utils/enums";
import { recognizeGestureType, recognizeSelectionType, recognizerSelectSpeech } from "../utils/functions";

import {
  setCategoryConfirmProcess,
  setCategorySelectProcess,
  setCountSelectProcess,
  setOrderConfirmProcess,
  setProductConfirmProcess,
  setProductSelectProcess,
  setSizeSelectProcess
} from "../store/actions/category.action";
import { addOrder, endOrder } from "../store/actions/orderlist.action";

export default function NLPComponent() {
  const dispatch = useDispatch();
  const { list, total } = useSelector(({ orderlist }) => orderlist);
  const { language } = useSelector(({ environment }) => environment);
  const { category, products, process: selectionProcess } = useSelector(({ category }) => category);
  const [t, i18n] = useTranslation('common');

  const webcamRef = useRef();
  const requestRef = useRef();
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [runningMode, setRunningMode] = useState("IMAGE");
  const [gestureRecognizer, setGestureRecognizer] = useState(null);
  const [detectedData, setDetectedData] = useState([]);
  const [gestureOutput, setGestureOutput] = useState('');
  const [camEnable, setCamEnable] = useState(false);
  const [micEnable, setMicEnable] = useState(false);

  // Dialog data
  const [finishDialogOpen, setFinishDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [categoryDialogContent, setCategoryDialogContent] = useState({
    id: '0',
    name: '',
    imageURL: '',
    hand: ''
  });

  const [sizeDialogOpen, setSizeDialogOpen] = useState(false);
  const [countDialogOpen, setCountDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const [product, setProduct] = useState({
    id: '0',
    categoryId: '',
    name: '',
    imageURL: '',
    hand: '',
    price: [0, 0, 0]
  });

  const [order, setOrder] = useState({
    id: '0',
    categoryId: '',
    name: '',
    imageURL: '',
    price: [0, 0, 0],
    size: PRODUCT_SIZE.NONE,
    count: 0
  });

  const navigate = useNavigate();
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Prevent infinite console
  if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production") {
    console.log = function () { }
    console.warn = function () { }
    console.error = function () { }
  }

  // Hand gesture recognition
  const predictWebcam = useCallback(() => {
    if (runningMode === "IMAGE") {
      setRunningMode("VIDEO");
      gestureRecognizer.setOptions({ runningMode: "VIDEO" });
    }

    let nowInMs = Date.now();
    const results = gestureRecognizer.recognizeForVideo(webcamRef.current.video, nowInMs);

    if (results.gestures.length > 0) {
      setDetectedData((prevData) => [...prevData, { SignDetected: results.gestures[0][0].categoryName }]);
      setGestureOutput(results.gestures[0][0].categoryName);
    } else {
      setGestureOutput("");
    }

    if (webcamRunning) {
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  }, [webcamRunning, runningMode, gestureRecognizer, setGestureOutput]);

  const animate = useCallback(() => {
    requestRef.current = requestAnimationFrame(animate);
    predictWebcam();
  }, [predictWebcam]);

  const enableCam = useCallback(() => {
    if (webcamRunning) {
      setWebcamRunning(false);
      cancelAnimationFrame(requestRef.current);
      setDetectedData([]);
    } else {
      setWebcamRunning(true);
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [webcamRunning, gestureRecognizer, animate, detectedData]);

  const toggleCam = () => {
    if (camEnable) {
      setWebcamRunning(false);
      cancelAnimationFrame(requestRef.current);
      setDetectedData([]);
      setCamEnable(false);
    } else {
      setMicEnable(false);
      setCamEnable(true);
      setTimeout(() => enableCam(), 2000);
    }
  }

  async function loadGestureRecognizer(model) {
    const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm");
    const recognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: model,
        delegate: "CPU"
      },
      numHands: 2,
      runningMode: "VIDEO"
    });
    setGestureRecognizer(recognizer);
  }

  useEffect(() => {
    loadGestureRecognizer(LetterModel);
  }, []);

  useEffect(() => {
    switch (selectionProcess) {
      case PROCESS.SELECT_CATEGORY: {
        if (gestureOutput === 'finish') {
          handleFinishDialogOpen();
        } else {
          category.map(item => {
            if (item.hand === gestureOutput) {
              setCategoryDialogOpen(true);
              setCategoryDialogContent(item);
              dispatch(setCategoryConfirmProcess());
            }
          });
        }
        break;
      }
      case PROCESS.CONFIRM_CATEGORY: {
        if (gestureOutput === 'confirm') {
          setCategoryDialogOpen(false);
          dispatch(setProductSelectProcess());
          navigate(`/category/${categoryDialogContent.id}`);
        } else if (gestureOutput === 'cancel') {
          setCategoryDialogOpen(false);
          dispatch(setCategorySelectProcess());
        }
        break;
      }
      case PROCESS.SELECT_PRODUCT: {
        if(gestureOutput === 'back') {
          navigate('/');
        } else {
          products.map(item => {
            if (item.hand === gestureOutput) {
              setProduct(item);
              setSizeDialogOpen(true);
              dispatch(setSizeSelectProcess());
            }
          });
        }
        break;
      }
      case PROCESS.SELECT_SIZE: {
        if (recognizeGestureType(gestureOutput) === 'size') {
          setOrder({
            ...order,
            ...product,
            size: SIZE_GESTURE[gestureOutput]
          });

          setSizeDialogOpen(false);
          setCountDialogOpen(true);
          dispatch(setCountSelectProcess());
        }
        break;
      }
      case PROCESS.SELECT_COUNT: {
        if (recognizeGestureType(gestureOutput) === 'count') {
          setOrder({
            ...order,
            count: Number(gestureOutput)
          });
          setCountDialogOpen(false);
          setConfirmDialogOpen(true);
          dispatch(setProductConfirmProcess());
        }
        break;
      }
      case PROCESS.CONFIRM_PRODUCT: {
        if (gestureOutput === 'confirm') {
          dispatch(addOrder(order));
          dispatch(setCategorySelectProcess());
          setConfirmDialogOpen(false);
          navigate('/');
        } else if (gestureOutput === 'cancel') {
          setOrder({ ...order, count: 0 });
          setConfirmDialogOpen(false);
          setCountDialogOpen(true);
          dispatch(setCountSelectProcess());
        }
        break;
      }
      case PROCESS.CONFIRM_ORDER: {
        if (gestureOutput === 'confirm') {
          confirmOrder();
        } else if (gestureOutput === 'cancel') {
          setFinishDialogOpen(false);
          dispatch(setCategorySelectProcess());
        }
        break;
      }
      default: { }
    }
  }, [gestureOutput]);


  // Speech recognition
  const toggleMic = () => {
    if (micEnable) {
      setMicEnable(false);
      SpeechRecognition.stopListening();
    } else {
      cancelAnimationFrame(requestRef.current);
      setCamEnable(false);
      setMicEnable(true);
      SpeechRecognition.startListening({ continuous: true, language: language.value });
    }
  }

  useEffect(() => {
    if (transcript.length > 0) {
      switch (selectionProcess) {
        case PROCESS.SELECT_CATEGORY: {
          if (recognizerSelectSpeech(language.name, transcript) === 'finish') {
            resetTranscript();
            handleFinishDialogOpen();
          } else {
            category.map(item => {
              if (item.name.toLowerCase() === transcript) {
                setCategoryDialogOpen(true);
                setCategoryDialogContent(item);
                dispatch(setCategoryConfirmProcess());
                resetTranscript();
              }
            });
          }
          break;
        }
        case PROCESS.CONFIRM_CATEGORY: {
          if (recognizerSelectSpeech(language.name, transcript) === 'confirm') {
            setCategoryDialogOpen(false);
            dispatch(setProductSelectProcess());
            resetTranscript();
            navigate(`/category/${categoryDialogContent.id}`);
          } else if (recognizerSelectSpeech(language.name, transcript) === 'cancel') {
            setCategoryDialogOpen(false);
            dispatch(setCategorySelectProcess());
            resetTranscript();
          }
          break;
        }
        case PROCESS.SELECT_PRODUCT: {
          if(recognizerSelectSpeech(language.name, transcript) === 'back') {
            navigate('/');
          } else {
            products.map(item => {
              if (item.name.toLowerCase() === transcript) {
                setProduct(item);
                setSizeDialogOpen(true);
                dispatch(setSizeSelectProcess());
                resetTranscript();
              }
            });
          }
          break;
        }
        case PROCESS.SELECT_SIZE: {
          if (recognizerSelectSpeech(language.name, transcript) === 'back') {
            setSizeDialogOpen(false);
            dispatch(setProductSelectProcess());
          } else {
            if (recognizeSelectionType(language.name, transcript) === 'size') {
              setOrder({
                ...order,
                ...product,
                size: recognizerSelectSpeech(language.name, transcript)
              });
  
              setSizeDialogOpen(false);
              setCountDialogOpen(true);
              dispatch(setCountSelectProcess());
              resetTranscript();
            }
          }
          break;
        }
        case PROCESS.SELECT_COUNT: {
          if (recognizeSelectionType(language.name, transcript) === 'count') {
            setOrder({
              ...order,
              count: Number(recognizerSelectSpeech(language.name, transcript))
            });
            setCountDialogOpen(false);
            setConfirmDialogOpen(true);
            dispatch(setProductConfirmProcess());
            resetTranscript();
          }
          break;
        }
        case PROCESS.CONFIRM_PRODUCT: {
          if (recognizerSelectSpeech(language.name, transcript) === 'confirm') {
            dispatch(addOrder(order));
            dispatch(setCategorySelectProcess());
            resetTranscript();
            setConfirmDialogOpen(false);
            navigate('/');
          } else if (recognizerSelectSpeech(language.name, transcript) === 'cancel') {
            setOrder({ ...order, count: 0 });
            setConfirmDialogOpen(false);
            setCountDialogOpen(true);
            dispatch(setCountSelectProcess());
            resetTranscript();
          }
          break;
        }
        case PROCESS.CONFIRM_ORDER: {
          if (recognizerSelectSpeech(language.name, transcript) === 'confirm') {
            confirmOrder();
            resetTranscript();
          } else if (recognizerSelectSpeech(language.name, transcript) === 'cancel') {
            setFinishDialogOpen(false);
            dispatch(setCategorySelectProcess());
            resetTranscript();
          }
          break;
        }
        default: {  }
      }

      setTimeout(() => resetTranscript(), 1000);
    }
  }, [transcript]);

  useEffect(() => {
    if(micEnable) {
      SpeechRecognition.startListening({ continuous: true, language: language.value });
    }
  }, [language]);


  // Finish order
  const handleFinishDialogOpen = () => {
    if (list.length > 0 && total > 0) {
      setFinishDialogOpen(true);
      dispatch(setOrderConfirmProcess());
    } else {
      Swal.fire({
        icon: "warning",
        toast: true,
        position: "top-right",
        text: t('sidebar.finish.error'),
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    }
  }

  const handleFinishDialogClose = () => {
    setFinishDialogOpen(false);
    dispatch(setCategorySelectProcess());
  }

  const confirmOrder = () => {
    dispatch(setCategorySelectProcess());
    cancelAnimationFrame(requestRef.current);
    setMicEnable(false);
    setCamEnable(false);
    dispatch(endOrder());
    navigate('/success');
  }

  // Sidebar methods
  const sidebarMethods = {
    webcamRef,
    camEnable,
    micEnable,
    listening,
    transcript,
    browserSupportsSpeechRecognition,
    gestureOutput,
    toggleCam,
    toggleMic,
    finishDialogOpen,
    handleFinishDialogOpen,
    handleFinishDialogClose,
    confirmOrder
  };

  const categoryMethods = {
    categoryDialogOpen,
    setCategoryDialogOpen,
    categoryDialogContent,
    setCategoryDialogContent
  };

  const productMethods = {
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
  };

  return (
    <main className={'flex w-full h-screen'}>
      <Sidebar {...sidebarMethods} />

      <div className='flex flex-col w-full'>
        <Navbar />

        <Routes>
          <Route exact path={'/'} element={<Category {...categoryMethods} />} />
          <Route exact path={'/category/:id'} element={<Product {...productMethods} />} />
        </Routes>
      </div>
    </main>
  )
}