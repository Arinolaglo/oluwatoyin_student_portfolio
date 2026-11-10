document.addEventListener('DOMContentLoaded', () => {
  const form=document.getElementById('contact-form'), feedback=document.getElementById('contact-feedback');
  const names=['name','email','phone','message'];
  function error(name,msg){document.getElementById(name+'-error').textContent=msg;document.getElementById(name).setAttribute('aria-invalid',String(Boolean(msg)));}
  form.addEventListener('submit',e=>{e.preventDefault();let valid=true;const v={};names.forEach(n=>{v[n]=document.getElementById(n).value.trim();error(n,'');});
    if(!v.name){error('name','Please enter your name.');valid=false;}
    if(!v.email){error('email','Please enter your email.');valid=false;}else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)){error('email','Enter a valid email address.');valid=false;}
    if(!v.phone){error('phone','Please enter your phone number.');valid=false;}else if(!/^\d+$/.test(v.phone)){error('phone','Use digits only, without spaces or symbols.');valid=false;}
    if(!v.message){error('message','Please enter a message.');valid=false;}
    feedback.textContent=valid?'All fields are valid. This demo does not send messages until connected to a form service or backend.':'Please correct the highlighted fields.';
    feedback.className='feedback '+(valid?'success':'failure');
    if(!valid){const first=form.querySelector('[aria-invalid="true"]');if(first)first.focus();}
  });
  names.forEach(n=>document.getElementById(n).addEventListener('input',()=>{error(n,'');feedback.textContent='';}));
});