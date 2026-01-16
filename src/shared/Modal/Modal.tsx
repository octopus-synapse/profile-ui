import type { ModalProps } from "./Modal.types";
import { modalTokens } from "./Modal.types";

export function useModal(props: ModalProps) {
 const { open, size = "md", closeOnOverlayClick = true } = props;
 const sizeToken = modalTokens.sizes[size];
 return { open, sizeToken, closeOnOverlayClick, size };
}

export * from "./Modal.types";
