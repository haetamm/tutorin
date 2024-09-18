import React, { createRef, useState } from 'react'
import Cropper from "react-cropper"
import axiosInstance from '../../utils/api';
import { dataURLtoBlob } from '../../utils/helper';
import { toast } from 'sonner';
import { useSelector, useDispatch } from 'react-redux';
import { handleFormErrors } from '../../utils/error-handling';

const CropImage = () => {
    const dispatch = useDispatch()
    const { imageUrl, fetch } = useSelector((state) => state.uploadImage)
    const [change, setChange] = useState(false)
    const [image, setImage] = useState(imageUrl);
    const [cropData, setCropData] = useState("");
    const cropperRef = createRef();

    const onChange = (e) => {
        e.preventDefault();
        setCropData("");
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            const maxFileSize = 500 * 1024;

            if (!validImageTypes.includes(file.type)) {
                toast.error("File harus berupa gambar (jpg, jpeg, png).");
                return;
            }

            if (file.size > maxFileSize) {
                toast.error("Ukuran file harus kurang dari 500kb.");
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setImage(reader.result);
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

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        if (cropData) {
            const blob = dataURLtoBlob(cropData);
            formData.append('image', blob, 'profile.png');
        }

        axiosInstance.put('/profile/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(async () => {
            toast("foto profile berhasil diupload", "success");
            dispatch({
                type: "CLOSE_MODAL"
            })
            dispatch({
                type: "DELETE_IMAGE"
            })
            fetch()
        })
        .catch(error => {
            handleFormErrors(error)
        })
    };


    return (
        <>
            <div className="w-full inline-block lg:flex mt-4">
                {!change &&
                <div className="flex items-center justify-center w-full lg:w-[65%]">
                    <img src={image} className=" w-[300px] h-[300px]" alt="image-profile" />
                </div>
                }

                {change &&
                    <Cropper
                        ref={cropperRef}
                        // style={{ height: 400 }}
                        className="w-full lg:w-[65%] h-[300px]"
                        // zoomTo={0.5}
                        initialAspectRatio={1}
                        preview=".img-preview"
                        src={image}
                        viewMode={1}
                        minCropBoxHeight={220}
                        minCropBoxWidth={220}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false}
                        guides={true}
                    />
                }
                <div className="relative mt-6 ml-0 lg:ml-6 items-center justify-center mx-auto">
                    <div className="mb-0 xs:mb-2 w-full" onClick={() => setChange(true)} >
                        <input type="file" accept=".jpg, .jpeg, .png" onChange={onChange} className="fmt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0" />
                    </div>

                    {cropData === "" ? (
                        <button onClick={getCropData} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0">Crop</button>
                    ) : (
                        <button onClick={onSubmit} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0">Upload</button>
                    )}
                </div>
            </div>
            <br style={{ clear: "both" }} />
        </>
    )
}

export default CropImage