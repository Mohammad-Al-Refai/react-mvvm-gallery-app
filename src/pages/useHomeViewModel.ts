import { useState } from "react";
import { ImageModel } from "../models/ImageModel";

export function useHomeViewModel() {
  const [addDialogState, setAddDialogState] = useState(false);
  const [imageLabelValue, setImageLabelValue] = useState("");
  const [imageURLValue, setImageURLValue] = useState("");
  const [images, setImages] = useState<ImageModel[]>([]);
  const [curser, setCurser] = useState(0);
  const [imageViewerDialogState, setImageViewerDialog] = useState(false);

  function openAddImageDialog() {
    setAddDialogState(true);
  }
  function closeAddImageDialog() {
    setAddDialogState(false);
    setImageLabelValue("");
    setImageURLValue("");
  }
  function onImageURLChanged(value: string) {
    setImageURLValue(value);
  }
  function onImageLabelChanged(value: string) {
    setImageLabelValue(value);
  }
  function onSaveClicked() {
    if (imageLabelValue == "" || imageURLValue == "") {
      return;
    }
    const newImage = new ImageModel();
    newImage.setId(window.crypto.randomUUID());
    newImage.setLabel(imageLabelValue);
    newImage.setURL(imageURLValue);
    setImages([...images, newImage]);
    closeAddImageDialog();
  }

  function removeImage(target: ImageModel) {
    const newImages = images.filter((image) => image.id !== target.id);
    setImages([...newImages]);
  }

  function onNextClicked() {
    let newCurser = curser;
    const imagesLength = images.length;
    if (newCurser < imagesLength && newCurser + 1 != imagesLength) {
      newCurser++;
      setCurser(newCurser);
    }
    console.log("STOP NEXT");
  }
  function onPrevClicked() {
    let newCurser = curser;
    if (newCurser > 0) {
      newCurser--;
      setCurser(newCurser);
    }
    console.log("STOP PREV");
  }
  function openImageViewer(image: ImageModel) {
    const newCurser = images.indexOf(image);
    setCurser(newCurser);
    setImageViewerDialog(true);
  }
  function closeImageViewer() {
    setCurser(0);
    setImageViewerDialog(false);
  }
  function getSelectedImage() {
    if (!images[curser]) {
      return "";
    }
    return images[curser].url;
  }
  return {
    openAddImageDialog,
    closeAddImageDialog,
    onImageURLChanged,
    onImageLabelChanged,
    onSaveClicked,
    addDialogState,
    imageLabelValue,
    imageURLValue,
    images,
    removeImage,
    onNextClicked,
    onPrevClicked,
    curser,
    openImageViewer,
    closeImageViewer,
    imageViewerDialogState,
    getSelectedImage,
  };
}
