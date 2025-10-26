"use client";

import React from "react";
import { useFormik } from "formik";
import ModalWrapper from "@/components/shared/modal";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import InputTextField from "@/components/shared/input-fields/input-text-field";
import InputDropdown from "@/components/shared/input-fields/input-dropdown";

interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  category: "Active" | "In-active";
}

interface AddFaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (faq: FaqItem) => void;
  initialData?: FaqItem | null;
}

const AddFaqModal: React.FC<AddFaqModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}) => {
  if (!isOpen) return null;

  const categoryOptions: {
    label: "Active" | "In-active";
    value: "Active" | "In-active";
  }[] = [
    { label: "Active", value: "Active" },
    { label: "In-active", value: "In-active" },
  ];

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: {
      question: initialData?.question || "",
      answer: initialData?.answer || "",
      category: (initialData?.category as "Active" | "In-active") || "Active",
    },
    onSubmit: (values) => {
      const newFaq = {
        _id: initialData?._id as string,
        ...values,
      };
      onSave?.(newFaq);
      onClose();
    },
  });

  return (
    <ModalWrapper onClose={onClose}>
      <Typography size="xl" className="font-bold text-primary-color mb-4">
        {initialData ? "Edit FAQ" : "Add FAQ"}
      </Typography>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"
      >
        <InputTextField
          name="question"
          //   label="Question"
          placeholder="Add FAQ Question"
          value={values.question}
          onChange={handleChange}
        />

        <InputTextField
          name="answer"
          //   label="Answer"
          placeholder="Add FAQ Answer"
          value={values.answer}
          onChange={handleChange}
        />

        <InputDropdown
          //   label="Status"
          options={categoryOptions}
          value={values.category}
          onSelect={(val) => setFieldValue("category", val)}
          className="border border-1 rounded-[12px]"
        />

        <Button type="submit" className="w-full">
          {initialData ? "Update FAQ" : "Add FAQ"}
        </Button>
      </form>
    </ModalWrapper>
  );
};

export default AddFaqModal;
