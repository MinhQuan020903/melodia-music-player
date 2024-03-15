import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import axios from 'axios';
import { cookies } from 'next/headers';

const config = {
    baseURL: 'http://localhost:' + process.env.NEXT_PUBLIC_BACKEND_PORT,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

const axiosClient = axios.create(config);

axiosClient.interceptors.response.use(
    async (res: any) => {
        const supabase = createServerComponentClient({
            cookies: cookies,
        });
        const { data, error } = await supabase.auth.getSession();
        if (data.session?.access_token) {
            console.log('🚀interceptors ~ data:', data.session.access_token);
            res.headers.Authorization = `Bearer ${data.session?.access_token}`;
        } else {
            console.log('🚀 ~ error:', error);
        }
        return Promise.resolve(res.data);
    },
    async (err: any) => {
        const originalRequest = err.config;
        console.log(originalRequest);

        if (err && err.response && err.response.status === 401 && !err.config.__isRetryRequest) {
            // const supabase = createServerComponentClient({
            //     cookies: cookies,
            // });
            // const { data, error } = await supabase.auth.getSession();
            // if (data.session?.access_token) {
            //     console.log('🚀 ~ data:', data.session.access_token);
            //     err.headers.Authorization = `Bearer ${data.session?.access_token}`;
            // } else {
            //     console.log('🚀 ~ error:', error);
            // }
            // return Promise.resolve(err);
            // const { setKeySite } = useKey();
            // const refreshToken = getKey(KEY_CONTEXT.REFRESH_TOKEN);
            // const salt = encryptRSA(`${getCurrentTS()}`);
            // const params = JSON.stringify({
            //   ...REFRESH_TOKEN_ACT,
            //   data: [{ refreshToken }],
            // }).replace(/\\n/g, '');
            // return axios
            //   .post(`${import.meta.env.REACT_APP_BASE_URI}${import.meta.env.REACT_APP_GETWAY}`, {
            //     headers: config.headers,
            //   })
            //   .then(async (response: any) => {
            //     const authToken = response.data.result.data.token;
            //     const rfTK = response.data.result.data.refreshToken;
            //     originalRequest.headers = {
            //       ...originalRequest.headers,
            //       authorization: `Bearer ${authToken}`,
            //     };
            //     const key: IKeyAuth = {
            //       authToken,
            //       refreshToken: rfTK,
            //     };
            //     originalRequest.__isRetryRequest = true;
            //     setKeySite(key);
            //     return axiosClient(originalRequest);
            //   })
            //   .catch(() => {
            //     // logoutRequest();
            //   });
            // return store.dispatch(logoutRequest());
        }
        return Promise.reject(((err || {}).response || {}).data);
    },
);

export default axiosClient;
