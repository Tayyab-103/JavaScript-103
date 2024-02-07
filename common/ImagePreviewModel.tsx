import React, { useState, createRef, useEffect } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Cancel from "../../../assets/icons/cancelIcon.svg"

interface ModalProps {
  isOpen: boolean;
  setModalOpen: any;
  setOverAllSelectedImage: any;
  OverAllSelectedImage: any;
  setSelectedImage: any;
  SelectedImage: any;
}

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const ImagePreviewModel: React.FC<ModalProps> = ({
  isOpen = false,
  setModalOpen,
  setOverAllSelectedImage,
  OverAllSelectedImage,
  setSelectedImage,
  SelectedImage,
}) => {
  const HandelClose = () => {
    setModalOpen(false);
  };

  const [FileName, setFileName] = useState(null);

  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef<ReactCropperElement>();
  useEffect(() => {
    if (OverAllSelectedImage) {
      const file_name_without_extension =
        OverAllSelectedImage?.filename?.split(".")[0];
      setFileName(file_name_without_extension);
      setImage(OverAllSelectedImage.image);
    }
  }, [OverAllSelectedImage]);
  if (!isOpen) return null;

  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      // setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

      const croppedCanvas = cropperRef.current?.cropper.getCroppedCanvas();
      croppedCanvas.toBlob((blob) => {
        const file = new File([blob!], `${FileName}.png`, {
          type: "image/png",
        });
        setOverAllSelectedImage({
          type: OverAllSelectedImage.type,
          image: file,
          url: URL.createObjectURL(file),
        });
        console.log("🚀 ~ croppedCanvas.toBlob ~ file:", file);
        const newValues = {
          image: file,
          url: URL.createObjectURL(file),
        };
        const SelectType = OverAllSelectedImage.type;
        setSelectedImage({
          ...SelectedImage,
          [SelectType]: { ...newValues },
        });
        setModalOpen(false);
      }, "image/png");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-1/2 mx-auto my-6">
        {/* Modal content */}
        <div className="relative h-[600px] flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">Crop Image</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={HandelClose}
            >
              {/* <span className=" text-black  h-6 w-6 text-2xl block ">×</span> */}
              <img src={Cancel} alt="cancel button" />
            </button>
          </div>
          {/* Body */}
          <div className="relative p-6 flex-auto">
            <div style={{ width: "100%" }}>
              {/* <input type="file" onChange={onChange} /> */}
              <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                guides={true}
              />
            </div>
{/* style={{ width: "50%", height: "200px" }} */}
            <div className="box mt-3 text-center w-full" >
              {/* <h1> */}
                <button
                  onClick={getCropData}
                  className="mt-2 w-full md:w-[200px] h-[50px] bg-red-700 p-3 rounded-[25px] text-white font-['Hind Guntur'] "
                >
                  Save & Exit
                </button>
              {/* </h1> */}
              {/* <img style={{ width: "100%" }} src={cropData} alt="cropped" /> */}
            </div>
          </div>
          {/* End Body */}
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModel;
