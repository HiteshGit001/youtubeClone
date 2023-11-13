import * as Yup from "yup";
import { emailRegex, nameRegex } from "../uiData/constantValues";

export const validateEmail = (requiredMsg: string, invalidMsg: string) => {
  return Yup.string()
    .required(requiredMsg)
    .matches(emailRegex, invalidMsg)
  // .test("", duplicateFirstNameLastName, (value: any, context: any): boolean => {
  //   const formikData = context.parent;
  //   return value.toLowerCase().trim() !== formikData.firstName.toLowerCase().trim();
  // });
}

export const validateFirstName = (
  requiredMsg: any,
  invalidMsg: any,
)
  : any => {
  return Yup.string()
    .required(requiredMsg)
    .matches(nameRegex, invalidMsg)
};

export const validateRequired = (
  requiredMst: any,
): any => {
  return Yup.string()
    .required(requiredMst)
}