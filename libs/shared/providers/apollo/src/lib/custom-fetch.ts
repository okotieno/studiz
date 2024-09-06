export const customFetch = (url: (RequestInfo | URL), opts?: RequestInit): Promise<Response> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(opts?.method || 'get', url as string);

    for (const k in opts?.headers || {}) xhr.setRequestHeader(k, opts?.headers?.[k as keyof HeadersInit] as string);

    xhr.onload = (e: any) =>
      resolve({
        ok: true,
        text: () => Promise.resolve(e.target?.responseText),
        json: () => Promise.resolve(JSON.parse(e.target?.responseText))
      } as any);

    xhr.onerror = reject;

    if (xhr.upload)
      xhr.upload.onprogress = event => {
        const uploadCallback = (opts as any).onUploadProgress;
        if (uploadCallback) {
          uploadCallback(event.loaded / event.total * 100);
        }
      };

    xhr.send(opts?.body as XMLHttpRequestBodyInit);
  });
};
