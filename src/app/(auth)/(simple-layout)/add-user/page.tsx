"use client";

import React from "react";

import Container from "@/components/shared/container";

const AddUser = () => {
  // const formik = useFormik({
  //   initialValues: addUserInitialValues,
  //   // validationSchema: addUserSchema,
  //   onSubmit: (values) => {
  //     console.log('values', values);
  //   },
  // });

  return (
    <Container>
      {/* <div className="flex flex-col">
        <div className="py-10 text-center flex justify-between items-end">
          <div className="w-[90%]">
            <Typography size="h3" as="h3" className="text-primary-text">
              To Add Users Enter Their Email
            </Typography>
          </div>
          <div className="w-[10%]">
            <Typography size="md" as="p" className="text-secondary-text-gray">
              {formik.values.users.length}/4
            </Typography>
          </div>
        </div>
        <FormikProvider value={formik}>
          <FieldArray name="users">
            {({ push, remove }) => (
              <>
                <div
                  onClick={() => formik.values.users.length < 4 && push({ email: '', role: '' })}
                  className={`flex justify-end ${formik.values.users.length === 4 ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <Image src="/assets/svg/add-user-icon.svg" alt="add user icon missing" width={24} height={24} />
                </div>

                {formik.values.users.map((user, index) => (
                  <div key={index} className="pb-5 flex user-col flex-row justify-between gap-5 relative">
                    <div className="w-full sm:w-[60%]">
                      <InputTextField
                        label={`${addUserFrom.formFields.adduser.label} ${index + 1}`}
                        placeholder={addUserFrom.formFields.adduser.placeholder}
                        name={`users.${index}.email`}
                        type="email"
                        value={formik.values.users[index].email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.users?.[index]?.email &&
                          typeof formik.errors.users?.[index] === 'object' &&
                          'email' in formik.errors.users[index]
                            ? (formik.errors.users[index] as { email?: string }).email
                            : ''
                        }
                      />
                    </div>
                    <div className="w-full sm:w-[40%]">
                      <InputDropdown
                        label={addUserFrom.formFields.role.label}
                        placeholder={addUserFrom.formFields.role.placeholder}
                        name={`users.${index}.role`}
                        options={options}
                        value={formik.values.users[index].role}
                        textColor="text-primary-text !m-0 h-[3.8rem]"
                        className="border border-light-gray rounded-xl"
                        onSelect={(selected) => formik.setFieldValue(`users.${index}.role`, selected)}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.users?.[index]?.role &&
                          typeof formik.errors.users?.[index] === 'object' &&
                          'role' in formik.errors.users[index]
                            ? (formik.errors.users[index] as { role?: string }).role
                            : ''
                        }
                      />
                    </div>

                    {index > 0 && (
                      <div
                        className="cursor-pointer flex justify-center items-center absolute right-0 top-0"
                        onClick={() => remove(index)}
                      >
                        <Image
                          src="/assets/svg/remove-user-icon.svg"
                          alt="remove user icon missing"
                          width={24}
                          height={24}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </FieldArray>

          <div className="flex justify-between items-center w-full">
            <div className="text-primary-light underline">
              <Typography size="md" as="p" className="text-primary-light">
                Skip For Now
              </Typography>
            </div>
            <div className="flex justify-center w-[40%] items-center">
              <Button
                variant="primary"
                size="medium"
                className="w-full"
                type="button"
                disabled={!(formik.isValid && formik.dirty)}
                onClick={formik.submitForm}
              >
                Done
              </Button>
            </div>
          </div>
        </FormikProvider>
      </div> */}
    </Container>
  );
};

export default AddUser;
