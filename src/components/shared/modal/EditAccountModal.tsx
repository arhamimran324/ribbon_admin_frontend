import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/shared/button";
import InputTextField from "@/components/shared/input-fields/input-text-field";
import InputPasswordField from "@/components/shared/input-fields/input-password-field";
import InputDropdown from "../input-fields/input-dropdown";
import { Typography } from "@/components/shared/typography";
import ModalWrapper from ".";
import { content } from "@/data";
import { useUpdateAccount } from "@/hooks/api/xero/useUpdateAccount ";

interface EditAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountData: {
    name: string;
    code: string;
    type: string;
    AccountID: string;
  };
}

const EditAccountModal: React.FC<EditAccountModalProps> = ({
  isOpen,
  onClose,
  accountData,
}) => {
  const [dropdownItem, setDropdownItem] = useState(accountData?.type || "");
  const { mutate, isPending } = useUpdateAccount(onClose); // Add your hook

  useEffect(() => {
    if (accountData?.type) setDropdownItem(accountData.type);
  }, [accountData]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: accountData?.name || "",
      code: accountData?.code || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Account name is required"),
      code: Yup.string().required("Code is required"),
    }),
    onSubmit: (values) => {
      const payload = {
        ...values,
        type: dropdownItem,
        tier: "PRO",
        // AccountID: accountData.AccountID,
      };
      mutate({ AccountID: accountData.AccountID, ...payload });
    },
  });

  if (!isOpen) return null;

  return (
    <ModalWrapper onClose={onClose}>
      <div className="flex justify-between items-center mb-4">
        <Typography size="xl" className="font-bold text-primary-color">
          Edit Account
        </Typography>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <InputTextField
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter Account Name"
          label="Name"
          error={formik.touched.name ? formik.errors.name : ""}
          touched={formik.touched.name}
        />

        <InputPasswordField
          name="code"
          label="Code"
          value={formik.values.code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter Code"
          error={formik.touched.code ? formik.errors.code : ""}
          touched={formik.touched.code}
        />

        <InputDropdown
          label="Select Account Type"
          options={content.accountType}
          isDisabled={true}
          value={dropdownItem}
          onSelect={(selected) => {
            setDropdownItem(
              typeof selected === "string" ? selected : selected[0],
            );
          }}
          placeholder="Select Type"
          className="border border-light-gray !rounded-[8px]"
          isSearchable={false}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Updating..." : "Update"}
        </Button>
      </form>
    </ModalWrapper>
  );
};

export default EditAccountModal;
