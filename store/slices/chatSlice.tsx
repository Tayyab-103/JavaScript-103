import { UserData } from "@/interface/authInterface";
import { chatWithgpt } from "@/interface/chatInterface";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {
  GetReferralCodeApi,
  VerifyReferralCodeApi,
  addChildApi,
  addParentApi,
  bookCoverApi,
  bookTitleApi,
  chapterResponseApi,
  chatApi,
  cloneTemplateApi,
  compiledChapterApi,
  createChapterApi,
  createQuestionApi,
  createtocApi,
  customerSupportApi,
  deleteChapterApi,
  deleteQuestionApi,
  getAnswerbyIdApi,
  getAnswersApi,
  getBookCoverApi,
  getBookTitleApi,
  getChapterNotificationsApi,
  getChapterbyIdApi,
  getChaptersApi,
  getHourApi,
  getOpenaiQuestionApi,
  getQuestionbyIdApi,
  getQuestionsApi,
  getTemplatesApi,
  getTemplatesApiMain,
  getTocApi,
  getTreeDataApi,
  getaiQuestionsApi,
  isTemplateClonedApi,
  luluPrintingApi,
  narrativeFusionApi,
  openaiQuestionApi,
  readNotificationApi,
  resetTreeDataApi,
  saveAnswerApi,
  selectedChaptersApi,
  simpleChapterApi,
  stripPaymentApi,
  stripPaymentInAppGiftFlowApi,
  stripPaymentRegisterApi,
  updateBookApi,
  updateBookCoverApi,
  updateChapterApi,
  updateChapterResponseApi,
  updatePartnerApi,
  updateQuestionApi,
  uploadAudioApi,
  uploadImageApi,
  uploadImageApiFamilyTree,
  setBookDataApi,
  getBookDataApi,
  uploadImageCloudinaryApi,
} from "../api/chatApi";

interface State {
  chats: any[];
  chapters: any[];
  questions: any[];
  templates: any[];
  notifications: any[];
  answers: any[];
  coverData: any[];
  chapter: any;
  chapterLoading: any;
  tocData: any;
  treeData: any;
  loading: boolean;
}

const initialState: State = {
  chats: [],
  chapters: [],
  questions: [],
  templates: [],
  notifications: [],
  coverData: [],
  answers: [],
  chapter: {},
  tocData: {},
  treeData: {},
  chapterLoading: "",
  loading: null,
};

export const gptChat = createAsyncThunk<UserData, chatWithgpt>(
  "chat/gpt-chat",
  async (data: any) => {
    try {
      const response = await chatApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const createChapter = createAsyncThunk<UserData, any>(
  "chat/create-chapter",
  async (data: { title: string }) => {
    try {
      const response = await createChapterApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const luluPrinting = createAsyncThunk<UserData, any>(
  "chat/lulu-printing",
  async (data: any) => {
    try {
      const response = await luluPrintingApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const customerSupport = createAsyncThunk<UserData, any>(
  "chat/create-chapter",
  async (data: { subject: string; description }) => {
    try {
      const response = await customerSupportApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const stripePayment = createAsyncThunk<UserData, any>(
  "chat/stripe-payment",
  async (data: any) => {
    try {
      const response = await stripPaymentApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);
export const stripePaymentRegister = createAsyncThunk<UserData, any>(
  "chat/stripe-payment",
  async (data: any) => {
    try {
      const response = await stripPaymentRegisterApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);
export const stripePaymentInAppGiftFlow = createAsyncThunk<UserData, any>(
  "chat/stripe-payment-In-APP-Gift-Flow",
  async (data: any) => {
    try {
      const response = await stripPaymentInAppGiftFlowApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);
export const VerifyReferralCode = createAsyncThunk<UserData, any>(
  "chat/verify-referralcode",
  async (data: any) => {
    try {
      const response = await VerifyReferralCodeApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const openaiQuestion = createAsyncThunk<UserData, any>(
  "chat/openai-question",
  async (data: { chapterId: string; flag: string; id: string }) => {
    try {
      const response = await openaiQuestionApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const getOpenaiQuestion = createAsyncThunk<UserData, any>(
  "chat/openai-question",
  async (data: { chapterId: string; questionId: string }) => {
    try {
      const response = await getOpenaiQuestionApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const getAnswers = createAsyncThunk<any[], void>(
  "chat/get-answers",
  async () => {
    try {
      const response = await getAnswersApi();
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const getaiQuestions = createAsyncThunk<any, any>(
  "chat/get-aiquestions",
  async (data: { chapterId: string }) => {
    try {
      const response = await getaiQuestionsApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const getHours = createAsyncThunk<any[], void>(
  "chat/get-hours",
  async () => {
    try {
      const response = await getHourApi();
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const getChapterNotifications = createAsyncThunk<any, void>(
  "chat/chapter-notifications",
  async () => {
    try {
      const response = await getChapterNotificationsApi();
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const getToc = createAsyncThunk<any[], void>(
  "chat/get-toc",
  async () => {
    try {
      const response = await getTocApi();
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const createToc = createAsyncThunk<UserData, any>(
  "chat/create-toc",
  async (data: any) => {
    try {
      const response = await createtocApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const updateChapterResponse = createAsyncThunk<UserData, any>(
  "chat/update-chapter-response",
  async (data: { id: string; userText: string; openaiChapterText: string }) => {
    try {
      const response = await updateChapterResponseApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const compiledChapter = createAsyncThunk<UserData, any>(
  "chat/compiled-chapter",
  async (data: { id: string }) => {
    try {
      const response = await compiledChapterApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const simpleChapter = createAsyncThunk<UserData, any>(
  "chat/simple-chapter",
  async (data: { chapterId: string }) => {
    try {
      const response = await simpleChapterApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const uploadImage = createAsyncThunk<UserData, any>(
  "chat/upload-image",
  async (data) => {
    try {
      const response = await uploadImageApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const uploadImageWithCloudinary = createAsyncThunk<UserData, any>(
  "chat/upload-image",
  async (data) => {
    try {
      const response = await uploadImageCloudinaryApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const uploadImageFamilyTree = createAsyncThunk<UserData, any>(
  "chat/upload-image",
  async (data) => {
    try {
      const response = await uploadImageApiFamilyTree(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);



export const setBookData = createAsyncThunk<UserData, any>(
  "chat/book",
  async (data) => {
    try {
      const response = await setBookDataApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const getBookData = createAsyncThunk(
  "chat/book",
  async () => {
    try {
      const response = await getBookDataApi();
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);


export const uploadAudio = createAsyncThunk<UserData, any>(
  "chat/upload-audio",
  async (data) => {
    try {
      const response = await uploadAudioApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const chapterResponse = createAsyncThunk<UserData, any>(
  "chat/chapter-response",
  async (data: { chapterId: string }) => {
    try {
      const response = await chapterResponseApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const saveAnswer = createAsyncThunk<UserData, any>(
  "chat/save-answer",
  async (data: any) => {
    try {
      const response = await saveAnswerApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const bookCover = createAsyncThunk<UserData, any>(
  "chat/book-cover",
  async (data: {
    coverNumber: string;
    title: string;
    subTitle: string;
    byLine: string;
    color: string;
    image: string;
    coverPagePhoto: string;
  }) => {
    try {
      const response = await bookCoverApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const updateBookCover = createAsyncThunk<UserData, any>(
  "chat/book-cover-update",
  async (data: {
    id: string;
    CoverNumber: string;
    title: string;
    subTitle: string;
    byLine: string;
    color: string;
    image: string;
    coverPagePhoto: string;
  }) => {

    try {
      const response = await updateBookCoverApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const updateBook = createAsyncThunk<UserData, any>(
  "chat/-book-update",
  async (data: any) => {
    try {
      const response = await updateBookApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const updatePartner = createAsyncThunk<any, any>(
  "chat/partner-update",
  async (data: {
    spouseDied?: string;
    spouseBorn?: string;
    spouseLocation?: string;
    spouseName?: string;
    spouseGender?: string;
    spouseImage?: string;
    died?: string;
    born?: string;
    location?: string;
    name?: string;
    gender?: string;
    image?: string;
    nodeId?: string;
  }) => {
    try {
      const response = await updatePartnerApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const addChildren = createAsyncThunk<any, any>(
  "chat/add-children",
  async (data: {
    spouseDied?: string;
    spouseBorn?: string;
    spouseLocation?: string;
    spouseName?: string;
    spouseGender?: string;
    spouseImage?: string;
    died?: string;
    born?: string;
    location?: string;
    name?: string;
    gender?: string;
    image?: string;
    nodeId?: string;
  }) => {
    try {
      const response = await addChildApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const addParent = createAsyncThunk<any, any>(
  "chat/add-parent",
  async (data: {
    spouseDied?: string;
    spouseBorn?: string;
    spouseLocation?: string;
    spouseName?: string;
    spouseGender?: string;
    spouseImage?: string;
    died?: string;
    born?: string;
    location?: string;
    name?: string;
    gender?: string;
    image?: string;
  }) => {
    try {
      const response = await addParentApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const getBookCover = createAsyncThunk<any[], void>(
  "chat/getBook-cover",
  async () => {
    try {
      const response = await getBookCoverApi();
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const getTreeData = createAsyncThunk<any[], void>(
  "chat/tree-data",
  async () => {
    try {
      const response = await getTreeDataApi();
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const resetTreeData = createAsyncThunk<any[], void>(
  "chat/tree-data",
  async () => {
    try {
      const response = await resetTreeDataApi();
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const narrativeFusion = createAsyncThunk<UserData, any>(
  "chat/narrative-fusion",
  async (data: any) => {
    try {
      const response = await narrativeFusionApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const bookTitle = createAsyncThunk<UserData, { title: string }>(
  "chat/book-title",
  async (data: { title: string }) => {
    try {
      const response = await bookTitleApi(data);
      return response.data; // Assuming your API response has a 'data' property
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const updateChapter = createAsyncThunk<UserData, any>(
  "chat/update-chapter",
  async (data: { title: string; id: string }) => {
    try {
      const response = await updateChapterApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);


export const selectedChapters = createAsyncThunk<UserData, any>(
  "chat/selected-chapter",
  async (data: string[]) => {
    try {
      const response = await selectedChaptersApi(data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);


export const getAnswerbyId = createAsyncThunk<UserData, any>(
  "chat/get-answer",
  async (data: { id: string }) => {
    try {
      const response = await getAnswerbyIdApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const readNotification = createAsyncThunk<UserData, any>(
  "chat/read-notification",
  async (data: { id: string; isRead: boolean }) => {
    try {
      const response = await readNotificationApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const deleteSelectedChapter = createAsyncThunk<UserData, any>(
  "chat/delete-chapter",
  async (data: { id: string }) => {
    try {
      const response = await deleteChapterApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const deleteQuestion = createAsyncThunk<UserData, any>(
  "chat/delete-question",
  async (data: { id: string }) => {
    try {
      const response = await deleteQuestionApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const getChapters = createAsyncThunk<any[], void>(
  "chat/get-chapter",
  async () => {
    try {
      const response = await getChaptersApi();
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const getBookTitle = createAsyncThunk<any, void>(
  "chat/get-bookTitle",
  async () => {
    try {
      const response = await getBookTitleApi();
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const getTemplatesMain = createAsyncThunk<any[], any>(
  "chat/get-templates",
  async (data: { lang: string }) => {
    try {
      const response = await getTemplatesApiMain(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const getTemplates = createAsyncThunk<any[], void>(
  "chat/get-templates",
  async () => {
    try {
      const response = await getTemplatesApi();
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);


export const cloneTemplate = createAsyncThunk<UserData, any>(
  "chat/get-template",
  async (data: { id: string; ids: any }) => {
    try {
      const response = await cloneTemplateApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const isTemplateCloned = createAsyncThunk<UserData, { id: string }>(
  "chat/cloned-template",
  async (data: { id: string }) => {
    try {
      const response = await isTemplateClonedApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const getChapterbyId = createAsyncThunk<UserData, { id: string }>(
  "chat/get-chapterbyId",
  async (data: { id: any }) => {
    try {
      const response = await getChapterbyIdApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const GetReferralCode = createAsyncThunk<any, void>(
  "chat/users/getReferralCode",
  async () => {
    try {
      const response = await GetReferralCodeApi();
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const createQuestion = createAsyncThunk<UserData, any>(
  "chat/create-question",
  async (data: { text: string; chapter: string }) => {
    try {
      const response = await createQuestionApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const updateQuestion = createAsyncThunk<UserData, any>(
  "chat/update-question",
  async (data: {
    text: string;
    id: string;
    chapter: string;
    status?: string; // Make the status parameter optional
  }) => {
    try {
      // Provide a default value if status is not provided
      const statusValue = data.status || "Progress";

      const response = await updateQuestionApi({
        ...data,
        status: statusValue,
      });
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const getQuestions = createAsyncThunk<any[], void>(
  "chat/get-question",
  async () => {
    try {
      const response = await getQuestionsApi();
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const getQuestionbyId = createAsyncThunk<UserData, { id: string }>(
  "chat/get-questionbyId",
  async (data: { id: string }) => {
    try {
      const response = await getQuestionbyIdApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);



export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetChatState: (state) => {
      window.location.href = "/"
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChapters.fulfilled, (state, action) => {
      state.chats = action.payload;
      state.chapters = action.payload;
    });
    builder.addCase(getChapterNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
    });
    builder.addCase(getToc.fulfilled, (state, action) => {
      state.tocData = action.payload;
    });
    builder.addCase(getBookCover.fulfilled, (state, action) => {
      state.coverData = action.payload;
    });
    builder.addCase(narrativeFusion.pending, (state, action) => {
      state.chapterLoading = "not-loaded";
    });
    builder.addCase(getChapterbyId.fulfilled, (state, action) => {
      state.chapter = action.payload;
    });
    builder.addCase(getTemplates.fulfilled, (state, action) => {
      state.templates = action.payload;
    });
    builder.addCase(chapterResponse.fulfilled, (state, action) => {
      state.chapterLoading = "loaded";
    });
    builder.addCase(simpleChapter.fulfilled, (state, action) => {
      state.chapterLoading = "loaded";
    });
    builder.addCase(getAnswers.fulfilled, (state, action) => {
      state.answers = action.payload;
    });
    builder.addCase(getTreeData.fulfilled, (state, action) => {
      state.treeData = action.payload;
    });
    builder.addCase(updatePartner.fulfilled, (state, action) => {
      state.treeData = action.payload;
    });
    builder.addCase(addChildren.fulfilled, (state, action) => {
      state.treeData = action.payload;
    });
    builder.addCase(addParent.fulfilled, (state, action) => {
      state.treeData = action.payload;
    });

    builder.addCase(compiledChapter.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(compiledChapter.fulfilled, (state, action) => {
      state.loading = false
    });

    builder.addCase(compiledChapter.rejected, (state, action) => {
      state.loading = false
    });
  },
});

export const { resetChatState } = chatSlice.actions;

export const selectChat = (state: { chat: any }) => state.chat.chats;
export const selectAnswers = (state: { chat: any }) => state.chat.answers;
export const selectTreeData = (state: { chat: any }) => state.chat.treeData;
export const selectCoverData = (state: { chat: any }) => state.chat.coverData;
export const selectChapterNotification = (state: { chat: any }) =>
  state.chat.notifications;
export const selectAllChapters = (state: { chat: any }) => state.chat.chapters;
export const selectTocData = (state: { chat: any }) => state.chat.tocData;
export const selectChapter = (state: { chat: any }) => state.chat.chapter;
export const selectTemplates = (state: { chat: any }) => state.chat.templates;
export const isChapterLoaded = (state: { chat: any }) =>
  state.chat.chapterLoading;
export const selectTemplateById = (templateId: string) =>
  createSelector(selectTemplates, (templates) => {
    // Find the template in the array based on the provided id
    return templates.find((template) => template.id === templateId);
  });

export default chatSlice.reducer;
