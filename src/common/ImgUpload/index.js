import React, { useEffect, useState } from "react";
import { Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const ImgUpload = ({ imgUrl, handleUpload, handleRemove }) => {
  const [fileList, setFileList] = useState([]);
  const [previewProps, setPreviewProps] = useState({
    previewImage: "",
    previewVisible: false,
    previewTitle: "",
  });

  useEffect(() => {
    if (!!imgUrl) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: imgUrl,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [imgUrl]);

  const onChange = ({ file, fileList: newFileList }) => {
    if (handleUpload && newFileList.length > 0) {
      handleUpload(file.originFileObj);
    }
    setFileList(newFileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewProps({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  return (
    <>
      <Modal
        visible={previewProps.previewVisible}
        title={previewProps.previewTitle}
        footer={null}
        onCancel={() =>
          setPreviewProps({ ...previewProps, previewVisible: false })
        }
      >
        <img
          alt="imageUploaded"
          style={{ width: "100%" }}
          src={previewProps.previewImage}
        />
      </Modal>
      <ImgCrop rotate>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={handlePreview}
          onRemove={handleRemove}
          maxCount={1}
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </ImgCrop>
    </>
  );
};

export default ImgUpload;
