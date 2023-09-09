import { useEffect, useState } from "react";
import { ImageModel } from "../models/ImageModel";

export function useHomeViewModel() {
  const sampleData = [
    new ImageModel()
      .setId(window.crypto.randomUUID())
      .setLabel("1")
      .setURL("https://placehold.co/600x400/red/white"),
    new ImageModel()
      .setId(window.crypto.randomUUID())
      .setLabel("2")
      .setURL("https://placehold.co/600x400/green/white"),
    new ImageModel()
      .setId(window.crypto.randomUUID())
      .setLabel("3")
      .setURL("https://placehold.co/600x400/000000/blue"),
  ];
  const [addDialogState, setAddDialogState] = useState(false);
  const [imageLabelValue, setImageLabelValue] = useState("");
  const [imageURLValue, setImageURLValue] = useState("");
  const [images, setImages] = useState<ImageModel[]>(sampleData);
  const [curser, setCurser] = useState(0);
  const [isNextDisabled, setNextDisabled] = useState(false);
  const [isPrevDisabled, setPrevDisabled] = useState(false);
  const [imageViewerDialogState, setImageViewerDialog] = useState(false);

  useEffect(() => {
    console.log({ isNextDisabled, isPrevDisabled });
  }, [isNextDisabled, isPrevDisabled]);
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
    updatePaginationControl();
    console.log("STOP NEXT");
  }
  function onPrevClicked() {
    let newCurser = curser;
    if (newCurser > 0) {
      newCurser--;
      setCurser(newCurser);
    }
    updatePaginationControl();
    console.log("STOP PREV");
  }
  function updatePaginationControl() {
    if (curser + 1 >= images.length - 1) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }
    if (curser - 1 <= 0) {
      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }
  }
  function openImageViewer(image: ImageModel) {
    const newCurser = images.indexOf(image);
    setCurser(newCurser);
    setImageViewerDialog(true);
    updatePaginationControl();
  }
  function closeImageViewer() {
    setNextDisabled(false);
    setPrevDisabled(false);
    setImageViewerDialog(false);
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
    isNextDisabled,
    isPrevDisabled,
  };
}
