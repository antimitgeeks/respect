import CreateApi from "./apiService";

const NpoService = CreateApi.injectEndpoints(
    {
        endpoints: (builder) => (
            {
                CreateNpo: builder.mutation(
                    {
                        invalidatesTags: ["npo"],
                        query: ({ data }) => (
                            {
                                url: '/admin/npo/create',
                                method: "POST",
                                body: data
                            }
                        )
                    }),
                AllNpoList: builder.query(
                    {
                        providesTags: ["npo"],
                        query: (data) => (
                            {
                                url: '/admin/npo/list',
                                method: "POST",
                                body: data
                            }
                        )
                    }),
                GetSingleNpo: builder.query(
                    {
                        providesTags: ["npo","singleNpo"],
                        query: ({ Id }) => (
                            {
                                url: `/admin/npo/${Id}`,
                                method: "POST",
                            }
                        )
                    }),
                UpdateNpo: builder.mutation(
                    {
                        invalidatesTags: ["npo","singleNpo"],
                        query: ({ Id, data }) => (
                            {
                                url: `/admin/npo/${Id}`,
                                method: "PUT",
                                body: data
                            }
                        )
                    }),

                    // UpdateNpoStatus: builder.mutation(
                    //     {
                    //         query: ({ Id, data }) => (
                    //             {
                    //                 url: `/admin/npo/${Id}`,
                    //                 method: "PUT",
                    //                 body: data
                    //             }
                    //         )
                    //     }),

                DeleteNpo: builder.mutation(
                    {
                        invalidatesTags:["npo"],
                        query:({Id})=>(
                            {
                                url:`/admin/npo/${Id}`,
                                method:"DELETE"
                            }
                        )
                    }
                ),

                GetNpoReport:builder.query(
                    {
                        providesTags:['report'],
                        query:({Id})=>(
                            {
                                url:`admin/reports/${Id}`,
                                method:"POST"
                            }
                        )
                    }
                )
            }
        )
    }
);
export const { useCreateNpoMutation,useGetNpoReportQuery, useAllNpoListQuery, useGetSingleNpoQuery, useUpdateNpoMutation ,useDeleteNpoMutation} = NpoService;