export const calculateDiscountPrice = (price: string, discount: string) => {
  const priceNumber = parseInt(price.replace(/[^0-9]/g, ''));
  const discountNumber = parseInt(discount);

  if (isNaN(priceNumber) || isNaN(discountNumber) || discountNumber <= 0) {
    return { originalPrice: price, discountedPrice: null, discountText: null };
  }

  const discountAmount = Math.floor(priceNumber * (discountNumber / 100));
  const finalPrice = priceNumber - discountAmount;

  return {
    originalPrice: formatPrice(priceNumber),
    discountedPrice: formatPrice(finalPrice),
    discountText: `${discountNumber}% OFF`
  };
};

export const formatPrice = (num: number) => {
  return '$' + num.toLocaleString('es-AR');
};

export const getAbsoluteUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const websiteDomain = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || 'http://localhost:3000';
  if (url.startsWith('/')) {
    return `${websiteDomain}${url}`;
  }
  return `${websiteDomain}/${url}`;
};

export const isOutOfStock = (stock: string | number | undefined) => {
  if (stock === undefined) return false;
  if (typeof stock === 'string') {
    const stockNum = parseInt(stock);
    return isNaN(stockNum) ? false : stockNum === 0;
  }
  return stock === 0;
};
