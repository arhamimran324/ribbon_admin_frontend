"use client";

import React, { useState, useMemo, useEffect } from "react";
import Container from "@/components/shared/container";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import SearchInput from "@/components/shared/search-bar";
import PaginationDataTable from "@/components/data-table/pagination-data-table";
import ConfirmDeleteModal from "@/components/shared/modal/confirmDeleteModal";
import AddProductModal from "@/components/shared/modal/AddProductModal";
import Iconify from "@/components/shared/iconify";
import {
  createProduct,
  updateProduct,
  getProducts,
  deleteProduct,
} from "@/api/service/dashboard";
import { toast } from "react-toastify";
import Loading from "@/app/loading";

const statusFilters = ["All", "Available", "Out of Stock"];
const categoryFilters = ["All", "Electronics", "Fashion", "Groceries"];

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

const ProductPage = () => {
  const [data, setData] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<null | ProductRow>(null);
  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    productId: string | null;
  } | null>(null);

  // Fetch products on component mount and when filters change
  useEffect(() => {
    fetchProducts();
  }, [statusFilter, categoryFilter, search, currentPage, rowsPerPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const filters: any = {
        page: currentPage,
        limit: rowsPerPage,
      };

      if (statusFilter !== "All") {
        filters.status =
          statusFilter === "Available" ? "In Stock" : "Out of Stock";
      }

      if (categoryFilter !== "All") {
        filters.category = categoryFilter;
      }

      if (search) {
        filters.search = search;
      }

      const response = await getProducts(filters);

      if (response.success) {
        setData(response.data.products || []);
      } else {
        console.error("Failed to fetch products:", response.message);
        setData([]);
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
      toast.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((product) => {
      const matchStatus =
        statusFilter === "All" ||
        product.status ===
          (statusFilter === "Available" ? "In Stock" : "Out of Stock");
      const matchCategory =
        categoryFilter === "All" || product.category === categoryFilter;
      const matchSearch = product.productName
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchStatus && matchCategory && matchSearch;
    });
  }, [data, statusFilter, categoryFilter, search]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  }, [filteredData, currentPage, rowsPerPage]);

  const meta = {
    totalItems: filteredData.length,
    itemsPerPage: rowsPerPage,
    currentPage,
    totalPages: Math.ceil(filteredData.length / rowsPerPage),
  };

  const handleSaveProduct = async (productData: any) => {
    try {
      let response;

      if (editProduct) {
        // Update existing product
        response = await updateProduct(editProduct._id, productData);

        if (response.success) {
          toast.success("Product updated successfully");
          await fetchProducts(); // Refresh the list
          setModalOpen(false);
          setEditProduct(null);
        } else {
          toast.error("Failed to update product");
        }
      } else {
        // Create new product
        response = await createProduct(productData);

        if (response.success) {
          toast.success("Product created successfully");
          await fetchProducts(); // Refresh the list
          setModalOpen(false);
          setEditProduct(null);
        } else {
          toast.error("Failed to create product");
        }
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Error saving product");
    }
  };

  const handleDelete = async (id: string | null) => {
    if (!id) return;

    try {
      const response = await deleteProduct(id);

      if (response.success) {
        toast.success("Product deleted successfully");
        await fetchProducts(); // Refresh the list
        setConfirmDelete({ open: false, productId: null });
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product");
    }
  };

  const handleStatusDisplay = (status: string) => {
    return status === "In Stock" ? "Available" : "Out of Stock";
  };

  const handleStatusColor = (status: string) => {
    return status === "In Stock"
      ? "bg-light-paid text-green"
      : "bg-light-red text-red";
  };

  const columnsData = [
    { label: "Product Name", key: "productName", id: "productName" },
    { label: "Description", key: "description", id: "description" },
    { label: "Price", key: "price", id: "price" },
    { label: "Discount", key: "discount", id: "discount" },
    { label: "Category", key: "category", id: "category" },
    { label: "Image", key: "image", id: "image" },
    { label: "Status", key: "status", id: "status" },
    { label: "Actions", key: "actions", id: "actions" },
  ];

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
              Products
            </Typography>
            <Button
              onClick={() => {
                setEditProduct(null);
                setModalOpen(true);
              }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Add Product"}
            </Button>
          </div>

          {/* Status Tabs */}
          <div className="flex gap-6 border-b border-gray-200 mb-4">
            {statusFilters.map((status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status);
                  setCurrentPage(1);
                }}
                className={`pb-2 transition-all duration-300 border-b-2 ${
                  statusFilter === status
                    ? "text-primary-text border-primary-text font-semibold"
                    : "text-gray-500 border-transparent"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Category + Search */}
          <div className="flex flex-wrap gap-4 mb-4 items-center">
            <div className="min-w-[180px]">
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-color w-full"
              >
                {categoryFilters.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <SearchInput
              placeholder="Search by product name"
              onChange={(e: any) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loading />
            </div>
          ) : (
            <PaginationDataTable
              paginate={filteredData.length > rowsPerPage}
              ColumnsData={columnsData}
              tableRows={paginatedData}
              roundedHeader
              setCurrentPage={setCurrentPage}
              setRowsPerPage={setRowsPerPage}
              meta={meta}
              TableBodyRow={(product: ProductRow) => {
                const {
                  _id,
                  productName,
                  description,
                  price,
                  discount,
                  category,
                  image,
                  status,
                } = product;

                return (
                  <tr key={_id} className="border-b border-light-gray">
                    <td className="px-4 py-4 text-md">{productName}</td>
                    <td className="px-4 py-4 text-md">{description}</td>
                    <td className="px-4 py-4 text-md text-center">{`£${price}`}</td>
                    <td className="px-4 py-4 text-md text-center">{`${discount}%`}</td>
                    <td className="px-4 py-4 text-md text-center">
                      {category}
                    </td>
                    <td className="px-4 py-4 text-md text-center">
                      {image ? (
                        <img
                          src={image}
                          alt={productName}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-4 py-4 text-md text-center">
                      <span
                        className={`p-2 rounded-md text-sm ${handleStatusColor(status)}`}
                      >
                        {handleStatusDisplay(status)}
                      </span>
                    </td>

                    <td className="px-4 py-4 flex items-center justify-center gap-2 mt-3">
                      <div
                        className="cursor-pointer text-blue"
                        onClick={() => {
                          setEditProduct(product);
                          setModalOpen(true);
                        }}
                      >
                        <Iconify icon="ep:edit" />
                      </div>
                      <div
                        className="cursor-pointer text-red"
                        onClick={() =>
                          setConfirmDelete({ open: true, productId: _id })
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

      {/* Modals */}
      {modalOpen && (
        <AddProductModal
          isOpen={modalOpen}
          setIsOpen={setModalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditProduct(null);
          }}
          initialData={editProduct}
          onSave={handleSaveProduct}
        />
      )}

      {confirmDelete?.open && (
        <ConfirmDeleteModal
          isOpen={true}
          title="Delete Product"
          description="Are you sure you want to delete this product? This action cannot be undone."
          onConfirm={() => handleDelete(confirmDelete.productId)}
          onClose={() => setConfirmDelete({ open: false, productId: null })}
        />
      )}
    </>
  );
};

export default ProductPage;
