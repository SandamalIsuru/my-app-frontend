import React from "react";
import { useDropzone } from "react-dropzone";
import PersonIcon from "@mui/icons-material/Person";
import classNames from "classnames";

function ImageUpload({
  selectedImage,
  setSelectedImage,
  url = null,
  isEditing,
}) {
  const onDrop = (acceptedFiles) => {
    setSelectedImage(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (!isEditing)
    return (
      <div className="flex justify-center w-32 h-full">
        {url && <img src={url} alt="profile" />}
        {!url && <PersonIcon style={{ fontSize: 120 }} />}
      </div>
    );

  return (
    <div
      {...getRootProps()}
      className={classNames(
        isDragActive ? "drag-active" : "dropzone",
        "cursor-pointer h-full"
      )}
    >
      <input {...getInputProps()} accept="image/*" />
      {selectedImage ? (
        <div className="image-preview w-32 h-40">
          <div className="flex flex-col justify-center image-container text-center">
            <div className="w-full h-full">
              <img
                src={selectedImage.preview}
                alt="Preview"
                className="preview-image"
              />
            </div>
            <div className="image-name text-base mt-2">
              {selectedImage.name}
            </div>
          </div>
        </div>
      ) : (
        <div className="dropzone-text h-full">
          <div className="flex justify-center h-full">
            {!selectedImage && url && <img src={url} alt="profile" />}
            {!selectedImage && !url && <PersonIcon style={{ fontSize: 120 }} />}
          </div>

          {isDragActive ? (
            <div className="flex flex-col items-center">
              <div className="text-center">Drop the files here</div>
            </div>
          ) : (
            <div className="flex flex-col items-center w-32">
              <div className="underline">Upload image</div>
              <div className="text-center text-sm">
                (JPG or PNG format with maximum size of 1 MB)
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
