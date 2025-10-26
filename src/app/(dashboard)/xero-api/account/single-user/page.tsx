"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import SpinnerLoader from "@/components/shared/loader";
import { Typography } from "@/components/shared/typography";
import BackButton from "@/components/shared/back-button";
import { formatDate } from "@/utils/format-time";
import { useGetSinglaUserAccount } from "@/hooks/api/xero/useGetSinglaUserAccount copy";

const SingleUser = () => {
  const selectedId = useAppSelector((state) => state.app?.singleuserId);
  const { data: singleData, isLoading } = useGetSinglaUserAccount(selectedId);

  return isLoading ? (
    <SpinnerLoader />
  ) : (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <Typography size="xl" className="font-bold text-primary-color mb-4">
        <BackButton /> Account Details
      </Typography>

      {/* 🧾 Loop through Accounts if available */}
      {singleData?.Accounts?.map(
        (
          account: {
            AccountID: any;
            Name:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<
                  unknown,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactPortal
                  | React.ReactElement<
                      unknown,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | null
                  | undefined
                >
              | null
              | undefined;
            Type:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<
                  unknown,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactPortal
                  | React.ReactElement<
                      unknown,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | null
                  | undefined
                >
              | null
              | undefined;
            Code:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<
                  unknown,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactPortal
                  | React.ReactElement<
                      unknown,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | null
                  | undefined
                >
              | null
              | undefined;
            Description:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<
                  unknown,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactPortal
                  | React.ReactElement<
                      unknown,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | null
                  | undefined
                >
              | null
              | undefined;
            Class:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<
                  unknown,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactPortal
                  | React.ReactElement<
                      unknown,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | null
                  | undefined
                >
              | null
              | undefined;
            ReportingCode:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<
                  unknown,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactPortal
                  | React.ReactElement<
                      unknown,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | null
                  | undefined
                >
              | null
              | undefined;
            TaxType:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<
                  unknown,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactPortal
                  | React.ReactElement<
                      unknown,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | null
                  | undefined
                >
              | null
              | undefined;
            Status:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<
                  unknown,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactPortal
                  | React.ReactElement<
                      unknown,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | null
                  | undefined
                >
              | null
              | undefined;
          },
          index: any,
        ) => (
          <div
            key={account.AccountID || index}
            className="mb-6 p-4 border rounded-lg bg-gray-50"
          >
            <Typography size="lg" className="font-semibold mb-2 text-gray-700">
              {account.Name} ({account.Type})
            </Typography>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Typography size="sm" className="text-gray-500">
                  Code
                </Typography>
                <Typography size="md" className="font-medium">
                  {account.Code}
                </Typography>
              </div>

              <div>
                <Typography size="sm" className="text-gray-500">
                  Description
                </Typography>
                <Typography size="md" className="font-medium">
                  {account.Description}
                </Typography>
              </div>

              <div>
                <Typography size="sm" className="text-gray-500">
                  Class
                </Typography>
                <Typography size="md" className="font-medium">
                  {account.Class}
                </Typography>
              </div>

              <div>
                <Typography size="sm" className="text-gray-500">
                  Reporting Code
                </Typography>
                <Typography size="md" className="font-medium">
                  {account.ReportingCode}
                </Typography>
              </div>

              <div>
                <Typography size="sm" className="text-gray-500">
                  Tax Type
                </Typography>
                <Typography size="md" className="font-medium">
                  {account.TaxType}
                </Typography>
              </div>

              <div>
                <Typography size="sm" className="text-gray-500">
                  Status
                </Typography>
                <Typography size="md" className="font-medium">
                  {account.Status}
                </Typography>
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default SingleUser;
