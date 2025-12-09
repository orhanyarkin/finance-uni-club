'use client';

import { useEffect } from 'react';
import { rollbar } from '@/lib/rollbar';

export default function RollbarProvider() {
  useEffect(() => {
    // This effect ensures Rollbar is active on the client
    // You can also add custom identifying logic here if you have auth
    // e.g. rollbar.configure({ payload: { person: { id: user.id } } })
    
    // Log a simple info message to verify connection in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Rollbar initialized');
      rollbar.info("Rollbar entegrasyon testi - Development ortamı");
    } else {
      // Production ortamında da ilk açılışta bir info gönderelim ki dashboard güncellensin
      // Daha sonra bu satırı kaldırabilirsiniz.
      rollbar.info("Rollbar entegrasyon testi - Production ortamı");
    }
  }, []);

  return null; // This component handles side effects only
}
