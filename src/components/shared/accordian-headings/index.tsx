import React, { FC, useState } from "react";

import Modal from "../custom-modal";
import Iconify from "../iconify";
import InputTextField from "../input-fields/input-text-field";
import RTE from "../text-editor/TextEditor";
import { Typography } from "../typography";

interface HeadingProps {
  initialOptions?: { heading: string; paragraph: string }[];
  onChange: (
    index: number,
    field: "heading" | "paragraph",
    value: string,
  ) => void;
  onAdd?: () => void;
  onRemove?: (index: number) => void;
  setField?: any;
}

const Headings: FC<HeadingProps> = ({
  initialOptions = [],
  onAdd,
  onRemove,
  setField,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const openDeleteModal = (index: number) => {
    setDeleteIndex(index);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null && onRemove) {
      onRemove(deleteIndex);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col rounded-[16px]">
      <div className="flex justify-end items-center">
        <Iconify
          icon="gridicons:add"
          width={24}
          height={24}
          color="#41BA37"
          onClick={onAdd}
          className="cursor-pointer"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-[30px] px-2 lg:px-4">
        {initialOptions.map((field, index) => (
          <div key={index} className="rounded-lg space-y-1">
            <Typography size="md" className="text-blue font-semibold">
              {String(index + 1).padStart(2, "0")}
            </Typography>
            <div className="space-y-4 border px-3 md:px-5 pt-2.5 pb-5 rounded-[12px]">
              <div className="flex justify-end items-center">
                <Iconify
                  icon="zondicons:minus-solid"
                  width={18}
                  color="#C9311A"
                  onClick={() => openDeleteModal(index)}
                  className={`cursor-pointer ${index <= 0 ? "invisible" : "block"}`}
                />
              </div>
              <InputTextField
                name={`securityQuestions.${index}.heading`} // Ensure correct Formik path
                placeholder={`Heading ${index + 1}`}
                placeholderTop
                value={field.heading} // Ensure case matches your initial values
                onChange={(e) =>
                  setField(`securityQuestions.${index}.heading`, e.target.value)
                }
                className="w-full"
              />

              <div className="flex flex-col gap-1">
                <Typography size="sm" className="text-gray font-semibold">
                  Paragraph
                </Typography>
                <RTE
                  value={field.paragraph}
                  onChange={(value) =>
                    setField(`securityQuestions.${index}.paragraph`, value)
                  }
                  name={`securityQuestions.${index}.paragraph`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        type="delete"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        deleteType="heading"
        onConfirm={confirmDelete}
        id={deleteIndex ?? null}
      />
    </div>
  );
};

export default Headings;
