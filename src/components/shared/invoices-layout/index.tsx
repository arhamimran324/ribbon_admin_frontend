"use client";

import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";

import BackButton from "@/components/shared/back-button";
import DataTable from "@/components/shared/data-table";
import { Typography } from "@/components/shared/typography";
import { pharmacyInvoiceData } from "@/data";
import { useAppSelector } from "@/redux/hooks";
import { InvoicesLayoutProps } from "@/types/dashboard/crm";
import Iconify from "../iconify";

let pdf: any;
let generatePDFDocument: any;

const InvoicesLayout: React.FC<InvoicesLayoutProps> = ({
  backButtonLabel,
  headerData,
  tableData,
  tableColumns,
  doctorData,
  isInvoice = true,
  paymentMethod = "",
  totals,
  type,
}) => {
  const [loading, setLoading] = useState(false);
  const pdfData = useAppSelector((state: any) => state.app.pdfData);
  console.log("doctorData", doctorData);
  // useEffect(() => {
  //   const loadPDF = async () => {
  //     const { pdf: pdfLib } = await import('@react-pdf/renderer');
  //     // const rs = await (<PharmacyPdf data={pharmacyData} />);

  //     let rs;
  //     if (type === 'pharmacyInvoice') {
  //       rs = await (<PharmacyPdf data={pdfData} />);
  //     } else if (type === 'clinicInvoice') {
  //       rs = await (<ClinicPdf data={pdfData} />);
  //     } else if (type === 'prescription') {
  //       rs = await (<PrescriptionPdf data={pdfData} />);
  //     }

  //     pdf = pdfLib;
  //     generatePDFDocument = rs;
  //   };
  //   loadPDF();
  // }, [pdfData]);

  // const handleDownload = async () => {
  //   console.log('clicked');
  //   if (!pdf || !generatePDFDocument) return;
  //   setLoading(true);
  //   const doc = generatePDFDocument;
  //   const blob = await pdf(doc).toBlob();
  //   saveAs(blob, 'dynamic-document.pdf');
  //   setLoading(false);
  // };

  //   import ClinicPdf from '@/components/sections/dashboard/crm/pdf/clinic-pdf';
  // import PharmacyPdf from '@/components/sections/dashboard/crm/pdf/pharmacy-pdf';
  // import PrescriptionPdf from '@/components/sections/dashboard/crm/pdf/prescription-pdf';

  useEffect(() => {
    const loadPDF = async () => {
      const { pdf: pdfLib } = await import("@react-pdf/renderer");

      const pdfGenerators = {
        pharmacyInvoice: () =>
          import("@/components/sections/dashboard/crm/pdf/pharmacy-pdf"),
        clinicInvoice: () =>
          import("@/components/sections/dashboard/crm/pdf/clinic-pdf"),
        prescription: () =>
          import("@/components/sections/dashboard/crm/pdf/prescription-pdf"),
      };

      if (pdfGenerators[type]) {
        const { default: generatePDF } = await pdfGenerators[type]();
        pdf = pdfLib;
        generatePDFDocument = generatePDF;
      } else {
        console.warn(`No PDF generator found for type: ${type}`);
      }
    };

    loadPDF();
  }, [type]);

  const handleDownload = async () => {
    console.log("clicked");
    if (!pdf || !generatePDFDocument) return;
    setLoading(true);
    const doc = generatePDFDocument({ data: pdfData });
    const blob = await pdf(doc).toBlob();
    saveAs(blob, "dynamic-document.pdf");
    setLoading(false);
  };
  return (
    <div className="w-full flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col justify-center items-start gap-4 sm:flex-row sm:justify-between sm:items-center pb-4 pt-2">
        <BackButton label={backButtonLabel} />
        <div className="px-6 py-3 text-md text-nowrap bg-gradient-blue text-white font-medium rounded-lg hover:bg-blue transition flex items-center space-x-2">
          <button className="" onClick={handleDownload}>
            {loading ? "Generating PDF..." : "Download PDF"}
          </button>
          <Iconify icon="material-symbols:download-rounded" />
        </div>
      </div>
      <div className="w-full custom-shadow relative rounded-[16px] py-10 px-6 md:px-20 bg-white">
        {/* Clinic Info */}
        <div className="w-full flex flex-col gap-2 justify-center items-center text-gray py-6">
          <Typography size="md">{headerData?.clinic.name}</Typography>
          <Typography
            size="md"
            className=" w-[80%] md:w-[40%] lg:w-[30%] text-center"
          >
            {headerData?.clinic.address}
          </Typography>
          <Typography size="md">{headerData?.clinic.phone}</Typography>
        </div>
        {/* Invoice/Prescription Info */}
        <div className=" flex flex-col gap-6 md:gap-0 sm:flex-row justify-between items-start py-6">
          <div className="flex flex-col gap-2">
            <Typography size="h3" className="font-bold text-blue">
              {headerData?.prescription.title}
            </Typography>
            <Typography size="md" className="text-gray font-bold">
              {headerData?.prescription.number}
            </Typography>
            <Typography size="md" className="">
              {isInvoice ? (
                <>
                  <span className="text-gray font-semibold">
                    Invoice Date:{" "}
                  </span>
                  <span className="text-blue font-bold">
                    {headerData?.prescription.date}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-gray font-semibold">
                    Prescription Date:{" "}
                  </span>
                  <span className="text-blue font-bold pl-1">
                    {headerData?.prescription.date}
                  </span>
                </>
              )}
            </Typography>
            {isInvoice && headerData?.prescription.issueDate && (
              <Typography size="md" className="text-gray">
                Issue Date:{" "}
                <span className="text-blue font-bold">
                  {headerData?.prescription.issueDate}
                </span>
              </Typography>
            )}
            {isInvoice && paymentMethod && (
              <div>
                <Typography size="md" className="text-gray">
                  Payment:{" "}
                  <span className="text-blue font-bold">{paymentMethod}</span>
                </Typography>
                <Typography size="md" className="text-gray">
                  {pharmacyInvoiceData.prescription.walletAddress}
                </Typography>
              </div>
            )}
          </div>
          {/* Patient Info */}
          <div className=" w-full md:w-[30%] flex flex-col gap-2">
            <Typography size="xl" className="font-bold text-blue">
              {headerData?.patient.name}
            </Typography>
            <Typography size="md" className="text-blue font-bold">
              DOB: {headerData?.patient.dob}
            </Typography>
            <Typography size="sm" className="text-gray font-semibold">
              {headerData?.patient.email}
            </Typography>
            <Typography size="sm" className="text-gray font-semibold">
              {headerData?.patient.address}
            </Typography>
            <Typography size="sm" className="text-gray font-semibold">
              {headerData?.patient.phone}
            </Typography>
          </div>
        </div>
        {/* Table */}
        <DataTable
          invoice
          loading={false}
          tableRows={tableData}
          ColumnsData={tableColumns}
          rowsPerPage={7}
          TableBodyRow={({ ...row }) => (
            <tr className="align-middle">
              {tableColumns.map((column, index) => (
                <td
                  key={column.id}
                  className={`py-4 text-[#312D2D] border-r border-l border-b border-light-gray 
                      ${index === 0 ? "text-left pl-6" : "text-center"}
                      align-middle
                    `}
                >
                  {row[column.id]}
                </td>
              ))}
            </tr>
          )}
        />
        {/* Totals Section */}
        {isInvoice && (
          <div className="flex flex-col gap-4 py-10 text-sm font-semibold text-[#312D2D]">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <Typography size="sm">Sub Total:</Typography>
                <span> £{totals.subTotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <Typography size="sm">Tax: Vat (0%):</Typography>
                <span> £{totals.tax}</span>
              </div>
              <div className="flex justify-between items-center">
                <Typography size="sm">Discount:</Typography>
                <span> £{totals.discount}</span>
              </div>
            </div>
            <div className="w-full flex justify-between items-center bg-gradient-blue text-white px-6 py-4">
              <Typography size="lg" className="font-bold">
                Grand Total:
              </Typography>
              <span className="">£{totals.grandTotal}</span>
            </div>
          </div>
        )}
        {/* Footer Section */}
        {type === "prescription" && (
          <div className="flex flex-col gap-2 py-10">
            <div className="flex flex-col md:flex-row gap-2">
              <Typography size="lg" className="font-bold text-blue">
                Comment:
              </Typography>
              <Typography size="lg" className="text-gray font-normal ">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. Lorem ipsum,
                dolor sit amet consectetur adipisicing elit. Commodi, modi
                consectetur? Dolor, sapiente officia officiis ea reiciendis unde
                at pariatur itaque, placeat enim eveniet magnam. Quam tempora
                atque molestiae vel.
              </Typography>
            </div>
            <div className="pt-6 flex flex-col md:flex-row justify-between gap-3 md:gap-0 items-start">
              <div className="flex= flex-col justify-center items-start">
                <Typography size="lg" className="text-gray font-bold">
                  Reported By:
                </Typography>
                <Typography size="lg" className="text-blue font-bold">
                  Medi Care Clinic
                </Typography>
              </div>
              <div className="w-[30%] flex flex-col gap-2">
                {/* Doctor Information */}
                <Typography size="lg" className="text-gray font-bold">
                  {doctorData?.id}
                </Typography>
                <Typography size="lg" className="text-blue font-bold">
                  {doctorData?.user}
                </Typography>
                <Typography size="lg" className="text-gray font-bold">
                  {doctorData?.status}
                </Typography>
                <Typography size="lg" className="text-blue font-bold">
                  {doctorData?.email}
                </Typography>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default InvoicesLayout;
