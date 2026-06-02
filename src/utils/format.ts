export const formatPrice = (price: number): string =>
  price.toLocaleString("vi-VN") + "đ";

export const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString("vi-VN");

export const truncate = (str: string, max: number): string =>
  str.length > max ? str.slice(0, max) + "..." : str;