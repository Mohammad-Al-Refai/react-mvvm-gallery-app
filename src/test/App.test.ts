import { describe, expect, it } from "vitest";
import { useHomeViewModel } from "../pages/useHomeViewModel";
import { act, renderHook } from "@testing-library/react";

describe("Open dialog", () => {
  it("dialog is open", () => {
    const { result } = renderHook(useHomeViewModel);
    act(() => {
      result.current.openAddImageDialog();
    });
    expect(result.current.addDialogState).toBe(true);
  });
});

describe("Close dialog", () => {
  it("dialog is closed", () => {
    const { result } = renderHook(useHomeViewModel);
    act(() => {
      result.current.openAddImageDialog();
      result.current.closeAddImageDialog();
    });
    expect(result.current.addDialogState).toBe(false);
  });
});

describe("Add new Image", () => {
  const ImageData = {
    label: "MyPhoto",
    URL: "https://example.com",
  };
  it("Add new Image logic", () => {
    const { result } = renderHook(useHomeViewModel);
    act(() => result.current.onImageLabelChanged(ImageData.label));
    act(() => result.current.onImageURLChanged(ImageData.URL));
    act(() => result.current.onSaveClicked());
    expect(result.current.images.length).toBe(1);
  });
});

describe("Remove Image", () => {
  const ImageData = {
    label: "MyPhoto",
    URL: "https://example.com",
  };
  it("Remove Image logic", () => {
    const { result } = renderHook(useHomeViewModel);
    act(() => result.current.onImageLabelChanged(ImageData.label));
    act(() => result.current.onImageURLChanged(ImageData.URL));
    act(() => result.current.onSaveClicked());
    act(() => result.current.removeImage(result.current.images[0]));

    expect(result.current.images.length).toBe(0);
  });
});
