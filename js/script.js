function kategoriBb(bmi) {
  if (bmi < 18.5) {
    return {
      kategori: "Kekurangan berat badan",
      pesan: ["Hasil BMI kurang dari 18.5.", "Anda berada dalam kategori kekurangan berat badan.", "Cara terbaik untuk menaikkan berat badan adalah dengan meningkatkan asupan kalori dan melakukan latihan kekuatan."],
    };
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return {
      kategori: "Normal (ideal)",
      pesan: ["Hasil BMI berada dalam rentang normal (18.5 - 24.9).", "Anda berada dalam kategori berat badan ideal.", "Terus pertahankan pola makan sehat dan rutin berolahraga."],
    };
  } else if (bmi >= 25 && bmi < 29.9) {
    return {
      kategori: "Kelebihan berat badan",
      pesan: [
        "Hasil BMI berada di antara 25 dan 29.9.",
        "Anda berada dalam kategori overweight atau kelebihan berat badan.",
        "Cara terbaik untuk menurunkan berat badan adalah dengan mengatur kalori makanan yang dikonsumsi dan berolahraga.",
        "Jika BMI Anda berada dalam kategori ini maka Anda diajurkan untuk menurunkan berat badan hingga batas normal",
      ],
    };
  } else {
    return {
      kategori: "Kegemukan (obesitas)",
      pesan: ["Hasil BMI lebih dari 30.", "Anda berada dalam kategori obesitas.", "Sangat disarankan untuk berkonsultasi dengan profesional medis untuk mengembangkan rencana penurunan berat badan yang aman dan efektif."],
    };
  }
}

function validasiInput() {
  const berat = parseFloat(document.getElementById("berat").value);
  const tinggi = parseFloat(document.getElementById("tinggi").value);
  const usia = parseInt(document.getElementById("usia").value);
  const jenisKelamin = document.querySelector('input[name="jk"]:checked');
  let isValid = true;

  // Reset error messages
  document.querySelectorAll(".error-message").forEach((elem) => (elem.innerText = ""));

  if (!jenisKelamin) {
    document.getElementById("validasi-jk").innerText = "Jenis kelamin harus dipilih.";
    isValid = false;
  }

  if (isNaN(berat) || berat <= 0) {
    document.getElementById("validasi-berat").innerText = "Berat badan harus lebih dari 0.";
    isValid = false;
  }

  if (isNaN(tinggi) || tinggi <= 0) {
    document.getElementById("validasi-tinggi").innerText = "Tinggi badan harus lebih dari 0.";
    isValid = false;
  }

  if (isNaN(usia) || usia <= 0) {
    document.getElementById("validasi-usia").innerText = "Usia harus lebih dari 0.";
    isValid = false;
  }

  return isValid;
}

function hitungBMI() {
  if (!validasiInput()) {
    document.getElementById("nilaibmi").innerText = "";
    document.getElementById("info").innerText = "";
    return;
  }

  const berat = parseFloat(document.getElementById("berat").value);
  const tinggi = parseFloat(document.getElementById("tinggi").value);
  const usia = parseInt(document.getElementById("usia").value);
  const jenisKelamin = document.querySelector('input[name="jk"]:checked');

  const tinggiM = tinggi / 100;
  const bmi = berat / (tinggiM * tinggiM);
  const { kategori, pesan } = kategoriBb(bmi);
  const jenisKelaminText = jenisKelamin.value.charAt(0).toUpperCase() + jenisKelamin.value.slice(1);

  // Format hasil nilai BMI
  const bmiFormat = bmi.toFixed(2);

  document.getElementById("nilaibmi").innerText = `${bmiFormat}`;
  document.getElementById("hasil").innerText = `Anda memiliki berat badan ${kategori}.`;
  document.getElementById("info").innerText = `
    ${pesan[0]}
    ${pesan[1]}
    ${pesan[2]}
  `;
}

function resetForm() {
  document.getElementById("bmiForm").reset();
  document.getElementById("hasil").innerText = "";
  document.getElementById("nilaibmi").innerText = "";
  document.getElementById("info").innerText = "";
  document.querySelectorAll(".error-message").forEach((elem) => (elem.innerText = ""));
}
