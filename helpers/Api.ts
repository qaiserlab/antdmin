export class Api {
  baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = (baseUrl)?baseUrl:'';
  }

  mkUrlWithQueryParams(url: string, data?: any) {
    if (!data) return url;
    const urlObject = new URL(this.baseUrl + url)
    urlObject.search = new URLSearchParams(data).toString();
    return urlObject.toString();
  }

  async get(url: string, data?: any) {
    return await fetch(this.mkUrlWithQueryParams(url, data));
  }

  async del(url: string, data?: any) {
    return await fetch(
      this.mkUrlWithQueryParams(url, data), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );
  }

  async post(url: string, data: Object) {
    return await fetch(this.baseUrl + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
  
  async put(url: string, data: Object) {
    return await fetch(this.baseUrl + url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
}

export const api = new Api(`${process.env.HOST}/api`);