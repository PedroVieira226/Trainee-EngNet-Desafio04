export class ApiError extends Error {
  public status: number;
  public data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "ApiError";
  }
}

interface FetchOptions extends RequestInit {
  data?: any;
}

export const apiClient = async <T = any>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> => {
  const { data, headers, ...customConfig } = options;

  const config: RequestInit = {
    ...customConfig,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include", // Global requirement for the project (like 204 No Content)
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  // Define a URL do Railway de forma fixa e direta para blindar contra falhas de ENV na Vercel
  const baseURL = "https://trainee-engnet-desafio04-production.up.railway.app";
    
  let fullURL: string;

  // Se o endpoint já for uma URL absoluta (ex: http://...), usa ele direto
  if (/^https?:\/\//i.test(endpoint)) {
    fullURL = endpoint;
  } else {
    // Remove o prefixo '/api' ou 'api/' se ele existir no início do endpoint passado na chamada
    const cleanEndpoint = endpoint.replace(/^\/?api\//, '');

    // Garante a injeção do prefixo obrigatório do NestJS (/api) mapeado no Railway
    fullURL = `${baseURL}/api/${cleanEndpoint.replace(/^\//, '')}`;
  }

  const response = await fetch(fullURL, config);
  
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: "Erro de rede ou servidor." };
    }

    const errorMessage = Array.isArray(errorData.message)
      ? errorData.message[0]
      : errorData.message || response.statusText;

    if (response.status === 401 || response.status === 403) {
      if (typeof window !== "undefined") {
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      }
    }

    throw new ApiError(response.status, errorMessage, errorData);
  }

  // Allow empty responses
  const text = await response.text();
  if (!text) {
    return {} as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return text as unknown as T;
  }
};

export const api = {
  get: <T>(endpoint: string, options?: Omit<FetchOptions, "method" | "data">) =>
    apiClient<T>(endpoint, { ...options, method: "GET" }),
  post: <T>(
    endpoint: string,
    data: any,
    options?: Omit<FetchOptions, "method" | "data">,
  ) => apiClient<T>(endpoint, { ...options, method: "POST", data }),
  patch: <T>(
    endpoint: string,
    data: any,
    options?: Omit<FetchOptions, "method" | "data">,
  ) => apiClient<T>(endpoint, { ...options, method: "PATCH", data }),
  delete: <T>(
    endpoint: string,
    options?: Omit<FetchOptions, "method" | "data">,
  ) => apiClient<T>(endpoint, { ...options, method: "DELETE" }),
};