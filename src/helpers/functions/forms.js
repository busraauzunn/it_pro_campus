// export const isInvalid = (formik, field) => {
//     return formik.touched[field] && formik.errors[field];
// };

// export const isValid = (formik, field) => {
//     return formik.touched[field] && !formik.errors[field];
// };

// If you want to write the code above in a single function, you can do it like this:

export const checkFormikField = (formik, field) => {
    const isInvalid = formik.touched[field] && formik.errors[field];
    const isValid = formik.touched[field] && !formik.errors[field];
    return { isInvalid, isValid };
};
