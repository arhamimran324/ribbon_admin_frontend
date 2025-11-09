"use client";

import { Document, Page, Text, View } from "@react-pdf/renderer";

const PharmacyPdf = ({ data }: any) => {
  const { clinic, patient, invoice, items, totals } = data;

  return (
    <Document>
      <Page
        size="A4"
        style={{
          padding: 40,
          fontSize: 11,
          fontFamily: "Helvetica",
          color: "#312D2D",
        }}
      >
        {/* Header Section */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 28,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              textAlign: "center",
              width: "200px",
              color: "#969696",
              fontSize: "10px",
              fontWeight: 700,
            }}
          >
            <Text style={{ marginBottom: 4 }}>{clinic.name}</Text>
            <Text style={{ marginBottom: 2 }}>{clinic.address}</Text>
            <Text style={{ marginBottom: 2 }}>{clinic.phone}</Text>
          </View>
        </View>

        {/* Pharmacy Invoice and Patient Details */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            display: "flex",
            alignItems: "flex-start",
            marginBottom: 10,
          }}
        >
          <View style={{ width: "45%" }}>
            <Text
              style={{
                fontSize: 24,
                color: "#316E9D",
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              Pharmacy Invoice
            </Text>
            <View
              style={{
                marginBottom: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Text style={{ color: "#969696", fontSize: 13 }}>
                Invoice No.
              </Text>
              <Text style={{ color: "#969696", fontSize: 13 }}>
                {invoice.invoice_number}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <Text style={{ color: "#969696" }}>Invoice Date:</Text>
              <Text style={{ color: "#316E9D" }}>{invoice.invoice_date}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 16.5,
                marginBottom: 8,
              }}
            >
              <Text style={{ color: "#969696" }}>Issue Date:</Text>
              <Text style={{ color: "#316E9D" }}>{invoice.issue_date}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 26,
              }}
            >
              <Text style={{ color: "#969696" }}>Payment:</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 4,
                }}
              >
                <Text style={{ color: "#316E9D" }}>
                  {invoice.payment_method}
                </Text>
                <Text style={{ color: "#969696" }}>
                  {invoice.payment_reference}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ width: "30%" }}>
            <Text
              style={{
                fontSize: 16,
                color: "#316E9D",
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              {patient.name}
            </Text>
            <Text style={{ marginBottom: 8, color: "#316E9D" }}>
              {patient.date_of_birth}
            </Text>
            <Text style={{ marginBottom: 8, color: "#969696" }}>
              {patient.email}
            </Text>
            <Text style={{ marginBottom: 8, color: "#969696" }}>
              {patient.address}
            </Text>
            <Text style={{ marginBottom: 8, color: "#969696" }}>
              {patient.phone}
            </Text>
          </View>
        </View>

        {/* Table Section */}
        <View
          style={{
            marginTop: 20,
            marginBottom: 80,
            borderRight: 1,
            borderLeft: 1,
            borderColor: "#eee",
          }}
        >
          {/* Table Header */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#30CFD0",
              paddingHorizontal: 12,
              paddingVertical: 16,
              marginBottom: 1,
            }}
          >
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              SR#
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              ITEM DESCRIPTION
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              QTY
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              PRICE
            </Text>
          </View>

          {/* Table Rows */}
          {items.map((item: any, index: number) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                borderBottom: 1,
                borderColor: "#eee",
              }}
            >
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRight: 1,
                  borderColor: "#eee",
                }}
              >
                {item.sr_no}
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRight: 1,
                  borderColor: "#eee",
                }}
              >
                {item.description}
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRight: 1,
                  borderColor: "#eee",
                }}
              >
                {item.quantity}
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                }}
              >
                £{item.price}
              </Text>
            </View>
          ))}
        </View>

        {/* Total Section */}
        <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 8,
            }}
          >
            <Text style={{ fontWeight: "extrabold" }}>Sub Total</Text>
            <Text style={{ fontWeight: "extrabold" }}>£{totals.sub_total}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 8,
            }}
          >
            <Text style={{ fontWeight: "extrabold" }}>
              Tax: Vat ({totals.tax.vat_rate}%)
            </Text>
            <Text style={{ fontWeight: "extrabold" }}>
              £{totals.tax.vat_amount}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 8,
            }}
          >
            <Text style={{ fontWeight: "extrabold" }}>Discount</Text>
            <Text style={{ fontWeight: "extrabold" }}>£{totals.discount}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              color: "#FFFFFF",
              justifyContent: "space-between",
              backgroundColor: "#30CFD0",
              paddingHorizontal: 9,
              paddingVertical: 14,
            }}
          >
            <Text style={{ fontWeight: "extrabold" }}>Grand Total:</Text>
            <Text style={{ fontWeight: "extrabold" }}>
              £{totals.grand_total}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PharmacyPdf;
