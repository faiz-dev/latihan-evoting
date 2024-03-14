const langId = {
  'available-voting': "Pemilihan tersedia",
  'slogan': "Pemilihan menjadi Cepat dan Mudah",
  'login-button': "Ketuk untuk login",
  'welcome': "Selamat datang di",
  'loading': 'Sedang Memuat data',
  'error': "Terjadi Error, mohon hubungi sekertariat",
  'no-data': "Data tidak tersedia",
  'sending': 'Mengirim data'
}

const langEng = {
  'available-voting': "Available Voting",
  'slogan': "Voting made fast and easy",
  'result-greeting': "Here are the voting result",
  'voting-result': "Voting Result",
  'login-button': "Tap here to login",
  'welcome': "Welcome to",
  'loading': "Now Loading",
  'sending': "Sending data",
  'error': "Error occured, please contact SCE Staff",
  'no-data': "No data available" 
}

const langJava = {
  'slogan': "Voting made fast and easy"
}

const copywrite = (lang, key) => {
  switch(lang) {
    case 'id': return langId[key] ? langId[key] : copywrite("en", key); 
    case 'java': return langJava[key];
    default: return langEng[key] ? langEng[key] : ""; 
  }
}

export default copywrite