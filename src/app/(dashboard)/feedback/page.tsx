// FeedbackPage.tsx (Updated)
"use client";

import React, { useState, useEffect } from "react";
import Container from "@/components/shared/container";
import DataTable from "@/components/shared/data-table";
import SearchInput from "@/components/shared/search-bar";
import { Typography } from "@/components/shared/typography";
import Iconify from "@/components/shared/iconify";
import ConfirmDeleteModal from "@/components/shared/modal/confirmDeleteModal";
import { Rating } from "react-simple-star-rating";
import FeedbackDetailModal from "@/components/shared/modal/FeedbackDetailModal";
import { getAllFeedbacks } from "@/api/service/dashboard";
import Loading from "@/app/loading";

interface FeedbackRow {
  id: string;
  productName: string;
  customerName: string;
  email: string;
  rating: number;
  comment: string;
  date: string;
  productId: string;
  userId: string;
  images?: string[];
  orderId: string;
}

interface ApiFeedback {
  _id: string;
  user: {
    name: string;
    email: string;
    _id: string;
  };
  product: {
    productName: string;
    _id: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  images: string[];
  order: string;
}

const FeedbackPage = () => {
  const [data, setData] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    feedbackId: string | null;
  } | null>(null);
  const [detailModal, setDetailModal] = useState<FeedbackRow | null>(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    rating: "",
    search: "",
  });

  // Fetch feedbacks from API
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await getAllFeedbacks(filters);

      if (response.success) {
        const formattedData: FeedbackRow[] = response.data.feedbacks.map(
          (feedback: ApiFeedback) => ({
            id: feedback._id,
            productName: feedback.product.productName,
            customerName: feedback.user.name,
            email: feedback.user.email,
            rating: feedback.rating,
            comment: feedback.comment,
            date: new Date(feedback.createdAt).toLocaleDateString(),
            productId: feedback.product._id,
            userId: feedback.user._id,
            images: feedback.images,
            orderId: feedback.order,
          })
        );
        setData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [filters]);

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: search,
        page: 1, // Reset to first page when searching
      }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleDelete = async (id: string | null) => {
    if (!id) return;

    try {
      // You'll need to implement deleteFeedback API call
      // await deleteFeedback(id);
      setData((prev) => prev.filter((item) => item.id !== id));
      setConfirmDelete({ open: false, feedbackId: null });
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const handleRatingFilter = (rating: string) => {
    setFilters((prev) => ({
      ...prev,
      rating: rating,
      page: 1,
    }));
  };

  const columns = [
    { id: "productName", label: "Product" },
    { id: "customerName", label: "Customer" },
    { id: "email", label: "Email" },
    { id: "rating", label: "Rating" },
    { id: "comment", label: "Comment" },
    { id: "date", label: "Date" },
    { id: "actions", label: "Actions" },
  ];

  if (loading) {
    return (
      <Container>
        <div className="p-4">
          <Loading />
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
              Customer Feedback ({data.length})
            </Typography>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[300px]">
              <SearchInput
                placeholder="Search by customer name, email, or product..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            <div className="flex gap-2">
              <select
                value={filters.rating}
                onChange={(e) => handleRatingFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>

          {data.length === 0 ? (
            <div className="text-center py-8">
              <Typography size={"h4"} className="text-gray-500 mb-4">
                {search || filters.rating
                  ? "No feedback found matching your criteria."
                  : "No feedback found."}
              </Typography>
              {(search || filters.rating) && (
                <button
                  onClick={() => {
                    setSearch("");
                    setFilters({
                      page: 1,
                      limit: 10,
                      rating: "",
                      search: "",
                    });
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <DataTable
              ColumnsData={columns}
              tableRows={data}
              TableBodyRow={(item: FeedbackRow) => {
                const {
                  id,
                  productName,
                  customerName,
                  email,
                  rating,
                  comment,
                  date,
                } = item;

                const truncatedComment =
                  comment.length > 30 ? `${comment.slice(0, 30)}...` : comment;

                return (
                  <tr
                    key={id}
                    className="border-b border-light-gray hover:bg-gray-50"
                  >
                    <td className="px-4 py-4 text-sm font-medium">
                      {productName}
                    </td>
                    <td className="px-4 py-4 text-sm">{customerName}</td>
                    <td className="px-4 py-4 text-sm">{email}</td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <div className="flex items-center">
                          <Rating
                            size={16}
                            initialValue={rating}
                            allowHover={false}
                            allowFraction
                            readonly
                            SVGstyle={{ display: "inline-block" }}
                          />
                        </div>
                        <span className="text-gray-500 text-sm">
                          ({rating})
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm">{truncatedComment}</td>
                    <td className="px-4 py-4 text-sm">{date}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center items-center gap-3">
                        <div
                          className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
                          onClick={() => setDetailModal(item)}
                          title="View Details"
                        >
                          <Iconify
                            icon="hugeicons:eye"
                            width="18"
                            height="18"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              }}
            />
          )}
        </div>
      </Container>

      {confirmDelete && confirmDelete.open && (
        <ConfirmDeleteModal
          isOpen={true}
          title="Delete Feedback"
          description="Are you sure you want to delete this feedback? This action cannot be undone."
          onConfirm={() => handleDelete(confirmDelete.feedbackId)}
          onClose={() => setConfirmDelete({ open: false, feedbackId: null })}
        />
      )}

      {detailModal && (
        <FeedbackDetailModal
          isOpen={!!detailModal}
          data={detailModal}
          onClose={() => setDetailModal(null)}
        />
      )}
    </>
  );
};

export default FeedbackPage;
