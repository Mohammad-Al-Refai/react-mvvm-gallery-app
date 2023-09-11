import {
  Button,
  Container,
  Modal,
  InputGroup,
  Form,
  Alert,
  CardImg,
} from "react-bootstrap";
import { useHomeViewModel } from "./useHomeViewModel";
import { ImageItem } from "../components/ImageItem";

export function Home() {
  const vm = useHomeViewModel();
  return (
    <Container className="p-2">
      <Modal show={vm.addDialogState} onHide={vm.closeAddImageDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Label
            </InputGroup.Text>
            <Form.Control
              onChange={(e) => vm.onImageLabelChanged(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              URL
            </InputGroup.Text>
            <Form.Control
              onChange={(e) => vm.onImageURLChanged(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={vm.closeAddImageDialog}>
            Close
          </Button>
          <Button variant="primary" onClick={vm.onSaveClicked}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={vm.imageViewerDialogState} onHide={vm.closeImageViewer}>
        <Modal.Body>
          <CardImg src={vm.getSelectedImage()} />
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="primary" onClick={vm.onPrevClicked}>
            Perv
          </Button>
          <Button variant="primary" onClick={vm.onNextClicked}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Gallery</h1>
        <Button onClick={vm.openAddImageDialog}>Add New Photo</Button>
      </div>
      <div className="mt-5 d-flex align-items-center justify-content-center">
        {vm.images.map((image, i) => {
          return (
            <ImageItem
              image={image}
              key={i}
              onRemoveClicked={() => vm.removeImage(image)}
              onClick={() => vm.openImageViewer(image)}
            />
          );
        })}
      </div>
      {vm.images.length == 0 ? (
        <Alert variant="info">No items availabel</Alert>
      ) : null}
    </Container>
  );
}
