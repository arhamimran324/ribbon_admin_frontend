"use client";

import React from "react";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import ModalWrapper from ".";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "Do you really want to delete this camera?",
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper onClose={onClose}>
      <div className="space-y-4">
        <Typography size="xl" className="font-bold text-red-600">
          {title}
        </Typography>
        <Typography size="sm" className="text-gray-600">
          {description}
        </Typography>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outlined"
            size="small"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="small"
            className="bg-red-600 text-white"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Confirm"}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmDeleteModal;
