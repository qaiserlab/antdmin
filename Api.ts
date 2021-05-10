const BASE_URL = 'http://localhost:3000';

export async function get(url: string, data: any) {
  const urlObject = new URL(BASE_URL + url)

  urlObject.search = new URLSearchParams(data).toString();

  const response = await fetch(urlObject.toString());
  return response;
}

export async function del(url: string, data: any) {
  const urlObject = new URL(BASE_URL + url)
  
  urlObject.search = new URLSearchParams(data).toString();

  const response = await fetch(urlObject.toString(), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
  });

  return response;
}

export async function post(url: string, data: Object) {
  const response = await fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  
  return response;
}

export async function put(url: string, data: Object) {
  const response = await fetch(BASE_URL + url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  
  return response;
}