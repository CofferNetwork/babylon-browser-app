import { toast as sToast } from "sonner";

export const errorToast = (msg: string, code?: number, id?: number | string) => {
	if (!code) return sToast.error(msg);

	return sToast.error(`${msg}`, {
		id,
	});
};

export const toast = (msg: string) => sToast.success(msg);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadingToast = (promise: Promise<any>, text?: string, success?: string, error?: string) => {
	sToast.promise(promise, {
		loading: text || 'Loading...',
		success: () => {
			return success;
		},
		error: error || 'Error',
		duration: 2000,
	});
}