import { Typography } from "@/components/ui/typography";
import { TypeAnimation } from "react-type-animation";

const WelcomeCard = () => {
  return (
    <div
      className="relative rounded-xl p-6 md:p-12 shadow-md text-white h-full bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/previews/002/902/090/non_2x/hand-holding-credit-card-and-using-laptop-for-online-shopping-free-photo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Text Section */}
        <div className="w-full xs:w-[80%] md:w-[70%]">
          <div className="flex flex-col gap-4 pt-12 md:pt-0">
            <Typography size="h3" as="h3" className="font-bold leading-tight">
              Welcome to the{" "}
              <span className="text-primary-text">Ribbon & Bow</span>{" "}
              <span className="text-white">
                <TypeAnimation
                  sequence={[
                    "Admin Dashboard.",
                    2000,
                    "Store Manager.",
                    2000,
                    "Control Panel.",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  className="inline-block"
                  repeat={Infinity}
                />
              </span>
            </Typography>

            <Typography size="lg" as="p">
              Manage your store with ease — track orders, update products,
              manage inventory, and stay on top of customer engagement.
              Everything you need to keep Ribbon & Bow running smoothly is right
              here.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
