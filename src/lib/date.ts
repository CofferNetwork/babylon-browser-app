import dayjs from "dayjs";

export const formatTimestamp = (timestamp: number | null) => {
  if (!timestamp) return;
  return dayjs(timestamp).format('DD/MM/YYYY, HH:mm:ss');
}