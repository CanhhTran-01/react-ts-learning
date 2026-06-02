
import { useState } from "react";
import type { UserRole } from "../types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface UserForm {
    username: string,
    email: string,
    password: string,
    role: UserRole
}

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    // state form cho component, khởi tại rỗng ở các trường với role mặc định 
    const [form, setForm] = useState<UserForm>({
        username: "",
        email: "",
        password: "",
        role: "editor"
    });
    const [error, setError] = useState<string | null>(null); // render error UI

    // 1 handler cho toàn bộ input khi thao tác lên form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));  // set lại toàn bộ old value và new value khi gõ vào form
    }

    // handle Submit form
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        // Validate
        if (!form.username || !form.email || !form.password) {
            setError("Vui lòng điền đầy đủ thông tin");
            return;
        }
        if (!form.email.includes("@")) {
            setError("Email không hợp lệ");
            return;
        }
        if (form.password.length < 6) {
            setError("Mật khẩu tối thiểu 6 ký tự");
            return;
        }

        // gọi API
        try {
            await login(form.email, form.password); // ← gọi từ AuthContext
            navigate("/");
        } catch {
            setError("Email hoặc mật khẩu không đúng");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <br></br>
            <input name="username" value={form.username} onChange={handleChange} placeholder="Username" />
            <br></br>
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
            <br></br>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Mật khẩu" />
            <br></br>
            <select value={form.role} onChange={e => setForm(prev => ({ ...prev, role: e.target.value as UserRole }))} >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
            </select>
            <br></br>
            {error && <p>{error}</p>}
            <button type="submit">Đăng nhập</button>
        </form>
    );
}

export default LoginPage;