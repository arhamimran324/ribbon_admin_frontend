"use client";
import Image from "next/image";

import { Button } from "@/components/shared/button";
import Container from "@/components/shared/container";
import { Typography } from "@/components/shared/typography";
import { useRouter } from "next/navigation";

const PaymentSuccess = () => {
  const router = useRouter();
  return (
    <Container>
      <div className="py-10 flex justify-center">
        <Image
          src="/assets/svg/payment-success.svg"
          width={120}
          height={120}
          alt={"Missing Success Payment icon"}
        />
      </div>
      <div className=" text-center">
        <Typography size="h3" as="h3" className={`text-primary-text`}>
          Payment Successful
        </Typography>
        <Typography size="lg" as="p" className="text-secondary-text-gray">
          Payment for the platform fee was successful. You now have
          uninterrupted access to our services. Thank you!
        </Typography>
      </div>
      <div className="flex justify-center items-center pt-8">
        <Button
          variant="primary"
          size="medium"
          onClick={() => router.push("/dashboard")}
          className="w-full"
          // disabled={!(isValid && dirty && captchaValue && captchaExpired === 'false')}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default PaymentSuccess;
