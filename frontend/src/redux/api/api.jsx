import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
/*
credentials:
The credentials option specifies how cookies, CORS, and HTTP authentication should be handled when making cross-origin requests. It accepts a string value which can be one of the following:

"omit": This is the default value. It indicates that cookies, credentials, and HTTP authentication will not be included in the request.
"same-origin": This indicates that cookies, credentials, and HTTP authentication should only be included if the request is being made to the same origin as the calling code.
"include": This indicates that cookies, credentials, and HTTP authentication should always be included in the request, even for cross-origin requests.
In your code, credentials: 'include' is used, which means that cookies, credentials, and HTTP authentication will be included in the request, even for cross-origin requests.
*/

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  credentials: "include", // include cookies, credentials, and HTTP authentication in the request, even for cross-origin requests to the API (https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials)
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = getState().auth;
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
	const result = await baseQuery(args, api, extraOptions);
	if (result?.error?.status === 403) {
		// If the result is an error, and it has a 403 status code, it means that the access token has expired. In this case, we can try to get a new access token using the refresh token.
		const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
		if (refreshResult?.data) {
			// If we get a new access token, we can retry the original request, this time with the new access token.
			const retryResult = await baseQuery(args, api, extraOptions)
			return retryResult;
		} else {
			// If we fail to get a new access token, we can log the user out, and redirect them to the login page.
			if (refreshResult?.error?.status === 403) {
				api.dispatch(logout());
				refreshResult.error.message = 'Your login has expired.';
			}
			return refreshResult;
		}
	}
	return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product"],
  endpoints: () => ({}),
});
