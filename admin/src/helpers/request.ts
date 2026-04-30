import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import LocalStorage from "./local-storage";
import CookieStorage from "./cookies";
const API_REQUEST_TIMEOUT = 90000;

interface ErrorResponseData {
  code?: number;
  message?: string;
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

class ApiError extends Error {
  code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

class Request {
  private axios: AxiosInstance;
  private axiosNoAuth: AxiosInstance;

  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
      timeout: API_REQUEST_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "json",
    });

    this.axiosNoAuth = axios.create({
      baseURL,
      timeout: API_REQUEST_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "json",
    });

    this.axios.interceptors.request.use((config) => {
      const token = LocalStorage.getLocalStorage<string | null>(
        "access-token",
        null,
      );
      if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });

    this.axios.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const status = error.response?.status ?? 500;
        const data = error.response?.data as ErrorResponseData;

        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshedToken = await this.refreshAccessToken();
            if (refreshedToken) {
              LocalStorage.setLocalStorage("access-token", refreshedToken);
              if (originalRequest.headers) {
                originalRequest.headers["Authorization"] =
                  `Bearer ${refreshedToken}`;
              }
              return this.axios(originalRequest);
            } else {
              LocalStorage.removeLocalStorage("access-token");
              CookieStorage.removeCookie("refresh-token");
              window.location.href = "/login";
            }
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        const message = data?.message || error.message || "Lỗi không xác định";
        return Promise.reject(new ApiError(status, message));
      },
    );
  }

  async refreshAccessToken(): Promise<string | null> {
    const refreshToken = CookieStorage.getCookie("refresh-token");
    if (!refreshToken) return null;

    try {
      const response = await this.axiosNoAuth.post("/auth/refresh-token", {
        refreshToken,
      });
      if (response.status === 200) {
        return response.data.data.accessToken;
      }
      return null;
    } catch (error) {
      console.error("Refresh token failed:", error);
      return null;
    }
  }

  private buildFormData(data: object): FormData {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formData.append(key, value as any);
    });
    return formData;
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.axios.get(url, config);
  }

  // Hàm getRaw: GET không token
  getRaw(url: string, config?: AxiosRequestConfig) {
    return this.axiosNoAuth.get(url, config);
  }

  post(
    url: string,
    data: object,
    isLoad?: boolean,
    config?: AxiosRequestConfig,
  ) {
    if (isLoad) {
      return this.axios.post(url, data, {
        ...config,
        headers: {
          ...(config?.headers || {}),
          "Content-Type": "multipart/form-data",
        },
      });
    }
    return this.axios.post(url, data, config);
  }

  put(
    url: string,
    data: object,
    isLoad?: boolean,
    config?: AxiosRequestConfig,
  ) {
    if (isLoad) {
      return this.axios.put(url, this.buildFormData(data), {
        ...config,
        headers: {
          ...(config?.headers || {}),
          "Content-Type": "multipart/form-data",
        },
      });
    }
    return this.axios.put(url, data, config);
  }

  patch(
    url: string,
    data: object,
    isLoad?: boolean,
    config?: AxiosRequestConfig,
  ) {
    if (isLoad) {
      return this.axios.patch(url, this.buildFormData(data), {
        ...config,
        headers: {
          ...(config?.headers || {}),
          "Content-Type": "multipart/form-data",
        },
      });
    }

    return this.axios.patch(url, data, config);
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete(url, config);
  }

  upload(url: string, file: File, config?: AxiosRequestConfig) {
    const formData = new FormData();
    formData.append("file", file);

    return this.axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(config?.headers || {}),
      },
      ...config,
    });
  }
}

export default Request;
