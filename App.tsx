
import React, { useState, useEffect } from 'react';
import { AppStep, ContractData } from './types';
import { WelcomeView } from './components/WelcomeView';
import { NoticeView } from './components/NoticeView';
import { ContractReviewView } from './components/ContractReviewView';
import { SignatureView } from './components/SignatureView';
import { SuccessView } from './components/SuccessView';
import { MASTER_CONFIG } from './config';
import { ShieldCheck, Lock, Settings2, X, KeyRound, Crown } from 'lucide-react';

const ADMIN_PASSWORD = "admin123@"; 

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [signature, setSignature] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [contractData, setContractData] = useState<ContractData>(MASTER_CONFIG);

  useEffect(() => {
    // Luôn load từ MASTER_CONFIG nhưng ưu tiên localStorage nếu có
    const saved = localStorage.getItem('concung_contract_data');
    if (saved) setContractData(JSON.parse(saved));
  }, []);

  const handleAdminClick = () => {
    if (isEditMode) setIsEditMode(false);
    else setShowLogin(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsEditMode(true);
      setShowLogin(false);
      setPasswordInput('');
    } else {
      setLoginError(true);
    }
  };

  const currentStepIndex = Object.values(AppStep).indexOf(step) + 1;

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center py-10 px-4">
      {/* Admin Toggle */}
      <button 
        onClick={handleAdminClick}
        className="fixed bottom-8 right-8 z-50 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-white hover:scale-110 transition-all no-print group"
      >
        <Settings2 size={24} className="text-slate-400 group-hover:text-[#e11d48]" />
      </button>

      {/* Modern Header */}
      <div className="w-full max-w-5xl mb-10 flex items-center justify-between no-print px-4">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-[#e11d48] rounded-2xl flex items-center justify-center text-white shadow-[0_10px_25px_rgba(225,29,72,0.3)]">
            <Crown size={28} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              CONCUNG <span className="text-slate-400 font-bold">ME&BE</span>
            </h1>
            <span className="text-[10px] text-[#e11d48] font-black uppercase tracking-[0.3em] mt-1.5">
              Hệ thống xác thực điện tử cao cấp
            </span>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="hidden lg:flex items-center gap-3 bg-white/50 px-5 py-2.5 rounded-full border border-white/50">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              XÁC THỰC VNPT-CA: HOẠT ĐỘNG
            </span>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Tiến độ: {currentStepIndex}/5
              </span>
              <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#e11d48] to-rose-400 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(225,29,72,0.5)]" 
                  style={{ width: `${currentStepIndex * 20}%` }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="w-full max-w-5xl bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] rounded-[3.5rem] overflow-hidden border border-white relative transition-all duration-700">
        {step === AppStep.WELCOME && <WelcomeView onStart={() => setStep(AppStep.NOTICE)} data={contractData} />}
        {step === AppStep.NOTICE && <NoticeView onContinue={() => setStep(AppStep.REVIEW)} data={contractData} />}
        {step === AppStep.REVIEW && <ContractReviewView onContinue={() => setStep(AppStep.SIGN)} data={contractData} signature={signature || contractData.recipientSignatureUrl} />}
        {step === AppStep.SIGN && <SignatureView onSign={(sig) => { setSignature(sig); setStep(AppStep.SUCCESS); }} data={contractData} />}
        {step === AppStep.SUCCESS && <SuccessView data={contractData} signature={signature || contractData.recipientSignatureUrl} />}
      </main>

      {/* Modern Footer */}
      <footer className="mt-12 text-center no-print">
        <div className="flex items-center justify-center gap-10 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 mb-6">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} />
            <span className="text-[10px] font-black tracking-widest uppercase italic">Xác thực bởi Chính phủ</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock size={18} />
            <span className="text-[10px] font-black tracking-widest uppercase italic">Tiêu chuẩn ISO 27001</span>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em]">
          &copy; 2024 CONCUNG ME&BE — NỀN TẢNG GIAO DỊCH AN TOÀN TUYỆT ĐỐI
        </p>
      </footer>

      {/* Simple Login Modal for Admin */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md px-4">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-[#e11d48] rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
              <KeyRound size={32} />
            </div>
            <h3 className="text-xl font-black mb-6 uppercase tracking-tight">Quyền truy cập Giám đốc</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="password" 
                placeholder="Mật khẩu"
                className="w-full p-5 bg-slate-100 rounded-2xl border-none focus:ring-2 focus:ring-rose-500 outline-none text-center font-bold"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              <div className="flex gap-4">
                <button type="button" onClick={() => setShowLogin(false)} className="flex-1 py-4 text-slate-400 font-bold uppercase text-xs tracking-widest">Hủy</button>
                <button type="submit" className="flex-1 py-4 bg-[#e11d48] text-white rounded-2xl font-bold uppercase text-xs tracking-widest shadow-lg active:scale-95 transition-all">Xác nhận</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
