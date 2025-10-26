import React from "react";

import Container from "@/components/shared/container";
import { Typography } from "@/components/shared/typography";

const RecentlyJoined = ({ data }: any) => {
  return (
    <Container styling="">
      <Typography size="md" className="font-semibold px-4 py-5 text-gray">
        Recently Joined
      </Typography>
      <div className="relative overflow-auto">
        <div className="overflow-hidden rounded-lg">
          <table className="w-full border-collapse">
            {/* Table Header */}
            <thead className="bg-gradient-blue text-white sticky top-0 z-10">
              <tr>
                <th className="text-left py-3 px-4 rounded-tl-lg">
                  <Typography size="lg" className="font-semibold">
                    Company Name
                  </Typography>
                </th>
                <th className="text-left py-3 rounded-tr-lg">
                  <Typography size="lg" className="font-semibold">
                    Joining Date
                  </Typography>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        {/* Table Body */}
        <div
          className="overflow-y-auto rounded-b-lg custom-scrollbar"
          style={{
            height: "240px",
          }}
        >
          <table className="w-full border-collapse">
            <tbody>
              {data.map(
                ({ _id, companyName, joiningDate }: any, index: any) => (
                  <tr key={_id || index} className="font-semibold">
                    <td className="border-b border-light-gray px-4 py-5 text-left">
                      <Typography size="md" className="font-normal">
                        {companyName || "-"}
                      </Typography>
                    </td>
                    <td className="border-b border-light-gray px-4 py-5 text-left">
                      <Typography size="md" className="font-normal">
                        {joiningDate || "-"}
                      </Typography>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default RecentlyJoined;
