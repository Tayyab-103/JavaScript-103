export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}-${year}`;
  };



  export const handleImageDimensions = (url) => {
    const additionalPixels = 15 * 3.78;
    const newImage = document.createElement('img');
    newImage.src = url;
    const naturalHeight = newImage.naturalHeight;
    const naturalWidth = newImage.naturalWidth;
    const newHeight = naturalHeight + additionalPixels;
    const newWidth = naturalWidth + additionalPixels;
    newImage.style.height = `${newHeight}px`;
    newImage.style.width = `${newWidth}px`;
    // Set the image position and overflow to achieve the effect of expanding from the right
    newImage.style.position = 'relative'; // or 'absolute', depending on your layout needs
    newImage.style.left = '0'; // Align the image to the left
    newImage.style.overflow = 'visible'; // Allow overflow to the right

    return newImage
  }