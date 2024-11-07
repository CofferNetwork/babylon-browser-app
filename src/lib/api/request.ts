import { errorToast } from "@/components/Toast";
import ky from "ky";
import { toast } from "sonner";

export const getToken = () => localStorage.getItem("coffer-token") || "";

export const setToken = (token?: string | null) => localStorage.setItem("coffer-token", token || '');

let errorToastId: number | string | undefined = undefined;

const api = ky.create({
	retry: 0,
  hooks: {
    beforeRequest: [
      (rq) => {
        rq.headers.set("Authorization", `Bearer ${getToken()}`);
        rq.headers.set("content-type", "application/json");
        return rq;
      },
    ],
    beforeError: [
			async error => {
				
				if (error.response.status >= 500) {
					toast.dismiss(errorToastId);
					errorToastId = errorToast('Server Error', undefined, errorToastId)
				}

				const {response} = error;
				if (response && response.body) {
					error.name = 'Error';
					try {
						const body = await response.json();
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					error.message = `${(body as any)?.message} (${response.status})`;
					} catch { /* empty */ }
				}

				return error;
			}
		]
  },
  prefixUrl: import.meta.env.VITE_APP_API_HOST,
});


export default api;
