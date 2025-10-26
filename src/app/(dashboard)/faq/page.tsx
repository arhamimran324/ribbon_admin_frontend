"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import Iconify from "@/components/shared/iconify";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import AddFaqModal from "@/components/shared/modal/AddFaqModal";
import ConfirmDeleteModal from "@/components/shared/modal/confirmDeleteModal";
import {
  getFAQs,
  createFAQ,
  updateFAQ,
  updateFAQStatus,
  deleteFAQ,
} from "@/api/service/dashboard";
import Loading from "@/app/loading";

interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  category: "Active" | "In-active";
}

export interface FAQ {
  _id: string;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFAQData {
  title: string;
  description: string;
  isActive?: boolean;
}

export interface UpdateFAQData {
  title?: string;
  description?: string;
  isActive?: boolean;
}

export default function FaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editFaq, setEditFaq] = useState<FaqItem | null>(null);
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    faqId: null as string | null,
  });

  // Fetch FAQs on component mount
  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFAQs();
      // Transform API data to match frontend interface
      const transformedFaqs: FaqItem[] = data.map((faq: FAQ) => ({
        _id: faq._id,
        question: faq.title,
        answer: faq.description,
        category: faq.isActive ? "Active" : "In-active",
      }));

      setFaqs(transformedFaqs);
    } catch (err) {
      console.error("Error fetching FAQs:", err);
      setError("Failed to load FAQs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      setError(null);
      const newStatus = !currentStatus;

      await updateFAQStatus(id, newStatus);

      // Update local state optimistically
      setFaqs((prev) =>
        prev.map((faq) =>
          faq._id === id
            ? {
                ...faq,
                category: newStatus ? "Active" : "In-active",
              }
            : faq
        )
      );
    } catch (err) {
      console.error("Error updating FAQ status:", err);
      setError("Failed to update FAQ status. Please try again.");
      // Revert optimistic update
      fetchFAQs();
    }
  };

  const handleDelete = async (id: string | null) => {
    if (!id) return;

    try {
      setError(null);
      await deleteFAQ(id);

      // Update local state
      setFaqs((prev) => prev.filter((faq) => faq._id !== id));
      setConfirmDelete({ open: false, faqId: null });
    } catch (err) {
      console.error("Error deleting FAQ:", err);
      setError("Failed to delete FAQ. Please try again.");
      setConfirmDelete({ open: false, faqId: null });
    }
  };

  const handleSave = async (faqData: {
    question: string;
    answer: string;
    category: "Active" | "In-active";
  }) => {
    try {
      setError(null);

      if (editFaq) {
        // Update existing FAQ
        const updateData = {
          title: faqData.question,
          description: faqData.answer,
          isActive: faqData.category === "Active",
        };

        const updatedFAQ = await updateFAQ(editFaq._id, updateData);

        fetchFAQs();
      } else {
        // Create new FAQ
        const createData: CreateFAQData = {
          title: faqData.question,
          description: faqData.answer,
          isActive: faqData.category === "Active",
        };

        const newFAQ = await createFAQ(createData);

        fetchFAQs();
      }

      setModalOpen(false);
      setEditFaq(null);
    } catch (err) {
      console.error("Error saving FAQ:", err);
      setError("Failed to save FAQ. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography
          size="h3"
          as="h3"
          className="text-primary-text font-bold pt-3"
        >
          FAQ
        </Typography>
        <Button
          onClick={() => {
            setEditFaq(null);
            setModalOpen(true);
          }}
        >
          Add FAQ
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}

      <div className="space-y-4">
        {faqs.length === 0 ? (
          <div className="text-center py-8">
            <Typography size="lg" as="p" className="text-gray-600">
              No FAQs found. Create your first FAQ!
            </Typography>
          </div>
        ) : (
          faqs.map((item) => {
            const isInactive = item.category === "In-active";
            const isExpanded = expandedId === item._id;

            return (
              <div
                key={item._id}
                className={clsx(
                  "bg-white rounded-md border shadow-sm p-4 transition duration-300",
                  isInactive ? "opacity-50" : ""
                )}
              >
                <div className="flex justify-between items-center">
                  <Typography
                    size="md"
                    as="p"
                    className={clsx(
                      "font-medium text-gray-800 transition duration-300 text-md",
                      isInactive && "line-through"
                    )}
                  >
                    {item.question}
                  </Typography>

                  <div className="flex items-center gap-2">
                    {/* Toggle status */}
                    <button
                      onClick={() =>
                        toggleStatus(item._id, item.category === "Active")
                      }
                      className={clsx(
                        "font-semibold text-sm transition duration-300",
                        isInactive ? "text-gray" : "text-blue"
                      )}
                    >
                      {isInactive ? "In-active" : "Active"}
                    </button>

                    <button onClick={() => toggleExpand(item._id)}>
                      <Iconify
                        icon="mdi:eye-outline"
                        className="text-gray-500 hover:text-gray-700 cursor-pointer mt-2"
                        width={20}
                        height={20}
                      />
                    </button>

                    <Iconify
                      icon="ep:edit"
                      className="text-gray-500 hover:text-gray-700 cursor-pointer"
                      onClick={() => {
                        setEditFaq(item);
                        setModalOpen(true);
                      }}
                    />

                    <Iconify
                      icon="fluent:delete-32-light"
                      className="text-gray-500 hover:text-red cursor-pointer"
                      onClick={() =>
                        setConfirmDelete({ open: true, faqId: item._id })
                      }
                    />
                  </div>
                </div>

                {/* Collapsible answer */}
                <div
                  className={clsx(
                    "overflow-hidden transition-all duration-300 text-sm text-gray-600 mt-2",
                    isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <Typography
                    size="md"
                    as="p"
                    className="font-medium text-gray-600"
                  >
                    {item.answer}
                  </Typography>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modals */}
      {modalOpen && (
        <AddFaqModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditFaq(null);
          }}
          initialData={editFaq as FaqItem}
          onSave={handleSave}
        />
      )}

      {confirmDelete.open && (
        <ConfirmDeleteModal
          isOpen={true}
          title="Delete FAQ"
          description="Are you sure you want to delete this FAQ?"
          onConfirm={() => handleDelete(confirmDelete.faqId)}
          onClose={() => setConfirmDelete({ open: false, faqId: null })}
        />
      )}
    </div>
  );
}
