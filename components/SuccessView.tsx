
import React from 'react';
import { ContractData } from '../types';
import { PartyPopper, Verified, Download, Printer } from 'lucide-react';
import { ContractReviewView } from './ContractReviewView';

interface Props {
  data: ContractData;
  signature: string | null;
}

export const SuccessView: React.FC<Props> = ({ data, signature }) => {
  const currentDate = "28/12/2025";
  const currentTime = "20:15:27";

  return (
    <div className="relative">
      {/* Màn hình hiển thị trên Web */}
      <div className="p-10 md:p-16 text-center font-arial bg-white flex flex-col items-center animate-in fade-in duration-700 no-print">
        {/* Celebration Icon */}
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 shadow-inner border border-green-100 animate-bounce">
          <PartyPopper size={48} className="text-green-500" />
        </div>

        {/* Main Title */}
        <h2 className="text-4xl text-[#1e293b] mb-6 font-bold tracking-tight">
          {data.successTitle}
        </h2>

        {/* Description Area */}
        <div className="max-w-2xl mb-12">
          <p className="text-slate-500 text-lg font-medium leading-relaxed px-4">
            {data.successFeeText}
          </p>
        </div>

        {/* Certificate Card */}
        <div className="w-full max-w-2xl bg-slate-50 rounded-[3rem] p-10 mb-12 border border-slate-100 relative shadow-2xl overflow-hidden text-left">
          {/* Floating Digital Authentic Badge */}
          <div className="absolute top-10 right-10 flex flex-col items-center justify-center bg-white border border-green-100 rounded-[1.5rem] w-28 h-28 shadow-xl rotate-12 z-10 animate-pulse">
            <div className="bg-green-500 rounded-full p-1.5 mb-2">
              <Verified className="text-white" size={24} />
            </div>
            <span className="text-[8px] font-black text-green-700 uppercase text-center leading-tight tracking-[0.2em]">
              Digital<br/>Authentic
            </span>
          </div>

          {/* Certificate Header */}
          <h4 className="font-bold text-slate-400 uppercase text-[11px] tracking-[0.4em] mb-10 block">
            Chứng thư xác nhận ký kết điện tử
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1.5">Mã định danh giao dịch</p>
              <p className="font-bold text-slate-800 text-base tracking-tight">{data.successTransactionPrefix}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1.5">Thời điểm xác thực</p>
              <p className="font-bold text-slate-800 text-base tracking-tight">{currentDate} | {currentTime}</p>
            </div>
            
            <div className="md:col-span-2 mt-2">
              <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-4">
                {data.successSignatureLabel}
              </p>
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex justify-center items-center h-48 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
                {signature ? (
                  <img src={signature} alt="User Signature" className="max-h-full object-contain filter drop-shadow-xl" />
                ) : (
                  <span className="text-slate-300 italic text-xs">Không tìm thấy chữ ký</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-2xl no-print">
          <button
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center space-x-3 px-8 py-5 bg-[#0f172a] text-white rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95 font-bold uppercase text-xs tracking-widest"
          >
            <Printer size={18} />
            <span>In Hợp Đồng</span>
          </button>
          <button 
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center space-x-3 px-8 py-5 bg-white text-slate-700 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-md active:scale-95 font-bold uppercase text-xs tracking-widest"
          >
            <Download size={18} />
            <span>Tải PDF gốc</span>
          </button>
        </div>

        {/* Security Footer */}
        <div className="mt-12 flex items-center justify-center space-x-4 opacity-40">
          <div className="h-px w-12 bg-slate-300"></div>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.5em]">Tài liệu bảo mật hệ thống</p>
          <div className="h-px w-12 bg-slate-300"></div>
        </div>
      </div>

      {/* Bản in (Chỉ hiển thị khi In) */}
      <div className="hidden print:block bg-white min-h-screen">
        <ContractReviewView data={data} signature={signature} hideHeader={true} />
        {/* Trang 2: Chứng nhận */}
        <div className="page-break-before p-20 border-t-2 border-slate-100 mt-10">
          <h2 className="text-2xl font-bold uppercase text-center mb-10">Chứng thư xác nhận ký kết điện tử đính kèm</h2>
          <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200">
             <div className="grid grid-cols-2 gap-10">
                <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Mã hợp đồng</p>
                   <p className="font-bold">{data.contractCode}</p>
                </div>
                <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Mã xác thực</p>
                   <p className="font-bold">{data.successTransactionPrefix}</p>
                </div>
                <div className="col-span-2">
                   <p className="text-[10px] font-bold text-slate-400 uppercase mb-4">Mẫu chữ ký điện tử đã ghi nhận</p>
                   <div className="bg-white p-5 border rounded-xl flex justify-center h-40">
                      {signature && <img src={signature} className="max-h-full" alt="Signed" />}
                   </div>
                </div>
             </div>
             <p className="mt-10 text-[10px] text-slate-400 text-center italic">
                Tài liệu này được tạo tự động bởi hệ thống CONCUNG E-OFFICE vào lúc {currentTime} ngày {currentDate}.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
