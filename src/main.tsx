import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// entry của React App
// Luồng thực tế sẽ là:

// index.html
//    ↓
// main.tsx
//    ↓
// App.tsx
//    ↓
// Routes
//    ↓
// Pages
//    ↓
// Components con

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster position="top-right" />  
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

// document.getElementById("root") --> Lấy thẻ: <div id="root"></div> trong index.html
// React sẽ render toàn bộ app vào div này

// createRoot(...).render(...). Đây là API React 18.
// Nhiệm vụ: tạo React Root, render ứng dụng lên màn hình

// <StrictMode>
// Công cụ dev của React. Giúp: cảnh báo code cũ, phát hiện side effects, kiểm tra lỗi lifecycle
// Chỉ hoạt động ở development. Không ảnh hưởng production. 

{/* <BrowserRouter>
Đến từ React Router. Cho phép dùng: 
<Routes> 
<Route>
useNavigate()
Link
Nếu không có BrowserRouter: useNavigate() sẽ lỗi. */}

// Cây component thực tế
// React Root
// │
// └── StrictMode
//     │
//     └── BrowserRouter
//         │
//         └── AuthProvider
//             │
//             ├── App
//             │    └── Routes
//             │         └── Pages
//             │
//             └── Toaster

