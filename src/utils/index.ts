export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(amount);
}

export function  getImagePath(imagePath: string) {
  const cloudinaryBaseUrl = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL;
  if(!cloudinaryBaseUrl) return '';
  if(imagePath.startsWith(cloudinaryBaseUrl)){
    return imagePath;
  }else{
    return `/products/${imagePath}.jpg`;
  }

}