import React from "react";
import { useDropzone } from "react-dropzone";
import PersonIcon from "@mui/icons-material/Person";
import classNames from "classnames";

function ImageUpload({ selectedImage, setSelectedImage, url = null }) {
  const onDrop = (acceptedFiles) => {
    setSelectedImage(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={classNames(
        isDragActive ? "drag-active" : "dropzone",
        "cursor-pointer h-56"
      )}
    >
      <input {...getInputProps()} accept="image/*" />
      {selectedImage ? (
        <div className="image-preview">
          <div className="flex flex-col justify-center image-container text-center">
            <img
              src={selectedImage.preview}
              alt="Preview"
              className="preview-image"
            />
            <div className="image-name text-base">{selectedImage.name}</div>
          </div>
        </div>
      ) : (
        <div className="dropzone-text">
          <div className="flex justify-center">
            {!selectedImage && url && <img src={url} alt="profile" />}
            {!selectedImage && !url && <PersonIcon style={{ fontSize: 120 }} />}
          </div>

          {isDragActive ? (
            <div className="flex flex-col items-center">
              <div className="text-center">Drop the files here</div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
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
