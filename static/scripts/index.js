
document.addEventListener('DOMContentLoaded', function() {

    sluglist = document.getElementById('sluglist');



    fetch('/slugs').then((res)=>{
        return res.json()
    }).then((data)=>{
        slugs = data.slugs
        slugs.forEach((slug)=>{
            console.log(slug)
            sluglist.appendChild(Li(slug[0],slug[1]))
        })
    })


})




const Li = (slug,url)=>{
    const li = document.createElement('li');
    const div = document.createElement('div');

    const namespan = document.createElement('span');
    const urla = document.createElement('a');

    div.style.display = 'flex';
    div.style.justifyContent = 'space-between';

    namespan.textContent = slug;
    urla.textContent= url;
    urla.href = url;

    div.appendChild(namespan);
    div.appendChild(urla);

    li.appendChild(div);
    return li;
}