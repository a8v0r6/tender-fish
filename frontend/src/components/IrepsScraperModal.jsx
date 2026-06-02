import React, { useState } from 'react';

const IrepsScraperModal = ({ isOpen, onClose, onTendersFetched }) => {
  const [step, setStep] = useState('PHONE_INPUT'); // PHONE_INPUT | TRIGGERING_OTP | OTP_INPUT | FETCHING_TENDERS | ERROR
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('555498');
  const [errorMsg, setErrorMsg] = useState('');
  const [streamingUrl, setStreamingUrl] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    // Reset state and close
    setStep('PHONE_INPUT');
    setPhone('');
    setOtp('');
    setErrorMsg('');
    setStreamingUrl('');
    onClose();
  };



  const handleSubmitOtp = async () => {
    if (!otp) {
      setErrorMsg('Please enter the OTP.');
      return;
    }
    
    setStep('FETCHING_TENDERS');
    setErrorMsg('');
    
    try {
      const response = await fetch('http://localhost:8000/api/ireps/submit-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });
      
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.detail || data.error || 'Failed to fetch tenders');
      }
      
      onTendersFetched(data.tenders);
      handleClose();
    } catch (err) {
      setErrorMsg(err.message);
      setStep('OTP_INPUT');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in border border-primary/20">
        <div className="bg-primary p-6 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
            <span className="material-symbols-outlined text-4xl">travel_explore</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">IREPS Integration</h2>
          <p className="text-sm text-white/80 mt-1">Live tender extraction via Agent</p>
        </div>

        <div className="p-8">
          {errorMsg && (
            <div className="mb-4 p-3 bg-error/10 border border-error/50 rounded-xl text-error text-sm font-medium text-center">
              {errorMsg}
            </div>
          )}

          {step === 'PHONE_INPUT' && (
            <div className="space-y-6 animate-slide-up">
              <div>
                <label className="block text-sm font-bold text-on-surface mb-2">Registered Mobile Number</label>
                <input
                  type="text"
                  placeholder="10-digit number"
                  className="w-full bg-surface-container rounded-xl p-4 text-on-surface font-medium border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface mb-2">Enter OTP</label>
                <input
                  type="text"
                  placeholder="6-digit PIN"
                  className="w-full bg-surface-container rounded-xl p-4 text-on-surface font-black text-center tracking-[0.5em] border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
              </div>

              <div className="flex gap-4 mt-8">
                <button onClick={handleClose} className="flex-1 py-4 text-on-surface-variant font-bold hover:bg-surface-container rounded-xl transition-colors">Cancel</button>
                <button onClick={handleSubmitOtp} className="flex-1 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:brightness-110 transition-all uppercase tracking-wider text-xs">Login & Scrape</button>
              </div>
            </div>
          )}



          {step === 'FETCHING_TENDERS' && (
            <div className="py-8 text-center animate-pulse">
              <span className="material-symbols-outlined text-5xl text-primary animate-spin mb-4">target</span>
              <h3 className="text-xl font-bold text-on-surface">Extracting Tenders...</h3>
              <p className="text-on-surface-variant mt-2 text-sm max-w-[250px] mx-auto">Agent is verifying OTP and scraping live tender data.</p>
              {streamingUrl && (
                <a href={streamingUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 px-4 py-2 bg-surface-container rounded-lg text-xs font-bold text-primary hover:bg-primary/10 transition-colors">
                  Watch Live Agent 👁
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IrepsScraperModal;
