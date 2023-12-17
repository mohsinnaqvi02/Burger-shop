const mobIcon=document.getElementById('mob-icon');

function showMenu(e)
{
    e.preventDefault();
    document.getElementById('mob-header').classList.toggle("show");
}

mobIcon.addEventListener('click',showMenu);










