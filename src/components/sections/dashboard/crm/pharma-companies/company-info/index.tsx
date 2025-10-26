import React from "react";

import Container from "@/components/shared/container";
import { Typography } from "@/components/shared/typography";

const CompanyInfoTab = () => {
  const companyInfo = [
    {
      title: "Contact Information",
      data: [
        { label: "Email Address", value: "samyJhones@emaiol.com" },
        { label: "Phone No", value: "+44 1632 960887" },
      ],
    },
    {
      title: "Address",
      data: [
        { label: "Region", value: "United Kingdom" },
        {
          label: "Address",
          value: "1 My Street My village BOURNEMOUTH BH1 1AA",
        },
      ],
    },
  ];
  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full pb-16">
      {/* Company Details */}
      <div className="w-full lg:w-[50%]">
        <Container isSideBorder styling="px-6 md:px-10 py-10 w-full">
          <div className="flex flex-col gap-[22px]">
            <div>
              <Typography size="h4" className="font-bold text-blue">
                Company Details
              </Typography>
            </div>
            <div className="flex flex-col gap-3.5">
              {[
                { label: "Admin Name", value: "Samy Jhones" },
                { label: "Company Name", value: "Samy Jhones" },
                { label: "Registration No", value: "Samy Jhones" },
                { label: "VAT Registration No", value: "Samy Jhones" },
                { label: "Total Users Count", value: "Samy Jhones" },
                { label: "License Renewal Number", value: "Samy Jhones" },
              ].map((item, index, arr) => (
                <div key={index} className="flex flex-col gap-3.5">
                  <div className="flex flex-col gap-0.6">
                    <div>
                      <Typography size="md" className="font-normal text-gray">
                        {item.label}
                      </Typography>
                    </div>
                    <div>
                      <Typography size="md" className="font-semibold text-blue">
                        {item.value}
                      </Typography>
                    </div>
                  </div>
                  {index < arr.length - 1 && <hr className="text-light-gray" />}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
      {/* Right Side */}
      <div className="flex flex-col gap-4 w-full lg:w-[50%]">
        {companyInfo.map((item, index) => (
          <Container
            key={index}
            isSideBorder
            styling="px-6 md:px-10 py-10 w-full"
          >
            <div className="flex flex-col gap-[22px]">
              <div>
                <Typography size="h4" className="font-bold text-blue">
                  {item.title}
                </Typography>
              </div>
              <div className="flex flex-col gap-3.5">
                {item.data.map((item, index, arr) => (
                  <div key={index} className="flex flex-col gap-3.5">
                    <div className="flex flex-col gap-0.6">
                      <div>
                        <Typography size="md" className="font-normal text-gray">
                          {item.label}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          size="md"
                          className="font-semibold text-blue"
                        >
                          {item.value}
                        </Typography>
                      </div>
                    </div>
                    {index < arr.length - 1 && (
                      <hr className="text-light-gray" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        ))}
      </div>
    </div>
  );
};

export default CompanyInfoTab;
