import { Document, Page, Text, View } from "@react-pdf/renderer";

const PrescriptionPdf = ({ data }: any) => {
  const {
    clinicDetails: clinic,
    patientDetails: patient,
    prescriptionDetails: prescription,
    medications: tableData,
    tableColumns,
    doctor,
  } = data;

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
        {/* Prescription and Patient Details */}
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
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Prescription
            </Text>
            <Text style={{ color: "#969696", marginBottom: 8, fontSize: 13 }}>
              {prescription.prescriptionNo}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 4,
              }}
            >
              <Text style={{ color: "#969696" }}>Prescription Date:</Text>
              <Text style={{ color: "#316E9D" }}>
                {prescription.prescriptionDate}
              </Text>
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
              {patient.dateOfBirth}
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
            marginBottom: 30,
            borderRight: 1,
            borderLeft: 1,
            borderColor: "#eee",
          }}
        >
          {/* Table Header */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#30CFD0", // Changed from #5BB5CE to match the start color of the gradient
              paddingHorizontal: 12,
              paddingVertical: 16,
              marginBottom: 1,
            }}
          >
            {tableColumns.map((col: any) => (
              <Text
                key={col.id}
                style={{
                  flex: 1,
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  borderColor: "#fff",
                }}
              >
                {col.label}
              </Text>
            ))}
          </View>

          {/* Table Rows */}
          {tableData.map((row: any, index: any) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                borderBottom: 1,
                borderColor: "#eee",
                // padding: 12,
              }}
            >
              {tableColumns.map((col: any) => (
                <Text
                  key={col.id}
                  wrap={true}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    color: "#312D2D",
                    borderRight:
                      col.id === tableColumns[tableColumns.length - 1].id
                        ? 0
                        : 1,
                    borderColor: "#eee",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                  }}
                >
                  {row[col.id] || "-"}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Comments Section */}
        <View style={{ marginTop: 30, marginBottom: 10 }}>
          <Text
            style={{
              fontWeight: "bold",
              marginBottom: 8,
              color: "#316E9D",
              fontSize: 12,
            }}
          >
            Comment:
          </Text>
          <Text style={{ color: "#969696", lineHeight: 1 }}>
            {data.comment}
          </Text>
        </View>

        {/* Footer Section */}
        <View
          style={{
            marginTop: 30,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{ color: "#969696", marginBottom: 6, fontWeight: 700 }}
            >
              Reported by:
            </Text>
            <Text style={{ color: "#316E9D", fontWeight: 700 }}>
              {clinic.name}
            </Text>
          </View>
          <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <View>
              <Text style={{ color: "#969696", marginBottom: 6 }}>
                DR. Registration no.
              </Text>
              <Text style={{ color: "#316E9D" }}>{doctor.registrationNo}</Text>
            </View>
            <View>
              <Text style={{ color: "#969696", marginBottom: 6 }}>
                DR. Email
              </Text>
              <Text style={{ color: "#316E9D" }}>{doctor.email}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PrescriptionPdf;
