import React, { createRef, useState } from "react";
import Cropper from "react-cropper";
import { useModalStore } from "../../store/modal";
import { useProfileStore } from "../../store/profile";
import { validateImage } from "../../utils/validation";

const CropImage = () => {
  const { image, updateImage } = useProfileStore();
  const [imgUrl, setImgUrl] = useState(image);
  const { closeModal } = useModalStore();
  const [change, setChange] = useState(false);
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();

  const onChange = (e) => {
    e.preventDefault();
    setCropData("");
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (!validateImage(file)) {
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImgUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  const onSubmit = () => {
    updateImage(cropData, closeModal);
  };

  return (
    <>
      <div className="w-full inline-block lg:flex mt-0 px-2">
        {!change && (
          <div className="flex items-center justify-center w-full lg:w-[65%]">
            <img
              src={imgUrl}
              className=" w-[300px] h-[300px]"
              alt="image-profile"
            />
          </div>
        )}

        {change && (
          <Cropper
            ref={cropperRef}
            className="w-full lg:w-[65%] h-[300px]"
            initialAspectRatio={1}
            preview=".img-preview"
            src={imgUrl}
            viewMode={1}
            minCropBoxHeight={220}
            minCropBoxWidth={220}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            guides={true}
          />
        )}
        <div className="relative mt-6 ml-0 lg:ml-6 items-center justify-center mx-auto">
          <div className="mb-0 xs:mb-2 w-full" onClick={() => setChange(true)}>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={onChange}
              className="fmt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
            />
          </div>

          <button
            onClick={cropData ? onSubmit : getCropData}
            className="my-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
          >
            {cropData ? "Upload" : "Crop"}
          </button>
        </div>
      </div>
      <br style={{ clear: "both" }} />
    </>
  );
};

export default CropImage;
