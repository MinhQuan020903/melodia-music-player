import { create } from 'zustand';
import { ViewType } from '@supabase/auth-ui-shared';

interface AuthModalStore {
    isOpen: boolean;
    mode: ViewType;
    onOpen: (mode?: ViewType) => void; // Làm cho tham số mode trở nên tùy chọn
    onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
    isOpen: false,
    mode: 'sign_in', // Giả sử 'sign_in' là một giá trị hợp lệ của ViewType
    onOpen: (mode = 'sign_in') => set({ isOpen: true, mode }), // Đặt giá trị mặc định cho mode
    onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
