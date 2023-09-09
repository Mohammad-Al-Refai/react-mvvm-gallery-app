import { Card, Button } from "react-bootstrap";
import { ImageModel } from "../models/ImageModel";

export function ImageItem({ image, onRemoveClicked, onClick }: ImageItemProps) {
  return (
    <Card style={{ width: "18rem" }} className="m-2">
      <Card.Img onClick={onClick} variant="top" src={image.url} />
      <Card.Body>
        <Card.Title>{image.label}</Card.Title>
      </Card.Body>
      <Card.Body>
        <Button variant="danger" onClick={onRemoveClicked}>
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
}

interface ImageItemProps {
  image: ImageModel;
  onRemoveClicked: () => void;
  onClick: () => void;
}
