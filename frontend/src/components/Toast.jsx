import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  const colors = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-primary text-white',
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="fixed top-24 right-4 z-[100] space-y-3 max-w-sm">
        {toasts.map(t => (
          <div key={t.id} className={`${colors[t.type] || colors.info} px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in cursor-pointer`} onClick={() => removeToast(t.id)}>
            <span className="material-symbols-outlined text-lg">
              {t.type === 'success' ? 'check_circle' : t.type === 'error' ? 'error' : 'info'}
            </span>
            <p className="text-sm font-medium flex-1">{t.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
