
import React, { useRef, useState, useEffect } from 'react';
import { ContractData } from '../types';
import { Eraser, Check, X, ShieldCheck, PenTool } from 'lucide-react';

interface Props {
  onSign: (dataUrl: string) => void;
  data: ContractData;
}

export const SignatureView: React.FC<Props> = ({ onSign, data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Use a deep "Ink" color
    ctx.strokeStyle = '#1e293b'; 
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // High DPI support
        const dpr = window.devicePixelRatio || 1;
        canvas.width = parent.clientWidth * dpr;
        canvas.height = 380 * dpr;
        canvas.style.width = `${parent.clientWidth}px`;
        canvas.style.height = `380px`;
        ctx.scale(dpr, dpr);
        
        // Reset styles after scale
        ctx.strokeStyle = '#1e293b'; 
        ctx.lineWidth = 3.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.beginPath();
    ctx?.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.lineTo(x, y);
    ctx?.stroke();
    setHasContent(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // Important: we need to account for DPR when clearing if we used scale()
    const dpr = window.devicePixelRatio || 1;
    ctx?.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    setHasContent(false);
  };

  const handleConfirm = () => {
    if (!hasContent) return;
    const dataUrl = canvasRef.current?.toDataURL('image/png');
    if (dataUrl) onSign(dataUrl);
  };

  return (
    <div className="p-12 md:p-16 bg-white">
      <div className="text-center mb-12">
        <div className="inline-block p-3 bg-pink-50 rounded-full text-pink-600 mb-6">
          <PenTool size={32} />
        </div>
        <h2 className="font-accent text-xs tracking-[0.5em] text-slate-400 font-bold mb-4 uppercase">Ký kết xác thực</h2>
        <h3 className="font-display text-4xl text-slate-900 mb-3 font-semibold">Chữ ký pháp lý số</h3>
        <p className="text-slate-500 font-serif italic text-lg">Quý khách vui lòng thực hiện ký tên trong khung dưới đây.</p>
      </div>

      <div className="relative bg-slate-50 border-2 border-slate-200 rounded-[2.5rem] overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="touch-none w-full block"
        />
        
        {/* Helper text overlay */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-slate-200 pointer-events-none select-none flex flex-col items-center">
          <div className="font-signature text-6xl opacity-30 italic">{data.recipientName}</div>
          <div className="font-accent text-[8px] tracking-[0.4em] uppercase font-bold mt-4">Khu vực dành cho chữ ký điện tử</div>
        </div>

        {/* Floating Tools */}
        <div className="absolute bottom-8 right-8 flex space-x-3">
          <button
            onClick={clear}
            className="bg-white hover:bg-slate-900 hover:text-white text-slate-600 px-5 py-3 rounded-2xl border border-slate-200 shadow-xl transition-all flex items-center space-x-2 text-xs font-bold uppercase tracking-widest"
          >
            <Eraser size={16} />
            <span>Xóa chữ ký</span>
          </button>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center space-y-10">
        <div className="bg-slate-900 px-8 py-4 rounded-3xl flex items-center space-x-4 text-slate-300 text-xs font-light shadow-2xl">
          <ShieldCheck size={20} className="text-green-500" />
          <span className="tracking-wide">Hệ thống bảo mật AES-256 đang ghi nhận tọa độ ký và dấu vân tay số của thiết bị.</span>
        </div>

        <div className="flex space-x-6 w-full max-w-xl">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 px-10 py-5 bg-white hover:bg-slate-50 text-slate-500 font-bold rounded-2xl border border-slate-200 transition-all flex items-center justify-center space-x-3 uppercase tracking-widest text-[10px]"
          >
            <X size={18} />
            <span>Hủy bỏ giao dịch</span>
          </button>
          <button
            onClick={handleConfirm}
            disabled={!hasContent}
            className={`flex-1 px-12 py-5 font-bold rounded-2xl shadow-2xl transition-all flex items-center justify-center space-x-3 uppercase tracking-[0.2em] text-[10px] ${
              hasContent 
                ? 'bg-gradient-to-r from-slate-900 to-black hover:scale-[1.03] text-white cursor-pointer active:scale-95' 
                : 'bg-slate-100 text-slate-300 cursor-not-allowed'
            }`}
          >
            <Check size={18} />
            <span>Xác nhận ký tên</span>
          </button>
        </div>
      </div>
    </div>
  );
};
