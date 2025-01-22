import { format, formatDistanceToNow, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

export const isActive = (currentPath, targetPath) => currentPath === targetPath;

export const formatNumber = (number) => {
  return new Intl.NumberFormat("id-ID").format(number);
};

export const getHumanReadableDiff = (dateString) => {
  let date;

  try {
    if (dateString.includes("T")) {
      date = parseISO(dateString);
    } else {
      date = new Date(dateString);
    }

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }
  } catch (error) {
    console.error("Error parsing date:", error);
    return "Invalid date";
  }

  return formatDistanceToNow(date, { addSuffix: true, locale: enUS });
};

export const formatDate = (isoDateString) => {
  const date = parseISO(isoDateString);

  return format(date, "dd MMMM yyyy", { locale: enUS });
};

export const scrollTop = () => {
  window.scrollTo(0, 0);
};

export const dataURLtoBlob = (dataurl) => {
  const arr = dataurl.split(",");
  const match = arr[0].match(/:(.*?);/);

  if (!match) {
    throw new Error("Invalid data URL");
  }

  const mime = match[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
};

export const generateGoogleAuthUrl = () => {
  const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const scope = encodeURIComponent(import.meta.env.VITE_GOOGLE_SCOPE);
  const responseType = import.meta.env.VITE_GOOGLE_RESPONSE_TYPE;
  const accessType = import.meta.env.VITE_GOOGLE_ACCESS_TYPE;

  return `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectUri}&response_type=${responseType}&client_id=${clientId}&scope=${scope}&access_type=${accessType}`;
};
