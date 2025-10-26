"use client";

import React from "react";
import ModalWrapper from "@/components/shared/modal";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { Rating } from "react-simple-star-rating";
import Iconify from "@/components/shared/iconify";

interface FeedbackRow {
  id: string;
  productName: string;
  customerName: string;
  email: string;
  rating: number;
  comment: string;
  date: string;
}

interface FeedbackDetailModalProps {
  isOpen: boolean;
  data: FeedbackRow | null;
  onClose: () => void;
}

const FeedbackDetailModal: React.FC<FeedbackDetailModalProps> = ({
  isOpen,
  data,
  onClose,
}) => {
  if (!isOpen || !data) return null;

  return (
    <ModalWrapper onClose={onClose}>
      <div className="relative max-h-[80vh] overflow-y-auto p-6">
        {/* Header */}
        <Typography size="xl" className="font-bold text-primary-color mb-6">
          Customer Feedback
        </Typography>

        {/* Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
          <DetailItem label="Product" value={data.productName} />
          <DetailItem label="User" value={data.customerName} />
          <DetailItem label="Email" value={data.email} />
          <div className="flex flex-col">
            <span className="font-semibold mb-1">Rating</span>
            <div className="flex items-center gap-2">
              <Rating
                size={20}
                initialValue={data.rating}
                allowHover={false}
                allowFraction
                readonly
                SVGstyle={{ display: "inline-block" }}
              />
              <span className="text-gray-500 text-xs">({data.rating}/5)</span>
            </div>
          </div>
          <DetailItem label="Date" value={data.date} />

          <div className="sm:col-span-2">
            <span className="font-semibold mb-1 block">Comment</span>
            <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 border border-gray-200 p-3 rounded-md">
              {data.comment}
            </p>
          </div>
        </div>

        {/* Bottom Close Button */}
        <div className="mt-8">
          <Button className="w-[40%] float-end" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

// 🔹 Reusable subcomponent for cleaner code
const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="font-semibold">{label}:</span>{" "}
    <span className="text-gray-700">{value}</span>
  </div>
);

export default FeedbackDetailModal;
