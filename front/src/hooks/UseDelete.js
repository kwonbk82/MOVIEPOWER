import axios from 'axios';

export const useDelete = () => {
    const requestDelete = async (url, targetName, onSuccess) => {
        if (!window.confirm(`정말로 이 ${targetName}을(를) 삭제하시겠습니까?`)) return;

        try {
            await axios.delete(url);
            alert(`${targetName} 삭제 완료!`);
            // if (onSuccess) onSuccess();
            onSuccess?.();
        } catch (error) {
            console.error(error);
            alert("삭제에 실패했습니다.");
        }
    };

    return { requestDelete };
};