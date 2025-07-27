/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    API_BASE_URL: string;
    UPLOAD_MAX_SIZE: string;
    REQUEST_TIMEOUT: string;
  }
}
