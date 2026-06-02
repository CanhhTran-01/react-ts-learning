import type { User } from "../../types";

// props : truyền từ component cha sang component con 
interface UserCardProps {
  user: User,
  onDelete: (id: number) => void,
  showEmail?: boolean,
  isDeleting?: boolean;  // disable nút xóa khi đang thực hiện xóa
}

// renders UI dựa trên những gì trong props
function UserCard({ user, onDelete, showEmail, isDeleting }: UserCardProps) {
  return (
    <div>
      <div>{user.profile.fullName}</div>
      <span>role: {user.role}</span>
      <br></br>
      {showEmail && <span>{user.email}</span>}
      <br></br>
      <button onClick={() => onDelete(user.id)} disabled={isDeleting}>
        {isDeleting ? "Đang xóa..." : "Xóa"}
      </button>
    </div>
  );
}

export default UserCard;