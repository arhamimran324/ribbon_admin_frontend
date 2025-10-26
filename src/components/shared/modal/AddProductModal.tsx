"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/shared/button";
import InputTextField from "@/components/shared/input-fields/input-text-field";
import InputNumberField from "@/components/shared/input-fields/input-number-field";
import InputDropdown from "@/components/shared/input-fields/input-dropdown";
import { Typography } from "@/components/shared/typography";
import ModalWrapper from ".";

interface ProductRow {
  _id: string;
  productName: string;
  description: string;
  price: string;
  discount: string;
  status: string;
  category: string;
  image?: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave: (product: ProductRow) => void;
  initialData?: ProductRow | null;
  onClose: (open: boolean) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  setIsOpen,
  onSave,
  initialData,
  onClose,
}) => {
  if (!isOpen) return null;

  const statusOptions = [
    { label: "Available", value: "Available" },
    { label: "Out of Stock", value: "Out of Stock" },
  ];

  const categoryOptions = [
    { label: "Electronics", value: "Electronics" },
    { label: "Fashion", value: "Fashion" },
    { label: "Fitness", value: "Fitness" },
    { label: "Groceries", value: "Groceries" },
  ];

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: {
      _id: initialData?._id || "",
      productName: initialData?.productName || "",
      description: initialData?.description || "",
      price: initialData?.price || "",
      discount: initialData?.discount || "",
      status: initialData?.status || "Status",
      category: initialData?.category || "Select Category",
      image: initialData?.image || "",
    },
    onSubmit: (values) => {
      onSave(values as ProductRow);
    },
  });

  return (
    <ModalWrapper onClose={() => setIsOpen(false)}>
      <Typography size="xl" className="font-bold text-primary-color mb-4">
        {initialData ? "Edit Product" : "Add Product"}
      </Typography>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"
      >
        <InputTextField
          name="productName"
          label="Product Name"
          value={values.productName}
          onChange={handleChange}
        />

        {/* Price and Discount in one row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <InputNumberField
              name="price"
              label="Price (£)"
              value={values.price}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <InputNumberField
              name="discount"
              label="Discount (%)"
              value={values.discount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Image
          </label>

          <div className="relative w-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.currentTarget.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFieldValue("image", reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {!values.image ? (
              <span className="text-sm text-gray-500">
                Click or drag to upload image
              </span>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <img
                  src={values.image}
                  alt="Preview"
                  className=" object-cover rounded shadow"
                />
                <span className="text-xs text-gray-500">Click to change</span>
              </div>
            )}
          </div>
        </div>

        <InputDropdown
          options={statusOptions}
          value={values.status}
          onSelect={(val) => setFieldValue("status", val)}
          className="border border-1 rounded-[12px]"
        />

        <InputDropdown
          options={categoryOptions}
          value={values.category}
          onSelect={(val) => setFieldValue("category", val)}
          className="border border-1 rounded-[12px]"
        />

        {/* Description moved to end */}

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={values.description}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full">
          {initialData ? "Update Product" : "Add Product"}
        </Button>
      </form>
    </ModalWrapper>
  );
};

export default AddProductModal;
