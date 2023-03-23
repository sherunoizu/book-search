export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  thumbnail: string;
  categories: string;
}

type Categories =
  | ""
  | "Art"
  | "Biography"
  | "Computers"
  | "History"
  | "Medical"
  | "Poetry";

type Orders = "relevance" | "newest";

export interface BooksState {
  books: Book[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: Categories;
  selectedOrder: Orders;
  paginationStep: number;
  startIndex: 0;
}

export enum BooksActionTypes {
  FETCH_BOOKS_REQUEST = "FETCH_BOOKS_REQUEST",
  FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS",
  FETCH_BOOKS_FAILURE = "FETCH_BOOKS_FAILURE",
}

interface FetchBooksRequestAction {
  type: BooksActionTypes.FETCH_BOOKS_REQUEST;
}

interface FetchBooksSuccessAction {
  type: BooksActionTypes.FETCH_BOOKS_SUCCESS;
  payload: Book[];
}

interface FetchBooksFailureAction {
  type: BooksActionTypes.FETCH_BOOKS_FAILURE;
  payload: string;
}

export interface BookAPIResponse {
  kind: string;
  totalItems: number;
  items: BookAPIItem[];
  error?: {
    code: number;
    message: string;
  };
}

export type BooksAction =
  | FetchBooksRequestAction
  | FetchBooksSuccessAction
  | FetchBooksFailureAction;

export interface BookAPIItem {
  accessInfo: {
    accessViewStatus: string;
    country: string;
    embeddable: boolean;
    epub: {
      isAvailable: boolean;
    };
    pdf: {
      acsTokenLink: string;
      isAvailable: boolean;
    };
    publicDomain: boolean;
    quoteSharingAllowed: boolean;
    textToSpeechPermission: string;
    viewability: string;
    webReaderLink: string;
  };
  etag: string;
  id: string;
  kind: string;
  saleInfo: {
    buyLink: string;
    country: string;
    isEbook: boolean;
    listPrice: {
      amount: number;
      currencyCode: string;
    };
    offers: {
      finskyOfferType: number;
      listPrice: {
        amountInMicros: number;
        currencyCode: string;
      };
      retailPrice: {
        amountInMicros: number;
        currencyCode: string;
      };
    }[];
    retailPrice: {
      amountInMicros: number;
      currencyCode: string;
    };
    saleability: string;
  };
  searchInfo: {
    textSnippet: string;
  };
  selfLink: string;
  volumeInfo: {
    allowAnonLogging: boolean;
    authors?: string[];
    canonicalVolumeLink: string;
    categories: string[];
    contentVersion: string;
    description: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    industryIdentifiers: {
      identifier: string;
      type: string;
    }[];
    infoLink: string;
    language: string;
    maturityRating: string;
    pageCount: number;
    panelizationSummary: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    previewLink: string;
    printType: string;
    publishedDate: string;
    publisher: string;
    readingModes: {
      image: boolean;
      text: boolean;
    };
    title: string;
  };
}
