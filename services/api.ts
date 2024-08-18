import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";

class API {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "https://api.thelifescript.com/", // base URL
      // baseURL: "http://localhost:8000/",
      // baseURL: "https://28f3-116-58-9-130.ngrok-free.app", //ngrok
      // headers: {
      //   "ngrok-skip-browser-warning": true,
      // },
    });

    this.instance.interceptors.request.use(
      this.requestInterceptor,
      this.requestErrorInterceptor
    );

    this.instance.interceptors.response.use(
      this.responseInterceptor,
      this.responseErrorInterceptor
    );
  }

  private requestInterceptor(config: any): any {
    const token = localStorage.getItem("token");
    if (token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }

  private requestErrorInterceptor(error: any) {
    return Promise.reject(error);
  }

  private responseInterceptor(response: AxiosResponse): AxiosResponse {
    return response;
  }

  private responseErrorInterceptor(error: any) {

    // const router = useRouter();
    if (error.response.status === 401) {
      toast.error(error.response.data.message);
      localStorage.clear();
      const baseLink = window.location.origin;
      if (window.location.href !== baseLink) {
        window.location.href = baseLink;
      }
    } else if (error.response.status === 402) {
      const baseLink = window.location.origin;
      if (window.location.href !== `${baseLink}/dashboard/SubscribePlans`) {
        toast.error(error.response.data.message);
      }
      
      if (window.location.href !== `${baseLink}/dashboard/SubscribePlans`) {
        window.location.href = `${baseLink}/dashboard/SubscribePlans`;
      }
    }

    return Promise.reject(error);
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get<T>(url, config).then(this.handleApiResponse);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance
      .post<T>(url, data, config)
      .then(this.handleApiResponse);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.put<T>(url, data, config).then(this.handleApiResponse);
  }

  public patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance
      .patch<T>(url, data, config)
      .then(this.handleApiResponse);
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete<T>(url, config).then(this.handleApiResponse);
  }

  private handleApiResponse(response: AxiosResponse): any {
    return response.data;
  }
}

const api = new API();
export default api;
