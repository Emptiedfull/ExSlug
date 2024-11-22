console.log('admin.js');


document.addEventListener('DOMContentLoaded', function() {

    sluglist = document.getElementById('sluglist');

    slugInput = document.getElementById('slug');
    urlInput = document.getElementById('url');
    submitButton = document.getElementById('add_slug');

    console.log(slugInput,urlInput)

    submitButton.addEventListener('click',()=>{
        
        slugInput.disabled = true;
        urlInput.disabled = true;
        submitButton.disabled = true;

        const slugValue = slugInput.value.replace(/\s+/g, '');
        const urlValue = urlInput.value.replace(/\s+/g, '');

        if (slugValue === '' || urlValue === '') return;

        fetch(`/add_slug?slug=${slugValue}&url=${urlValue}`,{
            method: 'POST'
        }).then((res)=>{
            if (res.status === 200){
                console.log('slug added')
                sluglist.appendChild(Li(slugValue,urlValue))
               

            }

            return res.json()
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            slugInput.disabled = false;
            urlInput.disabled = false;
            submitButton.disabled = false;
            slugInput.value = ''
            urlInput.value = ''
        })
        
    })

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
    
    const rhdiv = document.createElement('div');

    const namespan = document.createElement('span');
    const deleteButton = document.createElement('button');
    const urla = document.createElement('a');

    div.style.display = 'flex';
    div.style.justifyContent = 'space-between';

    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.style.marginLeft = '20px';

    namespan.textContent = slug;
    urla.textContent= url;
    urla.href = url;
    deleteButton.addEventListener('click',()=>{deleteslug(slug)})
    rhdiv.appendChild(urla);
    rhdiv.appendChild(deleteButton);

    div.appendChild(namespan);
    div.appendChild(rhdiv);

    li.appendChild(div);
    li.id = slug;
    return li;
}

const deleteslug = (slug)=>{
    fetch("/remove_slug?slug="+slug,{
        method:"POST"
    }).then((res)=>{
        if (res.status === 200){
            console.log('slug deleted')
            document.getElementById(slug).remove()
        }
    })
}