document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle) return;

  const fullText = 'CREATE TO CREATE, FILL THE WORLD WITH YOUR ART';
  const charDelay = 100;      
  const pauseAtEnd = 10000;    
  const clearBeforeRestart = false;

  let index = 0;

 
  function step() {
    heroTitle.textContent = fullText.slice(0, index);

    if (index < fullText.length) {
      index++;
      setTimeout(step, charDelay);
    } else {
     
      setTimeout(() => {
        if (clearBeforeRestart) {
          index = 0; 
          heroTitle.textContent = '';
        } else {
          index = 1; 
        }
        setTimeout(step, charDelay);
      }, pauseAtEnd);
    }
  }


  index = 1;
  step();
});