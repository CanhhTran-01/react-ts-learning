
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1>404 - Không tìm thấy trang</h1>
      <p>Trang bạn tìm không tồn tại.</p>
      <Link to="/">Về trang chủ</Link>
    </div>
  );
}

export default NotFoundPage;