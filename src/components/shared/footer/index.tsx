import { FC } from "react";

import { Typography } from "@/components/ui/typography";

interface FooterProps {
  isSimpleLayout?: boolean;
}

const Footer: FC<FooterProps> = () => {
  return (
    <div className="bg-white text-black rounded-lg  mx-4 mb-2 shadow-md p-4 mt-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-20 items-center">
          <Typography size="md" className="text-center sm:text-left">
            © 2024 BlockMed Pro™. All Rights Reserved.
          </Typography>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-14">
            <Typography
              size="md"
              className="hover:underline text-center sm:text-left"
            >
              Terms of Service
            </Typography>
            <Typography
              size="md"
              className="hover:underline text-center sm:text-left"
            >
              Notice of Privacy Practices
            </Typography>
            <Typography
              size="md"
              className="hover:underline text-center sm:text-left"
            >
              Notice of Non-Discrimination and Language Assistance
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
