import CreateApi from "./apiService";

const AuthServices = CreateApi.injectEndpoints(
    {
        endpoints:(builder)=>(
            {

                Login:builder.mutation(
                    {
                        invalidatesTags:["auth"],
                        query:({data})=>(
                            {
                                url:'/auth/login',
                                method:"POST",
                                body:data
                            }
                        )
                    }),
                ResetPassword:builder.mutation(
                    {
                        invalidatesTags:["auth"],
                        query:({data})=>(
                            {
                                url:'/auth/reset-password',
                                method:"POST",
                                body:data
                            }
                        )
                    }),
                    ForgotPassword:builder.mutation(
                        {
                            invalidatesTags:["auth"],
                            query:({data,Id})=>(
                                {
                                    url:`/auth/forgot-password/${Id}`,
                                    method:"POST",
                                    body:data
                                }
                            )
                        })

            }
        )
    }
)

export const {useLoginMutation,useResetPasswordMutation,useForgotPasswordMutation}= AuthServices;