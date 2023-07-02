import React, { useEffect } from 'react';

function ErrorNotification({ message, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="error-notification">
      <p>{message}</p>
    </div>
  );
}

export default ErrorNotification;