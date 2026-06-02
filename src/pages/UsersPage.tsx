import { useEffect, useState } from "react";
import type { User } from "../types";
import UserCard from "../components/common/UserCard";
import { useAuth } from "../contexts/AuthContext";
import { UserService } from "../services/UserService";
import ErrorMessage from "../components/common/ErrorMessage";
import Loading from "../components/common/Loading";
import toast from "react-hot-toast";

function UserList() {
    const { user: currentUser } = useAuth();   // userAuth() nhả về AuthContextType object
    const [users, setUsers] = useState<User[]>([]);    // hiện user list
    const [isVisible, setVisible] = useState(false);   // toggle email
    const [isLoading, setLoading] = useState(true);    // hiện loading 
    const [error, setError] = useState<string | null>(null);   // thông báo lỗi
    const [deletingId, setDeletingId] = useState<number | null>(null);  // xóa 

    // gọi API fetch data từ BE
    useEffect(() => {
        UserService.getAll()
            .then(data => { setUsers(data); setLoading(false); })
            .catch(() => { setError("Không tải được dữ liệu"); setLoading(false); });
    }, []);

    // delete: gọi API xóa user có id truyền vào
    const handleDelete = (id: number) => {

        if (!window.confirm("Bạn chắc chắn muốn xóa?")) return;
        setDeletingId(id); // đánh dấu đang xóa cái nào

        UserService.deleteUser(id)
            .then(() => {
                setUsers(users.filter(u => u.id !== id));
                toast.success("Xóa thành công!");
            })
            .catch(() => toast.error("Xóa thất bại!"))
            .finally(() => setDeletingId(null)); // reset dù thành công hay thất bại
    };

    // Render UI
    if (isLoading) return (<Loading />)
    if (error) return (<ErrorMessage message={error} />);
    if (users.length === 0) return <p>Không có user nào</p>;
    return (
        <div>
            {currentUser && <p>Xin chào, {currentUser.profile.fullName}</p>}
            <button onClick={() => setVisible(!isVisible)}>Toggle Email</button>
            {users.map((user) => (
                <UserCard
                    key={user.id}
                    user={user}
                    onDelete={handleDelete}
                    showEmail={isVisible}
                    isDeleting={deletingId === user.id}
                />
            ))}
        </div>
    );
}

export default UserList;