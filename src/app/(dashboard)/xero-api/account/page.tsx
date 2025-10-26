"use client";

import PaginationDataTable from "@/components/data-table/pagination-data-table";
import { Button } from "@/components/shared/button";
import ContainerCard from "@/components/shared/container/container-card";
import Iconify from "@/components/shared/iconify";
import AddAccountModal from "@/components/shared/modal/AddProductModal";
import ConfirmDeleteModal from "@/components/shared/modal/confirmDeleteModal";
import EditAccountModal from "@/components/shared/modal/EditAccountModal";
import { Typography } from "@/components/shared/typography";
import { newPrescription } from "@/data";
import { useGetAllAccounts } from "@/hooks/api/xero/useGetAllAccounts";
import { useGetSinglaUserAccountDelete } from "@/hooks/api/xero/useGetSinglaUserAccountDelete";
import { setUserId } from "@/redux/slices/app-slice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Accounts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const dispatch = useDispatch();

  const { data } = useGetAllAccounts();

  const { mutate: deleteAccount, isPending: isDeleting } =
    useGetSinglaUserAccountDelete(() => {
      setDeleteModalOpen(false);
      setSelectedAccountId(null);
      // refetch(); // refresh list after deletion
    });

  const paginatedData = data?.accounts?.Accounts?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const meta = {
    totalItems: data?.accounts?.Accounts?.length,
    itemsPerPage: rowsPerPage,
    currentPage,
    totalPages: Math.ceil(data?.accounts?.Accounts?.length / rowsPerPage),
  };

  const singleUserHandle = (id: string) => {
    dispatch(setUserId(id));
    router.push(`/xero-api/account/single-user`);
  };

  const handleDelete = () => {
    if (selectedAccountId) {
      deleteAccount(selectedAccountId);
    }
  };

  return (
    <div>
      <div className="flex xs:flex-row flex-col justify-between items-center w-full gap-4 py-8">
        <Typography
          size={"xl"}
          as={"p"}
          className="text-primary-text font-bold w-full xs:w-[58%]"
        >
          Accounts
        </Typography>

        <Button
          variant="outlined"
          size="medium"
          className="text-center flex justify-center"
          onClick={() => setIsModalOpen(true)}
        >
          Create Account
        </Button>
      </div>

      <ContainerCard>
        <PaginationDataTable
          paginate
          ColumnsData={newPrescription?.AccountColumnsData}
          roundedHeader={true}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          tableRows={paginatedData}
          meta={meta}
          TableBodyRow={({
            Name,
            Description,
            Class,
            AccountID,
          }: {
            Name: string;
            AccountID: string;
            date: string;
            Description: string;
            Class: string;
          }) => (
            <tr className="border-b border-light-gray ">
              <td className="text-md text-left text-primary-color py-5 px-4 lg:px-8 ">
                {Name || "-"}
              </td>
              <td className="text-md text-left text-primary-color py-5 px-4 lg:px-8 w-[40%]">
                {Description || "-"}
              </td>
              <td className="text-md text-left text-primary-color py-5 px-4 lg:px-8 ">
                {Class || "-"}
              </td>
              <td className="text-center">
                <div className="flex gap-2 items-center justify-center">
                  <div className="flex justify-center gap-4 cursor-pointer items-center bg-primary-gradient p-1.5 rounded-sm w-6 h-6">
                    <Iconify
                      className="cursor-pointer"
                      icon="mdi:eye"
                      color="#fff"
                      width="14px"
                      height="14px"
                      onClick={() => singleUserHandle(AccountID)}
                    />
                  </div>
                  <div className="flex justify-center gap-4 cursor-pointer items-center bg-primary-gradient p-1.5 rounded-sm w-6 h-6">
                    <Iconify
                      className="cursor-pointer"
                      icon="bxs:edit"
                      color="#fff"
                      width="14px"
                      height="14px"
                      onClick={() => {
                        setSelectedAccountId(AccountID);
                        const account = data?.accounts?.Accounts?.find(
                          (acc: { AccountID: string }) =>
                            acc.AccountID === AccountID,
                        );
                        if (account) {
                          setSelectedAccount({
                            name: account.Name,
                            code: account.Code,
                            type: account.Class,
                            AccountID: account.AccountID,
                          });
                          setEditModalOpen(true);
                        }
                      }}
                    />
                  </div>
                  <div className="flex justify-center gap-4 cursor-pointer items-center bg-primary-gradient p-1.5 rounded-sm w-6 h-6">
                    <Iconify
                      className="cursor-pointer"
                      icon="fluent:delete-16-regular"
                      color="#fff"
                      width="14px"
                      height="14px"
                      onClick={() => {
                        setSelectedAccountId(AccountID);
                        setDeleteModalOpen(true);
                      }}
                    />
                  </div>
                </div>
              </td>
            </tr>
          )}
        />
      </ContainerCard>

      {/* Add Account Modal */}
      {/* <AddAccountModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}

      {editModalOpen && selectedAccount && (
        <EditAccountModal
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedAccount(null);
          }}
          accountData={selectedAccount}
        />
      )}

      {/* Delete Confirm Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Confirm Deletion"
        description="Do you really want to delete this account?"
      />
    </div>
  );
};

export default Accounts;
