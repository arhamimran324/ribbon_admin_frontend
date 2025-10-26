import React, { FC, useState } from "react";

import Modal from "../custom-modal";
import Iconify from "../iconify";
import InputTextField from "../input-fields/input-text-field";
import { Typography } from "../typography";

interface OptionProps {
  title?: string;
  initialOptions?: any[];
  onOptionChange: (index: number, value: any) => void;
  onAddOption?: () => void;
  onRemoveOption?: (index: number) => void;
  onAddPairOption?: () => void;
  onRemovePairOption?: (index: number) => void;
  options2?: boolean;
  heading?: string;
}

const Options: FC<OptionProps> = ({
  title,
  heading,
  initialOptions = [],
  onOptionChange,
  onAddOption,
  onRemoveOption,
  onAddPairOption,
  onRemovePairOption,
  options2 = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const openDeleteModal = (index: number) => {
    setDeleteIndex(index);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      if (options2 && onRemovePairOption) {
        // If deleting a pair, remove both elements in the pair
        onRemovePairOption(deleteIndex);
      } else if (onRemoveOption) {
        // If deleting a single option
        onRemoveOption(deleteIndex);
      }
    }
    setIsModalOpen(false);
  };

  if (options2) {
    return (
      <div className="flex flex-col rounded-[16px]">
        <div className="flex justify-end items-center px-4 sm:px-2">
          <Iconify
            icon="gridicons:add"
            width={24}
            height={24}
            color="#41BA37"
            onClick={onAddPairOption}
            className="cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[27px] gap-x-7 px-4">
          {initialOptions.map((pair, groupIndex) => (
            <div key={groupIndex} className="rounded-lg space-y-1">
              <Typography
                size="md"
                className="text-blue font-semibold leading-none"
              >
                {heading} {groupIndex + 1}
              </Typography>
              <div className="space-y-4 border px-5 pt-2.5 pb-5 rounded-[12px]">
                <div className="flex justify-end items-center">
                  <Iconify
                    icon="zondicons:minus-solid"
                    width={18}
                    color="#C9311A"
                    onClick={() => openDeleteModal(groupIndex)}
                    className={`cursor-pointer ${groupIndex <= 0 ? "invisible" : "block"}`}
                  />
                </div>
                <div className="relative">
                  <div className="flex items-start gap-2">
                    <div className="flex-grow">
                      <InputTextField
                        placeholder="Option 1"
                        placeholderTop
                        value={pair.option1}
                        onChange={(e) =>
                          onOptionChange(groupIndex, {
                            ...pair,
                            option1: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="flex items-start gap-2">
                    <div className="flex-grow">
                      <InputTextField
                        placeholder="Option 2"
                        placeholderTop
                        value={pair.option2}
                        onChange={(e) =>
                          onOptionChange(groupIndex, {
                            ...pair,
                            option2: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type="delete"
          deleteType="option"
          onConfirm={confirmDelete}
          id={deleteIndex ?? null}
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Typography size="lg" className="text-blue font-bold">
          {title}
        </Typography>
        <Iconify
          icon="gridicons:add"
          width={24}
          height={24}
          color="#41BA37"
          onClick={onAddOption}
          className="cursor-pointer"
        />
      </div>
      <div
        className={`grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 px-2 items-end`}
      >
        {initialOptions?.map((field, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="flex justify-end items-center">
              {index > 0 && (
                <Iconify
                  icon="zondicons:minus-solid"
                  width={18}
                  color="#C9311A"
                  onClick={() => openDeleteModal(index)}
                  className="cursor-pointer"
                />
              )}
            </div>
            <div className="">
              <InputTextField
                placeholder={`Option ${index + 1}`}
                placeholderTop
                value={field}
                onChange={(e) => onOptionChange(index, e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="delete"
        deleteType="option"
        onConfirm={confirmDelete}
        id={deleteIndex ?? null}
      />
    </div>
  );
};

export default Options;
