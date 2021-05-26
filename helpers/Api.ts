export class Api {
  baseUrl: string;
  accessToken: string;

  constructor(baseUrl?: string) {
    this.baseUrl = (baseUrl)?baseUrl:'';
  }

  getHeaders() {
    let headers: any = {
      'Content-Type': 'application/json'
    };

    if (typeof localStorage !== 'undefined') {
      if (localStorage.accessToken) {
        headers = {
          ...headers,
          authorization: `Bearer ${localStorage.accessToken}`,
        }
      }
    }
    else if (this.accessToken) {
      headers = {
        ...headers,
        authorization: this.accessToken,
      }
    }

    return headers;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  mkUrlWithQueryParams(url: string, data?: any) {
    if (!data) return this.baseUrl + url;
    const urlObject = new URL(this.baseUrl + url)
    urlObject.search = new URLSearchParams(data).toString();
    return urlObject.toString();
  }

  async get(url: string, data?: any) {
    return await fetch(
      this.mkUrlWithQueryParams(url, data), {
        method: 'GET',
        headers: this.getHeaders(),
      }
    );
  }

  async del(url: string, data?: any) {
    return await fetch(
      this.mkUrlWithQueryParams(url, data), {
        method: 'DELETE',
        headers: this.getHeaders(),
      }
    );
  }

  async post(url: string, data: Object) {
    return await fetch(this.baseUrl + url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
  }
  
  async put(url: string, data: Object) {
    return await fetch(this.baseUrl + url, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
  }
}

export const api = new Api(`${process.env.HOST}/api?action=`);