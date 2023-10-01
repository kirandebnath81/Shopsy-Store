const loadRazorpayScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);

    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      reject();
    };
  });
};

export default loadRazorpayScript;
