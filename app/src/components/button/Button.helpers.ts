import { IButtonStyles } from "./Button.types";

export const buttonStyles: Record<IButtonStyles, string> = {
  primary:
    'bg-blue-500 hover:bg-blue-700 text-white text-center w-fit font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
  secondary:
    'bg-transparent  text-center w-fit  border-20 text-blue-500 hover:bg-blue-100 text-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
  submit:
    'bg-red-500 hover:bg-red-700 text-white font-bold w-fit py-2 px-4 rounded focus:outline-none focus:shadow-outline',
  disabled: 'bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
};