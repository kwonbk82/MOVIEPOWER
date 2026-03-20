const API_BASE_URL = "http://localhost:8080";

export const IMAGE_CONFIG = {
    // 프로필 관련 경로
    PROFILE: {
        BASE_URL: `${API_BASE_URL}/img/profile/`,
        DEFAULT: "/img/no_user_profile.jpg",
    },
    // 이벤트 관련 경로 (나중에 추가될 부분)
    EVENT: {
        BASE_URL: `${API_BASE_URL}/img/event/`
    }
};