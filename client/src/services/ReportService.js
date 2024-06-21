import CreateApi from "./apiService";

const ReportService = CreateApi.injectEndpoints(
    {
        endpoints: (builder) => (
            {
                GetReportById: builder.query(
                    {
                        providesTags: ['report'],
                        query: ({ Id, data }) => (
                            {
                                url:`/npos/records/${Id}`,
                                method:"POST",
                                body:data
                            }
                        )
                    }
                )
            }
        )
    }
);

// const {useGetReportByIdQuery}= ReportService;
export const {useGetReportByIdQuery}=ReportService