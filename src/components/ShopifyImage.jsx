const srcSetValues = [
  50, 100, 200, 450, 600, 750, 900, 1000, 1250, 1500, 1750, 2000, 2500,
];

export default function ShopifyImage({ image, classList = '', loading = 'lazy', sizes }) {
  const imageFilter = (size) => {
    const { width, height = '' } = size;
    return image && `${image.url}`;
  };

  return image ? (
    <img
      src={image.url}
      alt={image.altText || 'Default alt text'}
      className={classList}
      width={image.width}
      height={image.height}
      loading={loading}
      sizes={sizes}
      srcSet={srcSetValues
        .filter((value) => image && value < image.width)
        .map((value) => `${imageFilter({ width: value })} ${value}w`)
        .join(', ')}
    />
  ) : null;
};
