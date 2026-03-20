import {createContext, useContext, useState, useEffect, useCallback} from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const IMAGE_BASE_URL = "http://localhost:8080/img/profile/";
    const DEFAULT_IMAGE = "/img/no_user_profile.jpg";

    // 1. 새로고침 시 로그인 확인


    const refreshUser = useCallback(async () => {
        try {
            // 1. 서버에 내 정보 요청
            const res = await axios.get("/api/user/me", { withCredentials: true });
            const userData = res.data;

            const processedUser = {
                ...userData,
                profileUrl: userData.profileImg
                    ? `${IMAGE_BASE_URL}${userData.profileImg}`
                    : DEFAULT_IMAGE
            };
            // 2. 성공 시 유저 정보 저장
            setUser(processedUser);
            return { success: true, data: processedUser };
        } catch (error) {
            // 3. 에러 발생(로그인 안 됨 등) 시 유저 정보 초기화
            setUser(null);
            if (error.response && error.response.status !== 401) {
                console.error("인증 확인 중 예상치 못한 에러:", error);
            }
        } finally {
            // 4. 성공하든 실패하든 로딩 상태는 해제
            setLoading(false);
        }
    }, []);
    useEffect(() => {

        refreshUser();
    }, [refreshUser]);

    // 2. 로그인 함수
    const login = async (email,
                         password)=>{
        try {
            const res = await axios.post("/api/user/login",{
                email,
                password,
            });

            if(res.status===200){
                setUser(res.data);
                localStorage.setItem("userEmail", res.data.email);
                localStorage.setItem("userRole", JSON.stringify(res.data.role));
                return { success: true, data: res.data };
            }
        }catch (e) {
            return {
                success: false,
                message: e.response?.data?.message || "로그인에 실패했습니다."
            };
        }
    }

    // 3. 로그아웃 함수
    const logout = async ()=>{
        try {
            const res = await axios.post("/api/user/logout");
            if(res.status===200) {
                setUser(null);
                localStorage.removeItem("userEmail");
                localStorage.removeItem("userRole");
                return { success: true };
            }
        }catch (e) {
            console.error("로그아웃 에러:", e);
            return {
                success: false,
                message: e.response?.data?.message || "로그인에 실패했습니다."
            };
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading ,refreshUser}}>
            {children}
        </AuthContext.Provider>
    );
};

// 이걸 만들어두면 다른 파일에서 useAuth() 한 줄로 다 쓸 수 있음!
export const useAuth = () => useContext(AuthContext);