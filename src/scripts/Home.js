window.addEventListener("load", (event) => {
    const popupBg = document.querySelector('.popup__bg'); 
    const popup = document.querySelector('.popup'); 
    const openPopupButtons = document.querySelectorAll('.open-popup');
    const closePopupButton = document.querySelector('.close-popup');

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
      
    openPopupButtons.forEach((button) => { 
        button.addEventListener('click', (e) => { 
            e.preventDefault(); 
            popupBg.classList.add('active');
            popup.classList.add('active');
        })
    });

    closePopupButton.addEventListener('click',() => { 
       popupBg.classList.remove('active'); 
       popup.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
        if(e.target === popupBg) { 
            popupBg.classList.remove('active');
            popup.classList.remove('active'); 
        }
    });
    
});
