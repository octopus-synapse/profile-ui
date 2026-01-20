import type { ModalProps } from "./modal.types";
import { modalTokens } from "./modal.types";

export function useModal(props: ModalProps) {
 const { open, size = "md", closeOnOverlayClick = true } = props;
 const sizeToken = modalTokens.sizes[size];
 return { open, sizeToken, closeOnOverlayClick, size };
}

export * from "./modal.types";
