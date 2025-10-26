"use client";

import React, { useState, useEffect } from "react";
import Container from "@/components/shared/container";
import SearchInput from "@/components/shared/search-bar";
import { Typography } from "@/components/shared/typography";
import Iconify from "@/components/shared/iconify";
import ConfirmDeleteModal from "@/components/shared/modal/confirmDeleteModal";
import PaginationDataTable from "@/components/data-table/pagination-data-table";
import { deleteContactUs, getAllContactUs } from "@/api/service/dashboard"; // Import your API function
import { toast } from "react-toastify";
import Loading from "@/app/loading";

interface ContactRow {
  _id: string;
  name: string;
  email: string;
  subject: string;
  description: string;
  phoneNumber?: string;
  createdAt: string;
  status?: string;
}

const ContactPage = () => {
  const [data, setData] = useState<ContactRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    contactId: string | null;
  }>({ open: false, contactId: null });

  // Fetch contacts from API
  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllContactUs();

      if (response.success) {
        setData(response.data || []);
      } else {
        setError("Failed to fetch contacts");
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setError("Failed to load contact messages");
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  // Filter data based on search
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const meta = {
    totalItems: filteredData.length,
    itemsPerPage: rowsPerPage,
    currentPage,
    totalPages: Math.ceil(filteredData.length / rowsPerPage),
  };

  const handleDelete = async (id: string | null) => {
    if (!id) return;

    try {
      await deleteContactUs(id);

      setData((prev) => prev.filter((item) => item._id !== id));
      setConfirmDelete({ open: false, contactId: null });

      toast.success("Contact message deleted successfully");
    } catch (err) {
      console.error("Error deleting contact:", err);
      toast.error("Failed to delete contact message");
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Define table columns
  const columnsData = [
    { label: "Name", id: "name" },
    { label: "Email", id: "email" },
    { label: "Subject", id: "subject" },
    { label: "Message", id: "description" },
    { label: "Date", id: "createdAt" },
    { label: "Actions", id: "actions" },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="p-6 md:p-10 space-y-8 bg-white rounded-xl shadow">
        <Loading />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Container>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Typography
              size={"h3"}
              as={"h3"}
              className="text-primary-text font-bold pt-3"
            >
              Contact Messages
            </Typography>
          </div>
          <div className="flex flex-col justify-center items-center h-64">
            <Typography className="text-red-500 mb-4">{error}</Typography>
            <button
              onClick={fetchContacts}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              Retry
            </button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Typography
              size={"h3"}
              as={"h3"}
              className="text-primary-text font-bold pt-3"
            >
              Contact Messages
            </Typography>
          </div>

          <div className="mb-4">
            <SearchInput
              placeholder="Search by name, subject, or email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
          </div>

          {data.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64">
              <Typography className="text-gray-500 mb-4">
                No contact messages found
              </Typography>
              <button
                onClick={fetchContacts}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              >
                Refresh
              </button>
            </div>
          ) : (
            <PaginationDataTable
              paginate
              roundedHeader
              ColumnsData={columnsData}
              setCurrentPage={setCurrentPage}
              setRowsPerPage={setRowsPerPage}
              tableRows={paginatedData}
              meta={meta}
              TableBodyRow={(item: ContactRow) => {
                const { _id, name, email, subject, description, createdAt } =
                  item;

                return (
                  <tr key={_id} className="border-b border-light-gray">
                    <td className="px-4 py-4 text-md">{name}</td>
                    <td className="px-4 py-4 text-md">{email}</td>
                    <td className="px-4 py-4 text-md">{subject}</td>
                    <td
                      className="px-4 py-4 text-md max-w-[280px] truncate"
                      title={description}
                    >
                      {description}
                    </td>
                    <td className="px-4 py-4 text-md">
                      {formatDate(createdAt)}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div
                        className="cursor-pointer text-red hover:text-red-700"
                        onClick={() =>
                          setConfirmDelete({ open: true, contactId: _id })
                        }
                      >
                        <Iconify icon="fluent:delete-32-light" />
                      </div>
                    </td>
                  </tr>
                );
              }}
            />
          )}
        </div>
      </Container>

      {confirmDelete.open && (
        <ConfirmDeleteModal
          isOpen={true}
          title="Delete Contact Message"
          description="Are you sure you want to delete this contact message? This action cannot be undone."
          onConfirm={() => handleDelete(confirmDelete.contactId)}
          onClose={() => setConfirmDelete({ open: false, contactId: null })}
        />
      )}
    </>
  );
};

export default ContactPage;
