let html5QrCode;
const result = document.getElementById("result");
const qrRegionId = "reader";

document.getElementById("start-button").addEventListener("click", () => {
  html5QrCode = new Html5Qrcode(qrRegionId);
  html5QrCode.start(
    { facingMode: "environment" },
    {
      fps: 10,
      qrbox: 250
    },
    (decodedText) => {
      result.innerHTML = `Scanned: <a href="${decodedText}" target="_blank">${decodedText}</a>`;
      html5QrCode.stop().then(() => {
        console.log("Camera stopped after scan.");
      });
    },
    (error) => {
      console.warn(`QR scan error: ${error}`);
    }
  );
});

document.getElementById("stop-button").addEventListener("click", () => {
  if (html5QrCode) {
    html5QrCode.stop().then(() => {
      result.innerText = "Scan stopped.";
    });
  }
});

document.getElementById("qr-input-file").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const imageScanner = new Html5Qrcode(qrRegionId);

  imageScanner.scanFile(file, true)
    .then(decodedText => {
      result.innerHTML = `Scanned from image: <a href="${decodedText}" target="_blank">${decodedText}</a>`;
    })
    .catch(err => {
      result.innerText = `Error scanning file: ${err}`;
    });
});
