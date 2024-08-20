"use client";
import {
  compiledChapter,
  getChapters,
  simpleChapter,
  uploadImage,
  uploadImageForCover,
} from "@/store/slices/chatSlice"; //uploadImage
import { Box, CircularProgress } from "@mui/material";
import {
  ContentState,
  //ContentState,
  EditorState,
  Modifier,
  convertFromRaw,
  //convertFromHTML,
  convertToRaw,
} from "draft-js";

import MultiToolTip from "@/__webComponents/tooltip/MultiToolTip";
import MicListing from "@/_assets/svg/mic-listing.svg";
import MicOff from "@/_assets/svg/mic-off.svg";
import MicRegular from "@/_assets/svg/mic-regular.svg";
import TextSave from "@/_assets/svg/save-text-icon.svg";
import { default as GlobelBtn } from "@/components/button/Button";
import TransitionsDialog from "@/components/modal/TransitionDialog";
import {
  getAnswerbyId,
  getQuestionbyId,
  saveAnswer,
  updateChapterResponse,
  updateQuestion,
} from "@/store/slices/chatSlice";
import "core-js/stable";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "regenerator-runtime/runtime";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import backArrow from "../../_assets/svg/left.svg";
import styles from "./styles.module.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const RichText = ({ questionId }) => {
  const router = useRouter();
  let htmlToDraftJs;

  const mediaRecorderRef = useRef(null);
  const dispatch: any = useDispatch();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [questionData, setQuestionData] = useState<any>({});
  const [compileChapter, setCompileChapter] = useState();
  const [isPremium, setIsPremium] = useState(false);
  const [recording, setRecording] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [buyPremium, setBuyPremium] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [userChapter, setUserChapter] = useState("");
  const [gptChapter, setGptChapter] = useState("");
  const [seconds, setSeconds] = useState(0);
  const { compileChapterId, openai } = router.query;
  const { t } = useTranslation();
  const [hover, setHover] = useState(false);
  const loading = useSelector((state: any) => state.chat.loading);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const socket = new WebSocket(
        "wss://api.deepgram.com/v1/listen?smart_format=true&language=en&model=nova-2",
        ["token", process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY]
      );

      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
        if (event.data.size > 0 && socket.readyState === 1) {
          socket.send(event.data);
        }
      });

      mediaRecorderRef.current.addEventListener("start", () => {
        setRecording(true);
      });

      mediaRecorderRef.current.addEventListener("stop", () => {
        setRecording(false);
        setTranscript("");
        setDetecting(false);
        setListening(false);
      });

      socket.onmessage = (message) => {
        const received = JSON.parse(message.data);
        const receivedTranscript =
          received.channel?.alternatives[0]?.transcript;
        if (receivedTranscript && received.is_final) {
          setTranscript(" " + receivedTranscript);
        }
      };

      socket.onopen = () => {
        setDetecting(false);
        setListening(true);
      };

      socket.onclose = () => {};

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      mediaRecorderRef.current.start(1800);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleToggleRecording = () => {
    if (recording) {
      // Stop recording
      mediaRecorderRef.current.stop();
    } else {
      // Start recording
      startRecording();
    }
  };

  const handleSpeechtoText = () => {
    // if (isPremium) {
    setDetecting(true);
    handleToggleRecording();
    // } else {
    // setBuyPremium(true);
    // }
  };

  useEffect(() => {
    const jwt = require("jsonwebtoken");
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      const accessRole = decodedToken?.accessRole;
      if (accessRole === "PremiumPlan" || accessRole === "GoldPlan") {
        setIsPremium(true);
      } else {
        setIsPremium(false);
      }
    }
  }, []);

  useEffect(() => {
    if (compileChapterId) {
      let htmlToDraft = null;
      if (typeof window === "object") {
        htmlToDraft = require("html-to-draftjs").default;
      }
      dispatch(compiledChapter({ id: compileChapterId }))
        .unwrap()
        .then((res) => {
          setCompileChapter(res?.chapter?.title);
          setUserChapter(res?.userText);
          setGptChapter(res?.openaiChapterText);
          const htmlContent =
            openai === "true" ? res?.openaiChapterText : res?.userText;

          const blocksFromHtml = htmlToDraft(htmlContent);
          const { contentBlocks, entityMap } = blocksFromHtml;
          const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
          );
          setEditorState(EditorState.createWithContent(contentState));
        });
    }
  }, [compileChapterId]);

  //destroys recorder instance
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  // consoling editor html
  // useEffect(() => {
  //   console.log(
  //     "html",
  //     draftToHtml(convertToRaw(editorState.getCurrentContent()))
  //   );
  // }, [editorState]);

  //getting question
  useEffect(() => {
    if (questionId) {
      dispatch(getQuestionbyId({ id: questionId }))
        .unwrap()
        .then((res) => setQuestionData(res));
    }
    dispatch(getAnswerbyId({ id: questionId }))
      .unwrap()
      .then((res) => {
        if (res?.muteableState) {
          const contentState = convertFromRaw(
            JSON?.parse(`${res?.muteableState}`)
          );
          setEditorState(EditorState.createWithContent(contentState));
        }
      });
  }, [questionId]);

  //setting transcript in editor
  useEffect(() => {
    if (transcript) {
      const contentState = convertFromRaw({
        blocks: [
          {
            text: editorState + transcript,
            type: "unstyled",
            key: "abc",
            depth: 0, // Add depth property
            inlineStyleRanges: [], // Add inlineStyleRanges property
            entityRanges: [],
          },
        ],
        entityMap: {},
      });

      setEditorState(EditorState.createWithContent(contentState));
    }
    updateEditorWithTranscript();
  }, [transcript]);

  const updateEditorWithTranscript = () => {
    const currentContent = editorState.getCurrentContent();
    const currentSelection = editorState.getSelection();

    const newContent = Modifier.insertText(
      currentContent,
      currentSelection,
      transcript
    );

    const newEditorState = EditorState.push(
      editorState,
      newContent,
      "insert-characters"
    );
    setEditorState(newEditorState);
  };
  // //for grammar
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     if (loading === false) {
  //       import("@webspellchecker/wproofreader-sdk-js").then(
  //         ({ default: WProofreaderSDK }) => {
  //           // Assuming the library has a different initialization method
  //           // WProofreaderSDK.init({
  //           //   container: document.getElementById("draftjs-rich-text-editor"),
  //           //   autoSearch: true,
  //           //   lang: "auto",
  //           //   serviceId: process.env.NEXT_PUBLIC_SPELL_CHECKER_API_KEY,
  //           // });
  //           const container = document.getElementById("draftjs-rich-text-editor");
  //           if (container) {
  //             WProofreaderSDK.init({
  //               container,
  //               autoSearch: true,
  //               lang: "auto",
  //               serviceId: process.env.NEXT_PUBLIC_SPELL_CHECKER_API_KEY,
  //             });
  //           } else {
  //             console.error("Container not found");
  //           }
  //         }
  //       );
  //     }
  //   }
  // }, [loading]); //to import webspellcheckr

  useEffect(() => {
    if (typeof window !== "undefined" && !loading) {
      const initializeWProofreader = async () => {
        try {
          const { default: WProofreaderSDK } = await import(
            "@webspellchecker/wproofreader-sdk-js"
          );
          const container = document.getElementById("draftjs-rich-text-editor");
          if (container) {
            WProofreaderSDK.init({
              container,
              autoSearch: true,
              lang: "auto",
              serviceId: process.env.NEXT_PUBLIC_SPELL_CHECKER_API_KEY,
            });
          } else {
            console.error("Container not found");
          }
        } catch (error) {
          console.error("Failed to initialize WProofreaderSDK:", error);
        }
      };

      initializeWProofreader();
    }
  }, [loading]);

  //autosave answer
  useEffect(() => {
    if (!openai) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 15000);
      if (questionData && questionData?.chapter?._id) {
        saveUserAnswer();
      }

      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }
  }, [seconds]);

  //save answer and chapter
  const saveUserAnswer = () => {
    if (!openai) {
      dispatch(
        saveAnswer({
          questionId: questionData?._id,
          chapterId: questionData?.chapter?._id,
          userText: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          muteableState: JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          ),
        })
      );
    } else {
      const newData = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
      dispatch(
        updateChapterResponse({
          id: compileChapterId,
          userText: openai === "false" ? newData : userChapter,
          openaiChapterText: openai === "true" ? newData : gptChapter,
        })
      )
        .unwrap()
        .then(() => router.push("/dashboard/chapters/completedChapter"));
    }
  };

  //answer completed
  const handleCompleteAnswer = () => {
    dispatch(getChapters()).then(({ payload }) => {
      // const [chapter] = payload.filter(
      //   (chapter) => chapter.introductionChapter || chapter.startDefaultChapter
      // );

      // if (chapter.introductionChapter || chapter.startDefaultChapter) {

      //   dispatch(simpleChapter({ chapterId: chapter?._id }));
      // }

      const introductionChapter = payload.filter(
        (chapter) => chapter.introductionChapter
      );

      if (introductionChapter[0]?.introductionChapter) {
        dispatch(simpleChapter({ chapterId: introductionChapter[0]?._id }));
      }

      const dedicationChapter = payload.filter(
        (chapter) => chapter.startDefaultChapter
      );

      if (dedicationChapter[0]?.startDefaultChapter) {
        dispatch(simpleChapter({ chapterId: dedicationChapter[0]?._id }));
      }
    });

    if (!compileChapterId) {
      saveUserAnswer();
      dispatch(
        updateQuestion({
          text: questionData?.text,
          id: questionData?._id,
          chapter: questionData?.chapter?._id,
          status: "Completed",
        })
      )
        .unwrap()
        .then(() => {
          router.push(
            `/dashboard/chapters/chapterName?chapterId=${questionData?.chapter?._id}`
          );
        })
        .catch(() => toast.error("Failed to mark as complete"));
    } else {
      const editedChapter = {
        id: compileChapterId,
        userText:
          openai === "true"
            ? userChapter
            : draftToHtml(convertToRaw(editorState.getCurrentContent())),
        openaiChapterText:
          openai === "false"
            ? gptChapter
            : draftToHtml(convertToRaw(editorState.getCurrentContent())),
      };
      dispatch(updateChapterResponse(editedChapter))
        .unwrap()
        .then(() => router.push("/dashboard/chapters/completedChapter"))
        .catch(() => toast.error("Failed to save your chapter"));
    }
  };

  //for uploadin image
  //   const uploadCallback = (file) => {
  //     return new Promise((resolve, reject) => {
  //       const reader = new window.FileReader();
  //       reader.onloadend = async () => {
  //         const form_data = new FormData();
  //         form_data.append("image", file);

  //         const res = await dispatch(uploadImage(form_data));

  //         resolve({ data: { link: res.payload } });
  //       };
  //       reader.readAsDataURL(file);
  //     });
  //   };
  const uploadCallback = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader();
      reader.onloadend = async () => {
        const form_data = new FormData();
        form_data.append("image", file);

        try {
          const res = await dispatch(uploadImageForCover(form_data));

          if (res && res.payload) {
            const caption = `Caption: ${file.name}`;
            const imageData = { data: { link: res.payload, caption: caption } };

            resolve(imageData);
          } else {
            reject("Failed to upload image or get image URL.");
          }
        } catch (error) {
          reject(
            error.message || "An error occurred while uploading the image."
          );
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const content = [
    {
      title: "Narrative Fusion:",
      text: "All formatting (bold, size, font, bullets) will be removed when you apply Narrative Fusion after all questions have been answered. Make sure you leave formatting for when all your answers have been fused into a chapter. ",
    },
    {
      title: "Copy-Pasting with Formatting:",
      text: "To retain formatting when copying text from another source, right-click - > ‘’paste and match style’’ or just paste by pressing Shift + V + Ctrl/⌘",
    },
    {
      title: "Typing Special Characters:",
      text: " For special letters, including Spanish characters, hold the key and select the desired character from the popup menu.",
    },
    {
      title: "Grammar and Style Suggestions:",
      text: " Click on any underlined words to see suggestions for grammar, spelling, or style corrections",
    },
  ];

  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 6,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          className="rich-editor"
          sx={{
            border: "1px solid #197065",
            m: { sm: "20px 0 0 ", xs: "15px" },
            borderRadius: "34px",
            padding: {
              xl: "30px 70px 100px",
              sm: "20px 40px 80px",
              xs: "20px 20px 50px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              // alignItems: { md: "center" },
              justifyContent: "space-between",
              flexDirection: { xs: "column" },
              rowGap: "30px",
              pt: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
              }}
            >
              {/* <Image alt="icon" src={PIcon} /> */}

              <Box
                onClick={() => {
                  router.back();
                }}
                sx={{
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "48px",
                  height: "36px",
                  bgcolor: "#fff",
                  border: "1px solid #E1683B",
                  flexShrink: "0",
                }}
              >
                <Image src={backArrow} alt="backArrow" />
              </Box>
              <div className={styles.overflowQuestionText}>
                {questionData?.text ? questionData?.text : compileChapter}
              </div>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  position: "relative",
                  flexWrap: { xs: "wrap", lg: "nowrap" },
                  ml: { sm: "70px", xs: "0" },
                }}
              >
                <GlobelBtn
                  image={
                    detecting ? MicRegular : listening ? MicListing : MicOff
                  }
                  btnText={
                    detecting
                      ? `${t("richText.detecte")}`
                      : listening
                      ? `${t("richText.stop")}`
                      : `${t("richText.STT")}`
                  }
                  color={detecting ? "#E1683B" : listening ? "#fff" : "#E1683B"}
                  bgColor={detecting ? "#fff" : listening ? "#F06262" : "#fff"}
                  border="1px solid #E1683B"
                  onClick={handleSpeechtoText}
                />

                {true && (
                  <GlobelBtn
                    onClick={handleCompleteAnswer}
                    disabled={
                      draftToHtml(convertToRaw(editorState.getCurrentContent()))
                        .length < 9
                    }
                    btnText={`${t("richText.MAC")}`}
                    color="#E1683B"
                    bgColor="#fff"
                    border="1px solid #E1683B"
                  />
                )}
                {true && (
                  <GlobelBtn
                    onClick={() => {
                      toast.success("Your answer has been saved"),
                        saveUserAnswer;
                    }}
                    disabled={
                      draftToHtml(convertToRaw(editorState.getCurrentContent()))
                        .length < 9
                    }
                    image={TextSave}
                    btnText={"Save"}
                    bgColor="#30422E"
                    color="#fff"
                    width="150px"
                  />
                )}
                <Box>
                  <Box
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                  >
                    <InfoOutlinedIcon sx={{ color: "#7F886B" }} />
                  </Box>

                  {hover && (
                    <Box
                      sx={{
                        display: {
                          md: "block",
                          xs: "block",
                        },
                        // position: "absolute",
                        // mt: 1
                      }}
                    >
                      <MultiToolTip
                        content={content}
                        position="absolute"
                        bottom={undefined}
                        right={undefined}
                        top={undefined}
                        left={undefined}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box id="draftjs-rich-text-editor" sx={{ marginTop: "50px" }}>
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              placeholder="Click here to start typing.."
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              editorStyle={{
                borderRadius: "10px",
                minHeight: "65vh",
                maxHeight: "68vh",
                backgroundColor: "white",
                overflowY: "auto",
                padding: "20px",
              }}
              toolbarStyle={{
                minHeight: "50px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center", // Center-align toolbar items horizontally
                alignItems: "center",
              }}
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "fontFamily",
                  "list",
                  "textAlign",
                  "link",
                  "colorPicker",
                  // "emoji",
                  "image",
                  "history",
                ],
                inline: {
                  options: ["bold", "italic", "underline"],
                },
                blockType: {
                  options: [
                    "Normal",
                    "H1",
                    "H2",
                    "H3",
                    "H4",
                    "H5",
                    "H6",
                    "Blockquote",
                    "Code",
                  ],
                },
                fontSize: {
                  options: [
                    8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96,
                  ],
                },
                fontFamily: {
                  options: [
                    "Garamond",
                    "Georgia",
                    "Arial",
                    "Times New Roman",
                    "Verdana",
                    "Merriweather",
                  ],
                },
                list: {
                  options: ["unordered", "ordered"],
                },
                textAlign: {
                  options: ["left", "center", "right"],
                },
                link: {
                  showOpenOptionOnHover: true,
                  defaultTargetOption: "_self",
                  options: ["link"],
                },
                image: {
                  urlEnabled: true,
                  uploadEnabled: true,
                  alignmentEnabled: false,
                  previewImage: true,
                  inputAccept: "image/jpeg,image/jpg,image/png",
                  uploadCallback: uploadCallback,
                  alt: { present: false, mandatory: false },
                  defaultSize: {
                    height: "auto",
                    width: "400px",
                  },
                  caption: {
                    show: true, // Show image caption
                    text: "bottom",
                  },
                },
                history: {
                  inDropdown: false,
                  className: undefined,
                  component: undefined,
                  dropdownClassName: undefined,
                  options: ["undo", "redo"],
                },
              }}
            />
          </Box>
        </Box>
      )}
      {/* 
      <TransitionsDialog
        open={buyPremium}
        heading={`${t("richText.ByPreHeading")}`}
        description={`${t("richText.PreDes")}`}
        cancel={() => {
          setBuyPremium(false);
        }}
        closeModal={() => {
          setBuyPremium(false);
        }}
        proceed={() => router.push("/dashboard/SubscribePlans")}
      /> */}
    </Box>
  );
};

export default RichText;
