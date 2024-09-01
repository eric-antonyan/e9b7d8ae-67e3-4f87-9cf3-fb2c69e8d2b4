import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import cyberGray from "../assets/cyber-gray.jpg"
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CustomInput = (props: any) => {
    return (
        <Input size="lg" {...props} />
    )
}

const Login = () => {
    const [responseData, setResponseData] = useState(null);
    const [responseError, setResponseError] = useState(null);

    const SigninSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(70, 'Too Long!')
            .required('Required'),
        password: Yup.string()
            .min(6, 'Too Short')
            .max(14, 'Too Long')
            .required('Required'),
    });

    const navigate = useNavigate()

    return (
        <div className="h-screen dark text-foreground bg-background">
            <Formik
                validationSchema={SigninSchema}
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values, actions) => {
                    try {
                        const response = await axios.post(`https://a1b2c3d4-e5f6-7890-abcd-ef1234567890-4ydnvw9hm.vercel.app/login`, values, {
                            headers: {
                                'Authorization': `Basic ${btoa("admin:password")}`
                            },
                        });
                        Cookies.set("access_token", response.data.access_token, {
                            expires: 1 / 24
                        })
                        navigate("/account")
                        setResponseError(null);
                    } catch (error: any) {
                        setResponseError(error.response ? error.response.data : "An error occurred");
                        setResponseData(null);
                    }
                    actions.setSubmitting(false);
                }}
            >
                {({ errors, touched, isValid, isSubmitting }) => (
                    <Form className="max-w-[500px] px-4 mx-auto flex flex-col gap-4 pt-4">
                        <div className="flex justify-center items-center gap-4">
                            <p className="text-3xl font-bold">Gray</p>
                            <div className="bg-orange-500 py-1 px-3 text-3xl rounded-xl font-bold text-white">Hub</div>
                        </div>
                        <h1 className="text-3xl font-bold text-center">Login To System</h1>

                        <div className="flex flex-col">
                            <Field
                                variant="underlined"
                                name="username"
                                as={CustomInput}
                                type="text"
                                placeholder="Enter your username"
                                isInvalid={errors.username && touched.username}
                                errorMessage={errors.username}
                            />
                        </div>

                        <div className="flex flex-col">
                            <Field
                                variant="underlined"
                                name="password"
                                as={CustomInput}
                                size="lg"
                                type="password"
                                placeholder="Enter your password"
                            />
                            {errors.password && touched.password && (
                                <div className="text-red-500 text-sm">{errors.password}</div>
                            )}
                        </div>
                        {responseError as any && (
                            <div className="text-red-500 text-sm mt-4">
                                Error: {(responseError as any).message}
                            </div>
                        )}

                        <Button
                            isDisabled={!isValid || isSubmitting}
                            type="submit"
                            size="lg"
                            className="font-bold"
                            color="primary"
                        >
                            Log in
                        </Button>
                        <Link className="text-center text-primary font-bold" to={"/account"}>Go to account</Link>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
