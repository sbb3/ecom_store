import { api } from "../api";

const productApiEndPoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page = 1, category = "" }) => ({
        url: `/product/shop`,
        method: "GET",
        params: { page, category },
      }),
      providesTags: ["Product"],
    }),
    getLatestProducts: builder.query({
      query: ({ limit }) => ({
        url: "/product/latest",
        method: "GET",
        params: { limit },
      }),
      providesTags: ["Product"],
    }),
    getSearchedProducts: builder.query({
      query: ({ query, type }) => ({
        // url: `/product/search?query=${query}&type=${type}`,
        url: `/product/search`,
        method: "GET",
        params: { query, type },
      }),
      providesTags: ["Product"],
    }),
    getSingleProduct: builder.query({
      query: ({ slug }) => ({
        url: `/product/single/${slug}`,
        method: "GET",
      }),
    }),
    createProduct: builder.mutation({
      query: ({formData}) => ({
        url: `/product/create`,
		method: "POST",
		body: formData,
      }),
	//   invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetLatestProductsQuery,
  useGetSearchedProductsQuery,
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
} = productApiEndPoints;
