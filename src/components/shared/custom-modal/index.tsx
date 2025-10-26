"use client";

import React, { useEffect } from "react";

import { Button } from "../button";
import ModalWrapper from "../modal";
import ScrollContainer from "../scrollable-container";
import { Typography } from "../typography";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (id?: number) => void;
  type: "block" | "delete" | "logout";
  message?: string;
  id?: number | null;
  deleteType?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  type,
  message,
  id,
  deleteType,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Determine modal title, message, and confirm button text based on type
  const modalTitle =
    type === "block" ? "Block" : type === "delete" ? "Delete" : "Logout";
  const modalMessage =
    type === "block"
      ? message
      : type === "delete"
        ? `Are you sure you want to delete this ${deleteType}?`
        : "Are you sure you want to Logout?";
  const confirmButtonText =
    type === "block" ? "Block" : type === "delete" ? "Delete" : "Logout";

  return (
    <ModalWrapper
      title={modalTitle}
      titleStyling={"text-left"}
      onClose={onClose}
    >
      <div className="flex flex-col gap-8">
        <div className="text-start">
          <ScrollContainer>
            <Typography size="lg" className="text-gray text-wrap">
              {modalMessage}
            </Typography>
          </ScrollContainer>
        </div>

        {/* Modal Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <Button
            variant="outlined"
            size="medium"
            className="w-full"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            size="medium"
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onConfirm) {
                if (type === "delete" && id) {
                  onConfirm(id); // For delete modal
                } else if (type === "block") {
                  onConfirm(); // For block modal
                } else if (type === "logout") {
                  onConfirm(); // For logout modal
                }
              }
            }}
          >
            {confirmButtonText}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default Modal;
