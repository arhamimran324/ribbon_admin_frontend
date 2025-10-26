export const getClassNames = (
  width: string,
  bgColor: string,
  textColor: string,
  error: boolean,
  paddingLeft: string,
) => ({
  input: () => `${textColor} !py-[17px]  h-[3.8rem]`,
  menu: () => "!rounded-[12px] overflow-hidden ",
  container: () => `font-inter ${width} ${error ? "errored" : ""}`,
  control: () =>
    `!border-0 ${bgColor}  ${paddingLeft} text-secondary-text-gray !rounded-[12px] !shadow-none`,
  dropdownIndicator: () =>
    `!text-secandary-text-gray ${paddingLeft && "!w-5"} !pl-0`,
  indicatorSeparator: () => "!hidden",
  clearIndicator: () => "!hidden",
  groupHeading: () => "!text-gray !font-semibold !text-lg !capitalize",
  multiValue: () =>
    "!bg-light-green text-black !rounded-xl p-2 overflow-hidden",
  option: () =>
    "flex items-center !px-[22px] !py-4 !bg-white !truncate hover:!bg-light-green !text-black !text-lg !cursor-pointer  !border-b !border-light-gray last-of-type:border-b-0",
  placeholder: () => "!text-secondary-text-gray !text-lg",
  menuList: () => "!py-0",
  multiValueRemove: () => "!px-0.5 !p-[1px] !ml-1",
  multiValueLabel: () => "!text-md",
});
